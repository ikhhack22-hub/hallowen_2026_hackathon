// ============================================================
// WitchSandbox — runs apprentice code inside a locked sandbox.
// ------------------------------------------------------------
// Each run happens inside a hidden <iframe sandbox="allow-scripts">.
// Because the frame has no `allow-same-origin`, the code being tested
// cannot touch this page, its DOM, localStorage (so trial progress
// cannot be faked) or the network.
//
// Usage:
//   WitchSandbox.run({ code, fn, tests, timeoutMs })
//     -> Promise<{ logs, error, durationMs, testResults, timedOut }>
//
// The frame reports every console.log / info / warn / error plus any
// thrown error. A watchdog destroys the frame if it runs too long,
// so an infinite loop only kills the sandbox, never the page.
// ============================================================
(function () {
  'use strict';

  const DEFAULT_TIMEOUT_MS = 3000;

  // Document loaded inside the iframe. It waits for the code to be posted
  // in (rather than embedding it) so no escaping games are needed and every
  // run starts from a completely clean slate.
  const FRAME_DOCUMENT = [
    '<!doctype html>',
    '<html><body>',
    '<script>',
    '(function () {',
    '  var send = function (token, result) { parent.postMessage({ token: token, result: result }, "*"); };',
    '',
    '  var format = function (value) {',
    '    if (typeof value === "string") return value;',
    '    if (value instanceof Error) return value.message;',
    '    try { return JSON.stringify(value); } catch (error) { return String(value); }',
    '  };',
    '',
    '  var sameValue = function (a, b) {',
    '    if (a === b) return true;',
    '    if (Number.isNaN(a) && Number.isNaN(b)) return true;',
    '    try { return JSON.stringify(a) === JSON.stringify(b); } catch (error) { return false; }',
    '  };',
    '',
    '  window.addEventListener("message", function (event) {',
    '    var data = event.data || {};',
    '    if (!data.token) return;',
    '',
    '    var logs = [];',
    '    ["log", "info", "warn", "error"].forEach(function (level) {',
    '      console[level] = function () {',
    '        var args = Array.prototype.slice.call(arguments);',
    '        logs.push({ level: level, text: args.map(format).join(" ") });',
    '      };',
    '    });',
    '',
    '    var started = performance.now();',
    '    var result = { logs: logs, error: null, durationMs: 0, testResults: null, timedOut: false };',
    '    var userFunction = null;',
    '    var fnName = data.fn || null;',
    '',
    '    try {',
    '      var source = \'"use strict";\\n\' + (data.code || "");',
    '      if (fnName) {',
    '        source += \'\\n;return typeof \' + fnName + \' === "function" ? \' + fnName + \' : undefined;\';',
    '      }',
    '      userFunction = new Function(source)();',
    '    } catch (error) {',
    '      result.error = "The spell collapsed: " + (error && error.message ? error.message : String(error));',
    '    }',
    '',
    '    var cases = data.tests;',
    '    if (!result.error && Array.isArray(cases) && cases.length) {',
    '      if (fnName && typeof userFunction !== "function") {',
    '        result.error = \'The Grimoire expected a function named "\' + fnName + \'", but found none.\';',
    '      } else if (typeof userFunction === "function") {',
    '        result.testResults = cases.map(function (testCase, index) {',
    '          var args = testCase.args || [];',
    '          var entry = {',
    '            index: index + 1,',
    '            args: args,',
    '            expected: testCase.expected,',
    '            actual: undefined,',
    '            passed: false,',
    '            error: null',
    '          };',
    '          try {',
    '            entry.actual = userFunction.apply(null, args);',
    '            entry.passed = sameValue(entry.actual, testCase.expected);',
    '          } catch (error) {',
    '            entry.error = error && error.message ? error.message : String(error);',
    '          }',
    '          return entry;',
    '        });',
    '      }',
    '    }',
    '',
    '    result.durationMs = Math.round(performance.now() - started);',
    '    send(data.token, result);',
    '  });',
    '})();',
    '<\/script>',
    '</body></html>'
  ].join('\n');

  function run(options) {
    const settings = options || {};
    const timeoutMs = Number(settings.timeoutMs) > 0 ? Number(settings.timeoutMs) : DEFAULT_TIMEOUT_MS;

    return new Promise(function (resolve) {
      const frame = document.createElement('iframe');
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.setAttribute('aria-hidden', 'true');
      frame.setAttribute('tabindex', '-1');
      frame.style.cssText =
        'position:absolute;width:0;height:0;border:0;visibility:hidden;left:-9999px;';
      frame.srcdoc = FRAME_DOCUMENT;

      const token = 'spell-' + Date.now() + '-' + Math.random().toString(36).slice(2);
      let settled = false;

      function cleanup() {
        clearTimeout(watchdog);
        window.removeEventListener('message', onMessage);
        frame.remove();
      }

      function finish(result) {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(result);
      }

      const watchdog = setTimeout(function () {
        finish({
          logs: [],
          error: 'The spell hung in the air \u2014 the ritual timed out after ' + (timeoutMs / 1000) + 's.',
          durationMs: timeoutMs,
          testResults: null,
          timedOut: true
        });
      }, timeoutMs);

      function onMessage(event) {
        if (event.source !== frame.contentWindow) return;
        const data = event.data;
        if (!data || data.token !== token || !data.result) return;
        finish(data.result);
      }

      frame.addEventListener(
        'load',
        function () {
          frame.contentWindow.postMessage(
            {
              token: token,
              code: settings.code || '',
              fn: settings.fn || null,
              tests: Array.isArray(settings.tests) && settings.tests.length ? settings.tests : null
            },
            '*'
          );
        },
        { once: true }
      );

      window.addEventListener('message', onMessage);
      document.body.appendChild(frame);
    });
  }

  window.WitchSandbox = { run: run };
})();

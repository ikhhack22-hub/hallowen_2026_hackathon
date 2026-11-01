// ============================================================
// TRIAL I — THE LOST INGREDIENTS — challenge definitions
// ------------------------------------------------------------
// Each entry below controls one challenge panel on trial.html.
//
//   ingredient : the ingredient recovered when the challenge is solved
//   difficulty : shown on the challenge badge until the ingredient is recovered
//   fn         : name of the function the judge calls, e.g. 'greatestPower'.
//                Use null to run the editor as a free-form JS sandbox.
//   samples    : tests used by "Run" (visible practice tests, optional)
//   tests      : the hidden tests used by "Submit"
//
// A single test looks like:  { args: [input, ...], expected: output }
//
// Submit passes only when every hidden test passes — that is what recovers
// the ingredient. The runner itself never needs to be edited.
//
// Example (Challenge 01):
//   1: {
//     ingredient: 'Dragon Blood',
//     fn: 'greatestPower',
//     samples: [{ args: [[2, 7, 3]], expected: 7 }],
//     tests: [
//       { args: [[2, 7, 3]], expected: 7 },
//       { args: [[-5, -1, -9]], expected: -1 },
//       { args: [[42]], expected: 42 }
//     ]
//   }
// ============================================================
window.CHALLENGES = {
  1: {
    ingredient: 'Dragon Blood',
    difficulty: 'Hard',
    fn: 'greatestPower',
    samples: [
      { args: [[2, 7, 3]], expected: -1 },
      { args: [[4, 9, 16]], expected: 16 },
      { args: [[27, 25, 8]], expected: 27 }
    ],
    tests: [
      { args: [[2, 7, 3]], expected: -1 },
      { args: [[4, 9, 16]], expected: 16 },
      { args: [[27, 25, 8]], expected: 27 },
      { args: [[1, 2, 3]], expected: 1 },
      { args: [[64, 65, 63]], expected: 64 },
      { args: [[999999999, 1000000000]], expected: 1000000000 },
      { args: [[36, 49, 121]], expected: 121 },
      { args: [[1000000000000, 999999999999]], expected: 1000000000000 },
      { args: [[2, 3, 5, 7, 11, 13]], expected: -1 },
      { args: [[8, 16, 27, 32, 64, 81, 100, 125, 128]], expected: 128 }
    ]
  },
  2: {
    ingredient: 'Moon Dust',
    difficulty: 'Hard',
    fn: 'minMoonRate',
    samples: [
      { args: [[3, 6, 7, 11], 8], expected: 4 },
      { args: [[30, 11, 23, 4, 20], 5], expected: 30 },
      { args: [[30, 11, 23, 4, 20], 6], expected: 23 }
    ],
    tests: [
      { args: [[3, 6, 7, 11], 8], expected: 4 },
      { args: [[30, 11, 23, 4, 20], 5], expected: 30 },
      { args: [[30, 11, 23, 4, 20], 6], expected: 23 },
      { args: [[5, 5], 2], expected: 5 },
      { args: [[7], 1], expected: 7 },
      { args: [[1, 1, 1, 1], 4], expected: 1 },
      { args: [[1000000000], 2], expected: 500000000 },
      { args: [[312884470], 968709470], expected: 1 },
      { args: [[1000000000, 1000000000], 2], expected: 1000000000 },
      { args: [[4, 4, 4, 4], 4], expected: 4 }
    ]
  },
  3: {
    ingredient: "Witch's Herb",
    difficulty: 'Hard',
    fn: 'herbSpreadNights',
    samples: [
      { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
      { args: [[[2, 3, 1]]], expected: 3 },
      { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 }
    ],
    tests: [
      { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
      { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
      { args: [[[0, 2]]], expected: 0 },
      { args: [[[1]]], expected: -1 },
      { args: [[[2, 3, 1]]], expected: 3 },
      { args: [[[2, 1, 3, 1]]], expected: 4 },
      { args: [[[2, 0, 1], [1, 1, 1], [1, 0, 2]]], expected: 2 },
      { args: [[[2, 3, 3], [3, 3, 1]]], expected: 5 },
      { args: [[[2, 1, 1], [1, 3, 1], [1, 1, 1]]], expected: 4 },
      { args: [[[2, 1, 2], [1, 1, 1]]], expected: 2 }
    ]
  },
  4: {
    ingredient: 'Phoenix Feather',
    difficulty: 'Medium',
    fn: 'maxPhoenixFlame',
    samples: [
      { args: [[3, -2, 4, -1, 2, -5, 4]], expected: 6 },
      { args: [[1, 2, 3, 4]], expected: 10 },
      { args: [[-3, -1, -7]], expected: -1 }
    ],
    tests: [
      { args: [[3, -2, 4, -1, 2, -5, 4]], expected: 6 },
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { args: [[1, 2, 3, 4]], expected: 10 },
      { args: [[-3, -1, -7]], expected: -1 },
      { args: [[-5, -2, -9, -1]], expected: -1 },
      { args: [[2, -1, 2, 3, -9, 4]], expected: 6 },
      { args: [[1000000000, -1, 1000000000]], expected: 1999999999 },
      { args: [[0]], expected: 0 },
      { args: [[7, -3, 7]], expected: 11 },
      { args: [[5]], expected: 5 }
    ]
  },
  5: {
    ingredient: 'Spider Venom',
    difficulty: 'Medium',
    fn: 'longestWebRun',
    samples: [
      { args: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
      { args: [[1, 3, 5, 7]], expected: 1 }
    ],
    tests: [
      { args: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
      { args: [[1, 2, 0, 1]], expected: 3 },
      { args: [[5]], expected: 1 },
      { args: [[1, 1, 1]], expected: 1 },
      { args: [[-3, -2, -1, 0, 1]], expected: 5 },
      { args: [[10, 5, 12, 3, 55, 11, 4, 13]], expected: 4 },
      { args: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], expected: 7 },
      { args: [[1, 3, 5, 7]], expected: 1 },
      { args: [[2, 1, 3]], expected: 3 }
    ]
  },
  6: {
    ingredient: 'Ghost Essence',
    difficulty: 'Medium',
    fn: 'hauntedStretches',
    samples: [
      { args: [[1, 1, 1], 2], expected: 2 },
      { args: [[1, 2, 3], 3], expected: 2 },
      { args: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4 }
    ],
    tests: [
      { args: [[1, 1, 1], 2], expected: 2 },
      { args: [[1, 2, 3], 3], expected: 2 },
      { args: [[1, -1, 0], 0], expected: 3 },
      { args: [[0, 0, 0], 0], expected: 6 },
      { args: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4 },
      { args: [[5], 5], expected: 1 },
      { args: [[5], 0], expected: 0 },
      { args: [[1, 2, 3, -3, -2, -1], 0], expected: 3 },
      { args: [[1000000000, 1000000000], 1000000000], expected: 2 },
      { args: [[-1, -1, -1], -3], expected: 1 }
    ]
  },
  7: {
    ingredient: 'Crystal Shard',
    difficulty: 'Easy',
    fn: 'missingFacet',
    samples: [
      { args: [[3, 0, 1]], expected: 2 },
      { args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
      { args: [[1, 2, 3]], expected: 0 }
    ],
    tests: [
      { args: [[3, 0, 1]], expected: 2 },
      { args: [[0, 1]], expected: 2 },
      { args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
      { args: [[0]], expected: 1 },
      { args: [[1]], expected: 0 },
      { args: [[0, 1, 2, 3, 4, 5, 6, 8]], expected: 7 },
      { args: [[1, 2, 3]], expected: 0 },
      { args: [[2, 0, 1]], expected: 3 },
      { args: [[0, 2, 3]], expected: 1 },
      { args: [[0, 1, 2, 3, 5]], expected: 4 }
    ]
  },
  8: {
    ingredient: 'Vampire Fang',
    difficulty: 'Easy',
    fn: 'isMarkedPalindrome',
    samples: [
      { args: ["A man, a plan, a canal: Panama"], expected: true },
      { args: ['race a car'], expected: false },
      { args: ["No 'x' in Nixon"], expected: true }
    ],
    tests: [
      { args: ["A man, a plan, a canal: Panama"], expected: true },
      { args: ['race a car'], expected: false },
      { args: [' '], expected: true },
      { args: ['0P'], expected: false },
      { args: ['ab_a'], expected: true },
      { args: ['Was it a car or a cat I saw?'], expected: true },
      { args: [''], expected: true },
      { args: ['Aa'], expected: true },
      { args: ['1a2'], expected: false },
      { args: ['12321'], expected: true }
    ]
  },
  9: {
    ingredient: 'Forbidden Mushroom',
    difficulty: 'Easy',
    fn: 'maxSpores',
    samples: [
      { args: [[1, 2, 3, 4, 5], 10], expected: 4 },
      { args: [[10], 5], expected: 0 },
      { args: [[0, 0, 0], 0], expected: 3 }
    ],
    tests: [
      { args: [[1, 2, 3, 4, 5], 10], expected: 4 },
      { args: [[5, 5, 5], 10], expected: 2 },
      { args: [[10], 5], expected: 0 },
      { args: [[1, 1, 1, 1], 4], expected: 4 },
      { args: [[3, 1, 2], 3], expected: 2 },
      { args: [[0, 0, 0], 0], expected: 3 },
      { args: [[2, 3, 4], 6], expected: 2 },
      { args: [[7], 7], expected: 1 },
      { args: [[1, 2, 4, 8, 16], 15], expected: 4 },
      { args: [[0, 5], 0], expected: 1 }
    ]
  },
  10: {
    ingredient: 'Dark Matter',
    difficulty: 'Super Hard',
    fn: 'darkMatterCircuit',
    samples: [
      { args: [[[0]]], expected: 0 },
      { args: [[[0, 3, 1], [3, 0, 2], [1, 2, 0]]], expected: 6 },
      { args: [[[0, 41, 60, 10, 41], [41, 0, 5, 12, 25], [60, 5, 0, 39, 48], [10, 12, 39, 0, 12], [41, 25, 48, 12, 0]]], expected: 112 }
    ],
    tests: [
      { args: [[[0]]], expected: 0 },
      { args: [[[0, 7], [7, 0]]], expected: 14 },
      { args: [[[0, 3, 1], [3, 0, 2], [1, 2, 0]]], expected: 6 },
      { args: [[[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]], expected: 80 },
      { args: [[[0, 41, 60, 10, 41], [41, 0, 5, 12, 25], [60, 5, 0, 39, 48], [10, 12, 39, 0, 12], [41, 25, 48, 12, 0]]], expected: 112 },
      { args: [[[0, 29, 82, 46, 68], [29, 0, 55, 46, 42], [82, 55, 0, 68, 46], [46, 46, 68, 0, 43], [68, 42, 46, 43, 0]]], expected: 219 },
      { args: [[[0, 28, 16, 14, 70, 52], [28, 0, 79, 58, 86, 64], [16, 79, 0, 75, 51, 77], [14, 58, 75, 0, 97, 20], [70, 86, 51, 97, 0, 92], [52, 64, 77, 20, 92, 0]]], expected: 251 },
      { args: [[[0, 82, 99, 26, 72, 71, 2], [82, 0, 29, 21, 71, 100, 60], [99, 29, 0, 85, 45, 94, 68], [26, 21, 85, 0, 56, 1, 97], [72, 71, 45, 56, 0, 54, 70], [71, 100, 94, 1, 54, 0, 31], [2, 60, 68, 97, 70, 31, 0]]], expected: 201 },
      { args: [[[0, 66, 31, 64, 100, 68, 68, 18, 89, 71, 83, 74], [66, 0, 34, 80, 20, 58, 24, 21, 79, 88, 85, 12], [31, 34, 0, 48, 74, 37, 28, 37, 92, 88, 42, 43], [64, 80, 48, 0, 82, 18, 16, 32, 38, 51, 98, 47], [100, 20, 74, 82, 0, 76, 23, 44, 88, 82, 31, 54], [68, 58, 37, 18, 76, 0, 85, 71, 12, 59, 10, 70], [68, 24, 28, 16, 23, 85, 0, 40, 70, 26, 39, 41], [18, 21, 37, 32, 44, 71, 40, 0, 42, 95, 44, 3], [89, 79, 92, 38, 88, 12, 70, 42, 0, 26, 14, 67], [71, 88, 88, 51, 82, 59, 26, 95, 26, 0, 1, 29], [83, 85, 42, 98, 31, 10, 39, 44, 14, 1, 0, 29], [74, 12, 43, 47, 54, 70, 41, 3, 67, 29, 29, 0]]], expected: 216 },
      { args: [[[0, 71, 84, 2, 87, 18, 91, 72, 21, 81, 94, 15, 34], [71, 0, 29, 7, 46, 49, 43, 62, 79, 42, 82, 13, 58], [84, 29, 0, 61, 55, 16, 50, 38, 16, 67, 30, 15, 11], [2, 7, 61, 0, 85, 52, 85, 88, 95, 20, 96, 20, 46], [87, 46, 55, 85, 0, 31, 60, 10, 9, 45, 17, 96, 66], [18, 49, 16, 52, 31, 0, 69, 6, 61, 46, 20, 14, 65], [91, 43, 50, 85, 60, 69, 0, 7, 61, 86, 66, 57, 14], [72, 62, 38, 88, 10, 6, 7, 0, 23, 11, 11, 1, 4], [21, 79, 16, 95, 9, 61, 61, 23, 0, 57, 12, 46, 4], [81, 42, 67, 20, 45, 46, 86, 11, 57, 0, 91, 16, 34], [94, 82, 30, 96, 17, 20, 66, 11, 12, 91, 0, 12, 100], [15, 13, 15, 20, 96, 14, 57, 1, 46, 16, 12, 0, 76], [34, 58, 11, 46, 66, 65, 14, 4, 4, 34, 100, 76, 0]]], expected: 161 }
    ]
  }
};

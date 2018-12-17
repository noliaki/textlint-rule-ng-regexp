'use strict'

const TextLintTester = require('textlint-tester')
const tester = new TextLintTester()
// rule
const rule = require('../src/')
// ruleName, rule, { valid, invalid }

tester.run(
  'rule',
  {
    rules: [
      {
        ruleId: 'rule',
        rule,
        options: {
          words: [
            {
              pattern: ['hoge', 'g']
            },
            {
              pattern: ['［(.*?)］', 'g']
            },
            {
              pattern: ['exclude', 'g'],
              exclude: ['exclude-this-item']
            },
            {
              pattern: ['piyo', 'g'],
              exclude: ['piyopiyo']
            },
            {
              pattern: ['poyo'],
              correct: 'ponyo'
            }
          ]
        }
      }
    ]
  },
  {
    valid: [
      // no problem
      'text',
      'hotextge',
      '[ほげほげ]',
      'pattern-exclude-this-item',
      'piyopiyo'
    ],
    invalid: [
      {
        text: 'poyo',
        errors: [
          {
            message: `"/poyo/g" matches "poyo".\n[correct word] "ponyo".`,
            line: 1,
            column: 0 + 1
          }
        ]
      },
      {
        text: 'piyopiyopiyo',
        errors: [
          {
            message: `"/piyo/g" matches "piyo".`,
            line: 1,
            column: 8 + 1
          }
        ]
      },
      {
        text: 'fugamogehoge',
        errors: [
          {
            message: '"/hoge/g" matches "hoge".',
            line: 1,
            column: 8 + 1
          }
        ]
      },
      {
        text: '［ほげほげ］',
        errors: [
          {
            message: '"/［(.*?)］/g" matches "［ほげほげ］".',
            line: 1,
            column: 0 + 1
          }
        ]
      },
      {
        text: `hogefugafuga

ahogehoge

［ほげほげ］［ほげほげ］`,
        errors: [
          {
            message: '"/hoge/g" matches "hoge".',
            line: 1,
            column: 0 + 1
          },
          {
            message: '"/hoge/g" matches "hoge".',
            line: 3,
            column: 1 + 1
          },
          {
            message: '"/hoge/g" matches "hoge".',
            line: 3,
            column: 5 + 1
          },
          {
            message: '"/［(.*?)］/g" matches "［ほげほげ］".',
            line: 5,
            column: 0 + 1
          },
          {
            message: '"/［(.*?)］/g" matches "［ほげほげ］".',
            line: 5,
            column: 6 + 1
          }
        ]
      }
    ]
  }
)

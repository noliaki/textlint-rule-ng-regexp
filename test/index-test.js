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
              pattern: /hoge/g,
              replaceText: 'fuga'
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
      'hotextge'
    ],
    invalid: [
      {
        text: 'fugamogehoge',
        output: 'fugamogefuga',
        errors: [
          {
            message: 'Match: hoge',
            line: 1,
            column: 8 + 1
          }
        ]
      },
      {
        text: `hogefugafuga

ahogehoge`,
        output: `fugafugafuga

afugafuga`,
        errors: [
          {
            message: 'Match: hoge',
            line: 1,
            column: 0 + 1
          },
          {
            message: 'Match: hoge',
            line: 3,
            column: 1 + 1
          },
          {
            message: 'Match: hoge',
            line: 3,
            column: 5 + 1
          }
        ]
      }
    ]
  }
)

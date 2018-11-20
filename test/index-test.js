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
              pattern: /hoge/gm
            },
            {
              pattern: /［(.*?)］/gm
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
      '[ほげほげ]'
    ],
    invalid: [
      {
        text: 'fugamogehoge',
        errors: [
          {
            message: 'Match: hoge',
            line: 1,
            column: 8 + 1
          }
        ]
      },
      {
        text: '［ほげほげ］',
        errors: [
          {
            message: 'Match: ［ほげほげ］',
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
          },
          {
            message: 'Match: ［ほげほげ］',
            line: 5,
            column: 0 + 1
          },
          {
            message: 'Match: ［ほげほげ］',
            line: 5,
            column: 6 + 1
          }
        ]
      }
    ]
  }
)

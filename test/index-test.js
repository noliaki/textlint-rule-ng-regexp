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
            message: 'ng-regexp: hoge',
            line: 1,
            column: 8 + 1
          }
        ]
      },
      {
        text: '［ほげほげ］',
        errors: [
          {
            message: 'ng-regexp: ［ほげほげ］',
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
            message: 'ng-regexp: hoge',
            line: 1,
            column: 0 + 1
          },
          {
            message: 'ng-regexp: hoge',
            line: 3,
            column: 1 + 1
          },
          {
            message: 'ng-regexp: hoge',
            line: 3,
            column: 5 + 1
          },
          {
            message: 'ng-regexp: ［ほげほげ］',
            line: 5,
            column: 0 + 1
          },
          {
            message: 'ng-regexp: ［ほげほげ］',
            line: 5,
            column: 6 + 1
          }
        ]
      }
    ]
  }
)

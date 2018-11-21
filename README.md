# textlint-rule-ng-regexp

[![CircleCI](https://circleci.com/gh/noliaki/textlint-rule-ng-regexp.svg?style=svg)](https://circleci.com/gh/noliaki/textlint-rule-ng-regexp)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ng-regexp

## Usage

Via `.textlintrc`(Recommended)

```js
{
  "rules": {
    "ng-regexp": {
      "words": [
        {
          // first item is RegExp pattern
          // second is RegExp option: "i", "g", "m". Default: "g".
          // Any option is added "g" option
          "pattern": ["hoge"]
        },
        {
          "pattern": ["fuga", "i"]
        }
      ]
    }
  }
}
```

Via CLI

```
textlint --rule ng-regexp README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester 'textlint-tester').

    npm test

## License

MIT ©

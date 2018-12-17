# textlint-rule-ng-regexp

[![CircleCI](https://circleci.com/gh/noliaki/textlint-rule-ng-regexp.svg?style=svg)](https://circleci.com/gh/noliaki/textlint-rule-ng-regexp) [![Greenkeeper badge](https://badges.greenkeeper.io/noliaki/textlint-rule-ng-regexp.svg)](https://greenkeeper.io/)

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
          // second is RegExp flag: "i", "g", "m". Default: "g".
          // Any option is added "g" flag
          "pattern": ["hoge"] // => new RegExp('hoge', 'g')
        },
        {
          "pattern": ["fuga", "i"] // => new RegExp('fuga', 'ig')
        },
        {
          "pattern": ["piyo", "i"], // => new RegExp('piyo', 'ig')
          "exclude": ["piyopiyo"], // => new RegExp('piyopiyo', 'g')
          "correct": "ponyo"
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

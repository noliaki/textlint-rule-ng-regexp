'use strict'

function reporter(context, options = {}) {
  if (!options.words || !options.words.length) {
    return
  }

  const { Syntax, RuleError, report, getSource } = context

  return {
    [Syntax.Str](node) {
      const text = getSource(node)

      return new Promise((resolve, reject) => {
        for (let i = 0, len = options.words.length; i < len; i++) {
          const item = options.words[i]
          const regexpOption = item.pattern[1]
            ? item.pattern[1].indexOf('g') > -1
              ? item.pattern[1]
              : item.pattern[1] + 'g'
            : 'g'
          const pattern = new RegExp(item.pattern[0], regexpOption)
          pattern.lastIndex = 0

          let matches = pattern.exec(text)

          while (matches) {
            report(
              node,
              new RuleError(`"${pattern}" matches "${matches[0]}".`, {
                index: matches.index
              })
            )

            matches = pattern.exec(text)
          }
        }

        resolve()
      })
    }
  }
}

module.exports = {
  linter: reporter
  // fixer: reporter
}

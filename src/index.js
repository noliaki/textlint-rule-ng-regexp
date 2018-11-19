'use strict'

function reporter(context, options = {}) {
  if (!options.words.length) {
    return
  }

  const { Syntax, RuleError, fixer, report, getSource } = context

  return {
    [Syntax.Str](node) {
      const text = getSource(node)

      for (let i = 0, len = options.words.length; i < len; i++) {
        const item = options.words[i]
        const pattern = item.pattern

        if (pattern instanceof RegExp) {
          pattern.lastIndex = 0

          let matches = pattern.exec(text)

          while (matches) {
            const range = [matches.index, matches.index + matches[0].length]
            const fix = item.replaceText
              ? fixer.replaceTextRange(range, item.replaceText)
              : null

            report(
              node,
              new RuleError(`Match: ${matches[0]}`, {
                index: matches.index,
                fix
              })
            )

            matches = pattern.exec(text)
          }
        }
      }
    }
  }
}

module.exports = {
  linter: reporter,
  fixer: reporter
}

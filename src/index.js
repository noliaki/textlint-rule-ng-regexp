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
          const pattern = new RegExp(item.pattern[0], flag(item.pattern[1]))
          pattern.lastIndex = 0

          const excludeMatched = item.exclude
            ? excludeMatches(item.exclude, text)
            : null

          let matches = pattern.exec(text)

          while (matches) {
            if (!containsExcludePattern(matches, excludeMatched)) {
              const correctWord = item.correct
                ? `\n[correct word] "${item.correct}".`
                : ''

              report(
                node,
                new RuleError(
                  `"${pattern}" matches "${matches[0]}".${correctWord}`,
                  {
                    index: matches.index
                  }
                )
              )
            }

            matches = pattern.exec(text)
          }
        }

        resolve()
      })
    }
  }
}

function excludeMatches(excludePattern, text) {
  const a = []
  const pattern = new RegExp(excludePattern[0], flag(excludePattern[1]))
  pattern.lastIndex = 0

  let matches = pattern.exec(text)

  while (matches) {
    a.push([matches.index, matches.index + matches[0].length])
    matches = pattern.exec(text)
  }

  return a
}

function containsExcludePattern(matcher, excludeMatched) {
  if (!matcher || !excludeMatched) {
    return false
  }

  return excludeMatched.find(
    item =>
      item[0] <= matcher.index && item[1] >= matcher.index + matcher[0].length
  )
}

function flag(regexFlag) {
  return regexFlag
    ? regexFlag.indexOf('g') > -1
      ? regexFlag
      : regexFlag + 'g'
    : 'g'
}

module.exports = {
  linter: reporter
  // fixer: reporter
}

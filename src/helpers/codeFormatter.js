import humps from 'humps';
import Case from 'case';

function formats(text) {
  return {
    'camelCase': {
      wordContainsFormat: Case.of(text) === 'camel',
      lineContainsFormat: true,
      formatter: humps.camelize(text),
    },
    'snake_case': {
      wordContainsFormat: Case.of(text) === 'snake',
      lineContainsFormat: text.includes('_'),
      formatter: humps.decamelize(text),
    },
    'kebab-case': {
      wordContainsFormat: Case.of(text) === 'kebab',
      lineContainsFormat: text.includes('-') && /^[a-zA-Z]/.test(text),
      formatter: Case.kebab(text),
    },
    'PascalCase': {
      wordContainsFormat: Case.of(text) === 'pascal',
      lineContainsFormat: (/[a-z]/.test(text)),
      formatter: humps.pascalize(text),
    },
  };
}

function lineContainsFormat(format, line) {
  return formats(line)[format].lineContainsFormat;
}

function wordContainsFormat(format, word) {
  return formats(word)[format].wordContainsFormat;
}

function formatWord(format, text) {
  return formats(text)[format].formatter;
}

function codeFormatter(text, formatTo, formatFrom) {
  if ((text || '').length <= 0) return '';
  let formattedText = '';
  text.split('\n').forEach((line) => {
    if (lineContainsFormat(formatFrom, line)) {
      let camelizedLine = line;

      const words = line.trim().split(/[^A-Za-z0-9_]/);
      words.forEach((word) => {
        if (wordContainsFormat(formatFrom, word)) {
          camelizedLine = camelizedLine.replace(word, formatWord(formatTo, word));
        }
      });
      formattedText = formattedText.concat(`${camelizedLine}\n`);
    } else {
      formattedText = formattedText.concat(`${line}\n`);
    }
  });

  return formattedText;
}

export default codeFormatter;

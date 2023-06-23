const isValidStringLength = (string, maxLength) => string.length <= maxLength;

isValidStringLength('проверяемая строка', 20);

const isPalindrome = (string) => {
  if (!string.length) {
    return false;
  }

  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  return [...normalizedString]
    .slice(0, normalizedString.length / 2)
    .reduce((accumulator, character, index) =>
      accumulator && character === normalizedString.at(-index - 1), true);
};

isPalindrome('ЛёШа на полке Клопа нашёл ');

const isPalindromeSecondVerion = (string) => {
  if (!string.length) {
    return false;
  }

  const normalizedString = string.replaceAll(' ', '');

  if (normalizedString) {
    for (let index = 0; index < string.length / 2; index += 1) {
      if (normalizedString.at(index).localeCompare(normalizedString.at(-index - 1), undefined, { sensitivity: 'base' }) !== 0) {
        return false;
      }
    }
  }

  return true;
};

isPalindromeSecondVerion('ЛёШа на полке Клопа нашёл ');

const getNumbers = (value) => {
  const string = String(value);
  const filteredString = [...string].filter((character) => !Number.isNaN(parseInt(character, 10))).join('');

  return parseInt(filteredString, 10) || NaN;
};

getNumbers('ECMAScript 2022');

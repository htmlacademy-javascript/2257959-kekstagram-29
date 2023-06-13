/* eslint-disable no-console */
const isValidStringLength = (string, maxLength) => string.length <= maxLength;

console.groupCollapsed('isValidStringLength');
console.log(
  'isValidStringLength(\'проверяемая строка\', 20) =',
  isValidStringLength('проверяемая строка', 20)
); // true
console.log(
  'isValidStringLength(\'проверяемая строка\', 18) =',
  isValidStringLength('проверяемая строка', 18)
); // true
console.log(
  'isValidStringLength(\'проверяемая строка\', 10) =',
  isValidStringLength('проверяемая строка', 10)
); // false
console.groupEnd();

const isPalindrome = (string) => {
  if (!string.length) {
    return false;
  }

  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  return [...normalizedString].reduce((accumulator, character, index) =>
    accumulator && character === normalizedString.at(-index - 1), true);
};

console.groupCollapsed('isPalindrome');
console.log(
  'isPalindrome(\'ЛёШа на полке Клопа нашёл \') =',
  isPalindrome('ЛёШа на полке Клопа нашёл ')
); // true
console.log(
  'isPalindrome(\'МоЛебен о Коне бЕлом\') =',
  isPalindrome('МоЛебен о Коне бЕлом')
); // true
console.log(
  'isPalindrome(\'Искать такси\') =',
  isPalindrome('Искать такси')
); // true
console.log(
  'isPalindrome(\'   \') =',
  isPalindrome('   ')
); // true
console.log(
  'isPalindrome(\'МИР УДОБЕН\') =',
  isPalindrome('МИР УДОБЕН')
); // false
console.log(
  'isPalindrome(\'1234321\') =',
  isPalindrome('1234321')
); // true
console.log(
  'isPalindrome(\'1357\') =',
  isPalindrome('1357')
); // false
console.groupEnd();

const getNumbers = (value) => {
  const string = typeof value === 'number' ? value.toString() : value;
  const filteredString = [...string].filter((character) => !Number.isNaN(parseInt(character, 10))).join('');

  return parseInt(filteredString, 10) || NaN;
};

console.groupCollapsed('getNumbers');
console.log('getNumbers(\'2023 год\') =', getNumbers('2023 год')); // 2023
console.log('getNumbers(\'ECMAScript 2022\') =', getNumbers('ECMAScript 2022')); // 2022
console.log('getNumbers(\'1 кефир, 0.5 батона\') =', getNumbers('1 кефир, 0.5 батона')); // 105
console.log('getNumbers(\'агент 007\') =', getNumbers('агент 007')); // 7
console.log('getNumbers(\'а я томат\') =', getNumbers('а я томат')); // NaN
console.log('getNumbers(2023) =', getNumbers(2023)); // 2023
console.log('getNumbers(-1) =', getNumbers(-1)); // 1
console.log('getNumbers(1.5) =', getNumbers(1.5)); // 15
console.groupEnd();

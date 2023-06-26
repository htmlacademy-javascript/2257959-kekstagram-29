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

const isPalindromeSecondVersion = (string) => {
  if (!string.length) {
    return false;
  }

  const normalizedString = string.replaceAll(' ', '');

  if (normalizedString) {
    for (let index = 0; index < string.length / 2; index += 1) {
      const character = normalizedString.at(index);
      const compareResult = character.localeCompare(
        normalizedString.at(-index - 1),
        undefined,
        { sensitivity: 'base' }
      );

      if (compareResult !== 0) {
        return false;
      }
    }
  }

  return true;
};

isPalindromeSecondVersion('ЛёШа на полке Клопа нашёл ');

const getNumbers = (value) => {
  const string = String(value);
  const filteredString = [...string].filter((character) =>
    !Number.isNaN(parseInt(character, 10))).join('');

  return parseInt(filteredString, 10) || NaN;
};

getNumbers('ECMAScript 2022');

const getMinutesInHours = (string) => string
  .split(':')
  .reduce((accumulator, element, index) => index === 0
    ? accumulator + parseInt(element, 10) * 60
    : accumulator + parseInt(element, 10), 0);

const isWithinWorkingHours = (startTimeDay, endTimeDay, startTimeMeeting, durationMeeting) => {
  const endTimeMeeting = getMinutesInHours(startTimeMeeting) + durationMeeting;
  const isAfterStartTimeDay = getMinutesInHours(startTimeDay) <= getMinutesInHours(startTimeMeeting);
  const isBeforeEndTimeDay = getMinutesInHours(endTimeDay) >= endTimeMeeting;
  return isAfterStartTimeDay && isBeforeEndTimeDay;
};

isWithinWorkingHours('08:00', '17:30', '14:00', 90);

const getRandomIntegerInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const createSequence = (startNumber = 1) => {
  let index = startNumber;
  return () => index++;
};

const getRandomArrayElement = (elements) =>
  elements[getRandomIntegerInclusive(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const handleEscapeKey = (callback, evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

const show = (element) => element.classList.remove('hidden');

const hide = (element) => element.classList.add('hidden');

const isHidden = (element) => element.classList.contains('hidden');

export {
  getRandomIntegerInclusive,
  createSequence,
  getRandomArrayElement,
  handleEscapeKey,
  show,
  hide,
  isHidden,
};

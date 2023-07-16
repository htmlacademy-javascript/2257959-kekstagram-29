const ERROR_SHOW_TIME = 3000;

const errorBlockStyle = {
  zIndex: '10',
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  padding: '10px 5px',
  fontSize: '16px',
  textAlign: 'center',
  color: '#ffffff',
  backgroundColor: '#fb4c4c',
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const handleEscapeKey = (callback, evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    callback();
  }
};

const show = (element) => element.classList.remove('hidden');

const hide = (element) => element.classList.add('hidden');

const isHidden = (element) => element.classList.contains('hidden');

const showErrorBlock = (message) => {
  const errorBlock = document.createElement('div');

  Object.entries(errorBlockStyle).forEach(([key, value]) => {
    errorBlock.style[key] = value;
  });
  errorBlock.textContent = message;

  document.body.append(errorBlock);

  setTimeout(() => errorBlock.remove(), ERROR_SHOW_TIME);
};

export {
  handleEscapeKey,
  show,
  hide,
  isHidden,
  showErrorBlock,
};

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}/i;
const HASHTAG_COUNT_LIMIT = 5;
const COMMENT_LENGTH_LIMIT = 140;

const createPristineValidator = (form) => new Pristine(
  form,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  },
  true);

const normalizeHashtags = (hashtagString) => hashtagString.trim().toLowerCase().split(/\s+/);

const isValidHashtag = (hashtag) => HASHTAG_PATTERN.test(hashtag);

const validateHashtagCount = (hashtagString) =>
  normalizeHashtags(hashtagString).length <= HASHTAG_COUNT_LIMIT;

const validateHashtagUniqueness = (hashtagString) => {
  const normalizedHashtags = normalizeHashtags(hashtagString);
  return normalizedHashtags.length === new Set(normalizedHashtags).size;
};

const validateHashtagPattern = (hashtagString) =>
  !hashtagString || normalizeHashtags(hashtagString).every(isValidHashtag);

const validateTextarea = ({ length }) => length <= COMMENT_LENGTH_LIMIT;

const getHashtagCountErrorMessage = () => 'Нельзя указать больше пяти хэш-тегов !';
const getHashtagUniqErrorMessage = () => 'Один и тот же хэш-тег не может быть использован дважды !';
const getHashtagPatternErrorMessage = () => 'Введён невалидный хэш-тег !';
const getTextareaErrorMessage = () => 'Длина комментария не может составлять больше 140 символов !';

const onElementKeydown = (evt) => evt.stopPropagation();

const stopKeydownEventPropagation = (...elements) => elements.forEach((element) =>
  element.addEventListener('keydown', onElementKeydown));

const createFormValidation = (form) => {
  const hashtagsInput = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = createPristineValidator(form);

  pristine.addValidator(hashtagsInput, validateHashtagCount, getHashtagCountErrorMessage, 3, true);
  pristine.addValidator(hashtagsInput, validateHashtagUniqueness, getHashtagUniqErrorMessage, 2, true);
  pristine.addValidator(hashtagsInput, validateHashtagPattern, getHashtagPatternErrorMessage, 1, false);
  pristine.addValidator(textarea, validateTextarea, getTextareaErrorMessage);

  stopKeydownEventPropagation(hashtagsInput, textarea);

  return {
    validate: () => pristine.validate(hashtagsInput, textarea),
    reset: pristine.reset,
  };
};

export { createFormValidation };

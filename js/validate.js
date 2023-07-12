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

const normalizeHashtagTags = (hashtagString) => hashtagString.trim().toLowerCase().split(/\s+/);

const isValidHashtag = (hashtag) => HASHTAG_PATTERN.test(hashtag);

const validateHashtagCount = (hashtagString) =>
  normalizeHashtagTags(hashtagString).length <= HASHTAG_COUNT_LIMIT;

const validateHashtagUniq = (hashtagString) => {
  const normalizeHashtags = normalizeHashtagTags(hashtagString);
  return normalizeHashtags.length === new Set(normalizeHashtags).size;
};

const validateHashtagPattern = (hashtagString) =>
  !hashtagString || normalizeHashtagTags(hashtagString).every(isValidHashtag);

const validateTextarea = (comment) => comment.length <= COMMENT_LENGTH_LIMIT;

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
  pristine.addValidator(hashtagsInput, validateHashtagUniq, getHashtagUniqErrorMessage, 2, true);
  pristine.addValidator(hashtagsInput, validateHashtagPattern, getHashtagPatternErrorMessage, 1, false);
  pristine.addValidator(textarea, validateTextarea, getTextareaErrorMessage);

  stopKeydownEventPropagation(hashtagsInput, textarea);

  return {
    validate: () => pristine.validate(hashtagsInput, textarea),
    reset: pristine.reset,
  };
};

export { createFormValidation };

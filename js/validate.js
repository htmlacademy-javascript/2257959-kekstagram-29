const HASHTAG_PATTERN = /#[a-zа-яё0-9]{1,19}/i;
const HASHTAG_COUNT_LIMIT = 5;
const COMMENT_LENGTH_LIMIT = 140;

const createFormValidation = (form) => {
  const inputForHashtags = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  }, true);

  const validateHashtagCount = (value) => value.split(' ').length <= HASHTAG_COUNT_LIMIT;

  const validateHashtagUniq = (value) => {
    const hashtags = value
      .split(' ')
      .map((hashtag) => hashtag.toLowerCase());

    return hashtags.length === new Set(hashtags).size;
  };

  const validateHashtagPattern = (value) => {
    const hashtags = value.split(' ');
    return !value.length || hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag));
  };

  const validateTextarea = (value) => value.length <= COMMENT_LENGTH_LIMIT;

  const getHashtagCountErrorMessage = () => 'Нельзя указать больше пяти хэш-тегов !';
  const getHashtagUniqErrorMessage = () => 'Один и тот же хэш-тег не может быть использован дважды !';
  const getHashtagPatternErrorMessage = () => 'Введён невалидный хэш-тег !';
  const getTextareaErrorMessage = () => 'Длина комментария не может составлять больше 140 символов !';

  pristine.addValidator(inputForHashtags, validateHashtagCount, getHashtagCountErrorMessage);
  pristine.addValidator(inputForHashtags, validateHashtagUniq, getHashtagUniqErrorMessage);
  pristine.addValidator(inputForHashtags, validateHashtagPattern, getHashtagPatternErrorMessage);
  pristine.addValidator(textarea, validateTextarea, getTextareaErrorMessage);

  const onInputForHashtagsKeydown = (evt) => evt.stopPropagation();
  const onTextareaKeydown = (evt) => evt.stopPropagation();

  inputForHashtags.addEventListener('keydown', onInputForHashtagsKeydown);
  textarea.addEventListener('keydown', onTextareaKeydown);

  return {
    validate: () => pristine.validate(inputForHashtags, textarea),
    reset: pristine.reset,
  };
};

export { createFormValidation };

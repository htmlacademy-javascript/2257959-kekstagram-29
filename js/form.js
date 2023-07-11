import { handleEscapeKey } from './utils.js';
import { createFormValidation } from './validate.js';
import { createFormScaling } from './scale.js';
import { createFormSlider } from './slider.js';

const form = document.querySelector('#upload-select-image');
const image = form.querySelector('.img-upload__preview img');
const inputToUploadFile = form.querySelector('#upload-file');
const formModal = form.querySelector('.img-upload__overlay');
const buttonToCloseModal = form.querySelector('.img-upload__cancel');

const formValidation = createFormValidation(form);
const formScaling = createFormScaling(form, image);
const formSlider = createFormSlider(form, image);

const onInputToUploadFile = () => {
  openFormModal();
};

const onButtonToCloseModalClick = () => closeFormModal();

const onDocumentKeydown = handleEscapeKey.bind(null, closeFormModal);

const onFormSubmit = (evt) => {
  const isValidForm = formValidation.validate();

  if (isValidForm) {
    form.submit(); // временная заглушка
  }

  evt.preventDefault();
};

const formReset = () => {
  form.reset();
  formValidation.reset();
  formScaling.reset();
  formSlider.reset();
};

function closeFormModal() {
  document.body.classList.remove('modal-open');
  formModal.classList.add('hidden');

  formReset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function openFormModal() {
  document.body.classList.add('modal-open');
  formModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

const initiateForm = () => {
  inputToUploadFile.addEventListener('change', onInputToUploadFile);
  buttonToCloseModal.addEventListener('click', onButtonToCloseModalClick);
  form.addEventListener('submit', onFormSubmit);
};

export { initiateForm };

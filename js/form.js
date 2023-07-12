import {
  handleEscapeKey,
  show,
  hide,
} from './utils.js';
import { createFormValidation } from './validate.js';
import { createFormScaling } from './scale.js';
import { createFormSlider } from './slider.js';

const form = document.querySelector('#upload-select-image');
const image = form.querySelector('.img-upload__preview img');
const uploadFileInput = form.querySelector('#upload-file');
const formModal = form.querySelector('.img-upload__overlay');
const closeModalButton = form.querySelector('.img-upload__cancel');

const formValidation = createFormValidation(form);
const formScaling = createFormScaling(form, image);
const formSlider = createFormSlider(form, image);

const onUploadFileInputChange = openFormModal;

const onCloseModalButtonClick = closeFormModal;

const onDocumentKeydown = (evt) => handleEscapeKey(closeFormModal, evt);

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
  hide(formModal);

  formReset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function openFormModal() {
  document.body.classList.add('modal-open');
  show(formModal);

  document.addEventListener('keydown', onDocumentKeydown);
}

const initiateForm = () => {
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  closeModalButton.addEventListener('click', onCloseModalButtonClick);
  form.addEventListener('submit', onFormSubmit);
};

export { initiateForm };

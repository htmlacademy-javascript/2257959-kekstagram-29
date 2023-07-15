import { getData } from './http.js';
import { showErrorBlock } from './utils.js';
import { renderThumbnails } from './thumbnail.js';
import { initiateForm } from './form.js';

getData()
  .then(renderThumbnails)
  .catch(({ message }) => showErrorBlock(message));

initiateForm();



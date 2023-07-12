import { createPhotos } from './photo.js';
import { renderThumbnails } from './thumbnail.js';
import { initiateForm } from './form.js';

const photos = createPhotos();
renderThumbnails(photos);

initiateForm();

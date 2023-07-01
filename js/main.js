import { createPhotos } from './photo.js';
import { displayThumbnails } from './thumbnail.js';

const photos = createPhotos();
displayThumbnails(photos);

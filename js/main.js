import { createPhotos } from './photo.js';
import { renderThumbnails } from './thumbnail.js';

const photos = createPhotos();
renderThumbnails(photos);

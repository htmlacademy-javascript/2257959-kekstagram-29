import { createPhotos } from './photo.js';

const createThumbnails = () => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const pictureList = document.createDocumentFragment();

  createPhotos().forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const image = pictureElement.querySelector('.picture__img');
    image.src = url;
    image.alt = description;

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureList.append(pictureElement);
  });

  picturesContainer.append(pictureList);
};

export { createThumbnails };

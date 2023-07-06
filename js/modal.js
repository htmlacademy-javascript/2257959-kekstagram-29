import { handleEscapeKey } from './util.js';

const photoModal = document.querySelector('.big-picture');
const photo = photoModal.querySelector('.big-picture__img img');
const likesCounter = photoModal.querySelector('.likes-count');
const currentCommentCounter = photoModal.querySelector('.social__comment-count').firstChild;
const overallCommentCounter = photoModal.querySelector('.comments-count');
const photoCaption = photoModal.querySelector('.social__caption');
const commentList = photoModal.querySelector('.social__comments');
const buttonToCloseModal = photoModal.querySelector('#picture-cancel');
const buttonToLoadComments = photoModal.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const setCommentCounter = (initialCount) => {
  const initialCommentCount = initialCount >= 5 ? 5 : initialCount;
  currentCommentCounter.textContent = `${initialCommentCount} из `;
};

const increaseCommentCounter = (count) => {
  let currentCommentCount = Number(currentCommentCounter.textContent.split(' ')[0]);
  currentCommentCount += count;
  currentCommentCounter.textContent = `${currentCommentCount} из `;
};

const createComment = ({ avatar: avatarPath, message, name }) => {
  const comment = commentTemplate.cloneNode(true);

  const avatar = comment.querySelector('.social__picture');
  avatar.src = avatarPath;
  avatar.alt = name;

  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const appendComments = (commentData) => {
  commentList.innerHTML = '';
  commentList.append(...commentData.map((commentDatum, index) => {
    const comment = createComment(commentDatum);

    if (index >= 5) {
      comment.classList.add('hidden');
    }

    return comment;
  }));
};

const renderComments = () => {
  const filteredComments = [...commentList.children]
    .filter((item) => item.classList.contains('hidden'));
  const { length } = filteredComments;

  if (length <= 5) {
    buttonToLoadComments.classList.add('hidden');
  }

  let index = 0;
  while (index < length && index < 5) {
    filteredComments[index].classList.remove('hidden');
    index += 1;
  }

  return index;
};

const initiatePhotoModal = (url, description, likes, comments) => {
  const { length } = comments;

  photo.src = url;
  likesCounter.textContent = likes;
  overallCommentCounter.textContent = length;
  photoCaption.textContent = description;

  if (length <= 5) {
    buttonToLoadComments.classList.add('hidden');
  }

  setCommentCounter(length);
  appendComments(comments);
};

const onDocumentKeydown = handleEscapeKey.bind(null, closePhotoModal);

function closePhotoModal() {
  document.body.classList.remove('modal-open');
  buttonToLoadComments.classList.remove('hidden');
  photoModal.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPhotoModal = () => {
  document.body.classList.add('modal-open');
  photoModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

const renderPhotoModal = (...photoParameters) => {
  initiatePhotoModal(...photoParameters);
  openPhotoModal();
};

const onButtonToCloseModalClick = () => closePhotoModal();
const onButtonToLoadCommentsClick = () => {
  const count = renderComments();
  increaseCommentCounter(count);
};

buttonToCloseModal.addEventListener('click', onButtonToCloseModalClick);
buttonToLoadComments.addEventListener('click', onButtonToLoadCommentsClick);

export { renderPhotoModal };

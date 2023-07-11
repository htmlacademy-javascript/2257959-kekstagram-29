import { handleEscapeKey } from './utils.js';

const COMMENTS_PER_LOAD = 5;

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
  const initialCommentCount = initialCount >= COMMENTS_PER_LOAD
    ? COMMENTS_PER_LOAD
    : initialCount;
  currentCommentCounter.textContent = `${initialCommentCount} из `;
};

const increaseCommentCounter = (count) => {
  let currentCommentCount = parseInt(currentCommentCounter.textContent, 10);
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

    if (index >= COMMENTS_PER_LOAD) {
      comment.classList.add('hidden');
    }

    return comment;
  }));
};

const renderComments = () => {
  const filteredComments = [...commentList.children]
    .filter((item) => item.classList.contains('hidden'));
  const { length } = filteredComments;

  if (length <= COMMENTS_PER_LOAD) {
    buttonToLoadComments.classList.add('hidden');
  }

  let index = 0;
  while (index < length && index < COMMENTS_PER_LOAD) {
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

  if (length <= COMMENTS_PER_LOAD) {
    buttonToLoadComments.classList.add('hidden');
  }

  setCommentCounter(length);
  appendComments(comments);
};

const onDocumentKeydown = handleEscapeKey.bind(null, closePhotoModal);

const onButtonToCloseModalClick = () => closePhotoModal();

const onButtonToLoadCommentsClick = () => {
  const count = renderComments();
  increaseCommentCounter(count);
};

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

buttonToCloseModal.addEventListener('click', onButtonToCloseModalClick);
buttonToLoadComments.addEventListener('click', onButtonToLoadCommentsClick);

export { renderPhotoModal };

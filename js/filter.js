import { debounce, setRandomUniqueArrayPicker } from './utils.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const filters = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => {
    const getRandomUniqueArrayElement = setRandomUniqueArrayPicker(photos);
    return Array.from({ length: RANDOM_PHOTOS_COUNT }, getRandomUniqueArrayElement);
  },
  'filter-discussed': (photos) =>
    photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length),
};

const renderButton = (clickedButton, filtersState) => {
  filtersState.activeFilter.classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
};

function onFilterButtonClick(photos, optimizedRenderThumbnails, filtersState) {
  const filterPhotos = filters[this.id];

  if (filterPhotos && filtersState.activeFilter !== this) {
    const filteredPhotos = filterPhotos(photos);
    optimizedRenderThumbnails(filteredPhotos);

    renderButton(this, filtersState);
    filtersState.activeFilter = this;
  }
}

const initiateFilters = (photos, renderThumbnails) => {
  const optimizedRenderThumbnails = debounce(renderThumbnails, RERENDER_DELAY);
  const filtersState = {
    activeFilter: document.querySelector('.img-filters__button--active'),
  };

  filtersContainer.classList.remove('img-filters--inactive');

  filterButtons.forEach((filterButton) =>
    filterButton.addEventListener('click', onFilterButtonClick.bind(
      filterButton,
      photos,
      optimizedRenderThumbnails,
      filtersState
    )));
};

export { initiateFilters };

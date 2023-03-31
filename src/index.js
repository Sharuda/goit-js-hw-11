import './css/styles.css';
import { PixabayApi } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('#search-form');
const containerEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const pixabayApi = new PixabayApi();

formEl.addEventListener('submit', handleSearchImages);
loadMoreBtnEl.addEventListener('click', handleClickBtnLoadMore);

function handleSearchImages(event) {
  event.preventDefault();

  containerEl.innerHTML = '';
  pixabayApi.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayApi.resetPage();

  if (pixabayApi.query === '') {
    return;
  }

  fetchGallery();
  createGalleryImages(hits);
}

async function fetchGallery() {
  const dataImage = await pixabayApi.fetchGallery();
  const { hits, total } = dataImage;

  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );

    return;
  }

  loadMoreBtnEl.classList.remove('is-hidden');
  createGalleryImages(hits);
}

function handleClickBtnLoadMore() {
  pixabayApi.incrementPage();
  fetchGallery();
}

function createGalleryImages(array) {
  const markup = array
    .map(
      ({
        likes,
        views,
        comments,
        downloads,
        tags,
        webformatURL,
        largeImageURL,
      }) => {
        return `<div class="photo-card">
  <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  containerEl.insertAdjacentHTML('beforeend', markup);
}

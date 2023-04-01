import './css/styles.css';
import { PixabayApi } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const containerEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const lightboxGallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

let isShownImages = 0;

const pixabayApi = new PixabayApi();

formEl.addEventListener('submit', handleSearchImages);
loadMoreBtnEl.addEventListener('click', handleClickBtnLoadMore);

function handleSearchImages(event) {
  event.preventDefault();
  const { hits } = pixabayApi.fetchGallery();

  containerEl.innerHTML = '';

  pixabayApi.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayApi.resetPage();

  isShownImages = 0;

  fetchGallery();
  createGalleryImages(hits);
}

function handleClickBtnLoadMore() {
  pixabayApi.incrementPage();
  fetchGallery();
}

async function fetchGallery() {
  loadMoreBtnEl.classList.add('is-hidden');

  const dataImage = await pixabayApi.fetchGallery();
  const { hits, total } = dataImage;

  isShownImages += hits.length;

  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    loadMoreBtnEl.classList.add('is-hidden');
    return;
  }

  createGalleryImages(hits);
  isShownImages += hits.length;

  if (isShownImages < total) {
    Notify.success(`Hooray! We found ${total} images !!!`);
    loadMoreBtnEl.classList.remove('is-hidden');
  }

  if (isShownImages >= total) {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function createGalleryImages(array) {
  const markup = array
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
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
  lightboxGallery.refresh();
}

import './css/styles.css';
import { PixabayApi } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('#search-form');
const containerEl = document.querySelector('.gallery');

const pixabayApi = new PixabayApi();

formEl.addEventListener('submit', handleSearchImages);

function handleSearchImages(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.value;
  pixabayApi.query = searchQuery;
  pixabayApi.page = 1;

  pixabayApi
    .fetchImages()
    .then(({ data }) => {
      if (!data.results.length) {
        Notify.failure(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
        return;
      }

      containerEl.innerHTML = createGalleryImages(data.results);
    })
    .catch(err => {
      console.log(err);
    });
}

function createGalleryImages(array) {
  const markup = array
    .map(({ likes, views, comments, downloads, tags, webformatURL }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
    })
    .join('');

  containerEl.insertAdjacentHTML('beforeend', markup);
}

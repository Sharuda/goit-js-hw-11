import './css/styles.css';
import PixabayApi from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('#search-form');
const containerEl = document.querySelector('.gallery');

const pixabayApi = new PixabayApi();

let isShown = 0;

formEl.addEventListener('submit', handleSearchImages);

function handleSearchImages(event) {
  event.preventDefault();

  containerEl.innerHTML = '';
  pixabayApi.query = e.currentTarget.elements.searchQuery.value.trim();
  // newsApiService.resetPage();

  if (pixabayApi.query === '') {
    Notify.warning('Please, fill the main field');
    return;
  }

  isShown = 0;
  fetchGallery();
  onRenderGallery(hits);
}

async function fetchGallery() {
  //   refs.loadMoreBtn.classList.add('is-hidden');

  const r = await pixabayApi.fetchGallery();
  const { hits, total } = r;
  isShown += hits.length;

  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    // refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  createGalleryImages(hits);
  isShown += hits.length;
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
// -----

// function onSearch(e) {
//   e.preventDefault();

//   refs.galleryContainer.innerHTML = '';
//   newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
//   newsApiService.resetPage();

//   if (newsApiService.query === '') {
//     Notify.warning('Please, fill the main field');
//     return;
//   }

//   isShown = 0;
//   fetchGallery();
//   onRenderGallery(hits);
// }

// function onLoadMore() {
//   newsApiService.incrementPage();
//   fetchGallery();
// }

// async function fetchGallery() {
//   refs.loadMoreBtn.classList.add('is-hidden');

//   const r = await newsApiService.fetchGallery();
//   const { hits, total } = r;
//   isShown += hits.length;

//   if (!hits.length) {
//     Notify.failure(
//       `Sorry, there are no images matching your search query. Please try again.`
//     );
//     refs.loadMoreBtn.classList.add('is-hidden');
//     return;
//   }

//   onRenderGallery(hits);
//   isShown += hits.length;

//   if (isShown < total) {
//     Notify.success(`Hooray! We found ${total} images !!!`);
//     refs.loadMoreBtn.classList.remove('is-hidden');
//   }

//   if (isShown >= total) {
//     Notify.info("We're sorry, but you've reached the end of search results.");
//   }
// }

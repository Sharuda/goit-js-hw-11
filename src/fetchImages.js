import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34840339-667e92b06a5cc18aaab785dc8';

export class PixabayApi {
  page = 1;
  query = null;

  fetchImages() {
    return axios.get(`${BASE_URL}?key=${API_KEY}`, {
      params: {
        query: this.query,
        page: this.page,
        orientation: 'horizontal',
        safesearch: true,
      },
    });
  }
}

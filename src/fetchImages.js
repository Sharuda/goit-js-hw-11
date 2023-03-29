import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34840339-667e92b06a5cc18aaab785dc8';

let page = 1;

export function FetchImages(query) {
  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&${page}`
  );
}

import axios from 'axios';

export class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }
  async fetchGallery() {
    const params = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '34840339-667e92b06a5cc18aaab785dc8',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.perPage}`,
      },
    };
    try {
      const response = await axios(params);

      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

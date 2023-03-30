import axios from 'axios';
import PIXABAY_API_KEY from './key';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async fetchArticles(amount) {
    const config = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      responseType: 'json',
      params: {
        key: PIXABAY_API_KEY,
        orientation: 'horizontal',
        safesearch: true,
        q: this.searchQuery,
        page: this.page,
        per_page: amount,
      },
    };

    const response = await axios(config);
    this.incrementPage();
    return response;
  }
}

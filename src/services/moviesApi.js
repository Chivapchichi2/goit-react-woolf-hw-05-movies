import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c79ebc5a4bb0dc4a78ae7b9d9db9a8b5';

const api = {
  getTrendingMovies(page) {
    return axios
      .get(`trending/movie/week?api_key=${API_KEY}&page=${page}`)
      .then(response => response.data.results);
  },
  getByQueryMovies(query, page) {
    return axios
      .get(`search/movie?api_key=${API_KEY}&page=${page}&query=${query}`)
      .then(response => response.data.results);
  },
  getMovieById(id, option = '', page = '') {
    return axios.get(`movie/${id}${option}?api_key=${API_KEY}${page}`);
  },
};

export default api;

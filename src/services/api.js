import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://10.0.3.2/',
  // baseUrl: 'http://127.0.0.1:3333/',
});

export default api;

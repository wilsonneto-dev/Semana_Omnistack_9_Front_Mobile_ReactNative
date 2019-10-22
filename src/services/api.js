import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://192.168.108.2:3333',
});

export default api;

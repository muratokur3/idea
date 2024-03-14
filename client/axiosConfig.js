import axios from 'axios';

import  logout  from './src/redux/actions/Logout'


const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // 401 hatası alındığında oturumu sonlandırma eylemini çağır
      logout();
    }
    return Promise.reject(error);
  }
);

export default instance;

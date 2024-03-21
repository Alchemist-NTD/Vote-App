import axios from 'axios';
import Cookies from "js-cookie"

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const access_token = Cookies.get('access');
    if(access_token){
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
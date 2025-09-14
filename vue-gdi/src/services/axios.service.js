import axios from 'axios';

const axiosMarche = axios.create({
    baseURL: 'http://localhost:3030',
});

axiosMarche.interceptors.request.use(config => {
    const token = localStorage.getItem('userToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosMarche;

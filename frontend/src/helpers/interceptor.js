// Add a request interceptor
import axios from 'axios'
export default function axiosSetUp() {
    axios.interceptors.request.use(
        function (config) {

            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
}

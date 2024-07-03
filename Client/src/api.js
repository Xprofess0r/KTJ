import axios from 'axios';

// axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: `/api/`,
    // baseURL: `http://localhost:5000/api/`
});

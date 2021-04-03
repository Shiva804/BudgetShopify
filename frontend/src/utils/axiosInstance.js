// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const Axios = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:5000',
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff

export default Axios;

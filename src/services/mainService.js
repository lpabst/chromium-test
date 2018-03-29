import axios from 'axios';

export const logIn = function() {
    return axios.post('/api/logIn/', {})
    .then(res => res.data)
}
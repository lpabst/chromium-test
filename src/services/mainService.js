import axios from 'axios';

export const logIn = function(loginCredentials) {
    return axios.post('/api/logIn/', loginCredentials)
    .then(res => res.data)
}

export const isLoggedIn = function() {
    return axios.get('/api/isLoggedIn/')
    .then(res => res.data)
}

export const logOut = function() {
    return axios.get('/api/logOut/')
    .then(res => res.data)
}
export const createUser = function(data) {
    return axios.post('/api/createUser/', data)
    .then(res => res.data)
}
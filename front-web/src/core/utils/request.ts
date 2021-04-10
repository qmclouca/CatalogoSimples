import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';

type LoginData = {
    username: string;
    password: string;
}
//O CORS foi liberado no backend então pode tirar o http://localhost:3000 e colocar o 8080, no arquivo 
//package.jason foi tirada a linha proxy: http://localhost:8080
const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'https://rlbpc-dscatalog.herokuapp.com';
//const BASE_URL = 'http://localhost:8080';

//interceptar requisições não autorizadas
axios.interceptors.response.use(function(response) {
    return response;
}, function (error) { //qualquer status fora do código 2XX
    if (error.response.status === 401 || error.response.status === 400) {
        logout();
    }
    return Promise.reject(error);
});

export const makeRequest = (params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL: BASE_URL
    });
}

export const makePrivateRequest = (params: AxiosRequestConfig) => {
    const sessionData = getSessionData();

    const headers = {
        'Authorization': `Bearer ${sessionData.access_token}`
    }
    return makeRequest({...params, headers});
}

export const makeLogin = (loginData: LoginData) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        //btoa : byte to asc para transforma para base32
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    // '/oauth/token'
    // modelo: username=maria@gmail.com&password=123456&grant_type=password
    // usar a biblioteca qs para montar as queries (instalar yarn add qs)
    // intalar também os tipos do da biblioteca qs com o comando yarn add @types/qs
    const payload = qs.stringify({ ...loginData, grant_type: 'password'});
    // pode-se evitar a utilização da biblioteca qs fazendo o payload
    // como: const payload = `username=${loginData.username}&password=${loginData.password}&grant_type=password`;
    return makeRequest({url: '/oauth/token', data: payload, method: 'POST', headers});
}
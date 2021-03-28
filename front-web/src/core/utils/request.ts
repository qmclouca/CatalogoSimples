import axios, { Method } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET } from './auth';

type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

type LoginData = {
    username: string;
    password: string;
}
//O CORS foi liberado no backend então pode tirar o http://localhost:3000 e colocar o 8080, no arquivo 
//package.jason foi tirada a linha proxy: http://localhost:8080
const BASE_URL = 'http://localhost:8080';

export const makeRequest = ({method = 'GET', url, data, params, headers }: RequestParams) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers
    });
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

    return makeRequest({url: '/oauth/token', data: payload, method: 'POST', headers});
}
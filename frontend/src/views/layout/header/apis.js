import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const make_register = (user) => {
    return axios.post(APIURL+'/register', user)
}

export const make_login = (user) => {
    return axios.post(APIURL+'/login', user)
}
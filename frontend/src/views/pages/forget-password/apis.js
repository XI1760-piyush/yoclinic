import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const recover_email = (data) => {
    return axios.post(APIURL+'/forget-password', data)
}


export const recover_otp = (data) => {
    return axios.post(APIURL+'/recover-password', data)
}

export const update_password =  (data) => {
    return axios.post(APIURL+'/change-otp-password', data)
}
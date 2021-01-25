import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const make_draft_start = (data) => {
    return axios.post(APIURL+'/draft/start', data)
}

export const save_draft_photo  = (data) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return axios.post(APIURL + '/draft/photo/save', data, config)
}

export const remove_draft_photo = (data) => {
    data = {...data, token : localStorage.getItem('token')}
    return axios.post(APIURL+'/draft/photo/remove', data)
}

export const save_product = (data) => {
    data = {...data, token : localStorage.getItem('token')}
    return axios.post(APIURL+'/product/save', data)
}
import axios from 'axios';
import { APIURL } from '../../../env';


export const update_profile = (data) => {
    return axios.post(APIURL + '/update-profile', data)
}


export const get_profile = (data) => {
    return axios.post(APIURL + '/get-profile', data)
}


export const update_image = (data) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return axios.post(APIURL + '/update-image', data, config)
}

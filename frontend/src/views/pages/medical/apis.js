import axios from 'axios';
import { APIURL } from '../../../env';


export const update_medical = (data) => {
    return axios.post(APIURL + '/update-medical', data)
}


export const get_medical = (data) => {
    return axios.post(APIURL + '/get-medical', data)
}

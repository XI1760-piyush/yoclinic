import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const remove_profile = (data) => {
    return axios.post(APIURL+'/remove-profile', data)
}


import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const make_change_password = (data) => {
    return axios.post(APIURL+'/change-password', data)
}


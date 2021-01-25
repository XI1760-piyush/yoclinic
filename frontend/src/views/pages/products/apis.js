import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const get_products = (data) => {
    return axios.post(APIURL+'/products', data)
}


import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const get_products = (data) => {
    return axios.post(APIURL+'/product/own', data)
}


export const remove_product = (data) => {
    return axios.post(APIURL+'/product/remove', data)
}


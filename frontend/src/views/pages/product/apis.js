import axios from 'axios';
import  { APIURL } from '../../../env'; 


export const get_product = (data) => {
    return axios.post(APIURL+'/product', data)
}


export const add_fav = (data) => {
    return axios.post(APIURL+'/add-fav', data)
}
 
 
export const remove_fav = (data) => {
    return axios.post(APIURL+'/remove-fav', data)
}
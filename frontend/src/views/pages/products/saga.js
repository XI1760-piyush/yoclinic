import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
    GET_PRODUCTS_START, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS
} from './constant';
import { get_products } from './apis';

export function* getProductAsync({ payload }) {
    try {
        payload = {...payload , token : localStorage.getItem('token')}
        let { data } = yield call(get_products.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': GET_PRODUCTS_FAILURE, data} )
        } else {
            yield put({ 'type': GET_PRODUCTS_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': GET_PRODUCTS_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}



export default function* watchAll() {
    yield all([
        takeEvery(GET_PRODUCTS_START, getProductAsync),
    ])

}
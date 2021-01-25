import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
    GET_MY_PRODUCT_START, GET_MY_PRODUCT_FAILURE, GET_MY_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_START, REMOVE_PRODUCT_FAILURE, REMOVE_PRODUCT_SUCCESS
} from './constant';
import { get_products, remove_product } from './apis';

export function* getProductAsync({ payload }) {
    try {
        payload = {...payload , token : localStorage.getItem('token')}
        let { data } = yield call(get_products.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': GET_MY_PRODUCT_FAILURE, data} )
        } else {
            yield put({ 'type': GET_MY_PRODUCT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': GET_MY_PRODUCT_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}

export function* removeProductAsync(payload) {
    try {
        payload = {pid:payload.payload , token : localStorage.getItem('token')}
        let { data } = yield call(remove_product.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': REMOVE_PRODUCT_FAILURE, data} )
        } else {
            yield put({ 'type': REMOVE_PRODUCT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': REMOVE_PRODUCT_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(GET_MY_PRODUCT_START, getProductAsync),
        takeEvery(REMOVE_PRODUCT_START, removeProductAsync)
    ])

}
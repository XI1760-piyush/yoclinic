import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
    GET_FAV_PRODUCT_START, GET_FAV_PRODUCT_FAILURE, GET_FAV_PRODUCT_SUCCESS
} from './constant';
import { get_products } from './apis';

export function* getProductAsync({ payload }) {
    try {
        payload = {...payload , token : localStorage.getItem('token')}
        let { data } = yield call(get_products.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': GET_FAV_PRODUCT_FAILURE, data} )
        } else {
            yield put({ 'type': GET_FAV_PRODUCT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': GET_FAV_PRODUCT_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(GET_FAV_PRODUCT_START, getProductAsync),
    ])

}
import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
    GET_PRODUCT_START, GET_PRODUCT_FAILURE, GET_PRODUCT_SUCCESS,
    ADD_FAV_PRODUCT_FAIL, ADD_FAV_PRODUCT_SUCCESS, ADD_FAV_PRODUCT_START,
    REMOVE_FAV_PRODUCT_FAIL, REMOVE_FAV_PRODUCT_SUCCESS, REMOVE_FAV_PRODUCT_START
} from './constant';
import { get_product, add_fav, remove_fav } from './apis';

export function* getProductAsync({payload}) {
    try {
        payload = {pid: payload , token : localStorage.getItem('token')}
        let { data } = yield call(get_product.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': GET_PRODUCT_FAILURE, data} )
        } else {
            yield put({ 'type': GET_PRODUCT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': GET_PRODUCT_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}


export function* addFavAsync({payload}) {
    try {
        payload = {pid: payload , token : localStorage.getItem('token')}
        let { data } = yield call(add_fav.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': ADD_FAV_PRODUCT_FAIL, data} )
        } else {
            yield put({ 'type': ADD_FAV_PRODUCT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': ADD_FAV_PRODUCT_FAIL, data: { message: 'Some Internal Error Occurred' } })
    }
}

export function* removeFavAsync({payload}) {
    try {
        payload = {pid: payload , token : localStorage.getItem('token')}
        let { data } = yield call(remove_fav.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': REMOVE_FAV_PRODUCT_FAIL, data} )
        } else {
            yield put({ 'type': REMOVE_FAV_PRODUCT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': REMOVE_FAV_PRODUCT_FAIL, data: { message: 'Some Internal Error Occurred' } })
    }
}


export default function* watchAll() {
    yield all([
        takeEvery(GET_PRODUCT_START, getProductAsync),
        takeEvery(ADD_FAV_PRODUCT_START, addFavAsync),
        takeEvery(REMOVE_FAV_PRODUCT_START, removeFavAsync),
    ])

}
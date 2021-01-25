import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
    MAKE_DRAFT_START, MAKE_DRAFT_FAILURE, MAKE_DRAFT_SUCCESS,
    SAVE_PHOTO_START, SAVE_PHOTO_SUCCESS, SAVE_PHOTO_FAILURE,
    SAVE_PRODUCT_START, SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE,
    REMOVE_PHOTO_START, REMOVE_PHOTO_FAILURE, REMOVE_PHOTO_SUCCESS
} from './constant';
import { make_draft_start, save_draft_photo, remove_draft_photo, save_product } from './apis';



export function* makeDraftStartAsync({ payload }) {
    try {
        payload = { ...payload, token: localStorage.getItem('token') }
        let { data } = yield call(make_draft_start.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': MAKE_DRAFT_FAILURE, did: data.data.did} )
        } else {
            yield put({ 'type': MAKE_DRAFT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': MAKE_DRAFT_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}


export function* makeSavePhotoAsync({ payload }) {
    try {
        let { data } = yield call(save_draft_photo.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': SAVE_PHOTO_FAILURE, did: data.data.did} )
        } else {
            yield put({ 'type': SAVE_PHOTO_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': SAVE_PHOTO_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}


export function* makeRemovePhotoAsync({ payload }) {
    try {
        let { data } = yield call(remove_draft_photo.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': REMOVE_PHOTO_FAILURE, did: data.data.did} )
        } else {
            yield put({ 'type': REMOVE_PHOTO_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': REMOVE_PHOTO_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}

export function* saveProductAsync({ payload }) {
    try {
        let { data } = yield call(save_product.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': SAVE_PRODUCT_FAILURE, data} )
        } else {
            yield put({ 'type': SAVE_PRODUCT_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': SAVE_PRODUCT_FAILURE, data: { message: 'Some Internal Error Occurred' } })
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(MAKE_DRAFT_START, makeDraftStartAsync),
        takeEvery(SAVE_PHOTO_START, makeSavePhotoAsync),
        takeEvery(REMOVE_PHOTO_START,  makeRemovePhotoAsync),
        takeEvery(SAVE_PRODUCT_START, saveProductAsync),
    ])

}
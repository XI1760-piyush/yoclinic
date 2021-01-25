import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
    UPDATE_PROFILE_START, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    GET_PROFILE_START, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL,
    UPDATE_IMAGE_START, UPDATE_IMAGE_SUCCESS, UPDATE_IMAGE_FAIL,
} from './constant';
import { update_profile, get_profile, update_image } from './apis';



export function* updateProfileAsync({ payload }) {
    payload = {...payload, token: localStorage.getItem('token')}
    try {
        let { data } = yield call(update_profile.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': UPDATE_PROFILE_FAIL, data })
        } else {
            yield put({ 'type': UPDATE_PROFILE_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': UPDATE_PROFILE_FAIL, data: { message: 'Some Internal Error Occurred' } })
    }
}



export function* getProfileAsync({ payload }) {
    payload = {...payload, token: localStorage.getItem('token')}
    try {
        let { data } = yield call(get_profile.bind(this, payload));

        if (data.status != 'success') {
            yield put({ 'type': GET_PROFILE_FAIL, data })
        } else {
            yield put({ 'type': GET_PROFILE_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': GET_PROFILE_FAIL, data: { message: 'Some Internal Error Occurred' } })
    }
}

export function* updateImageAsync({ payload }) {
    try {
        let { data } = yield call(update_image.bind(this, payload));

        if (data.status != 'success') {
            yield put({ 'type': UPDATE_IMAGE_FAIL, data })
        } else {
            yield put({ 'type': UPDATE_IMAGE_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': UPDATE_IMAGE_FAIL, data: { message: 'Some Internal Error Occurred' } })
    }
}



export default function* watchAll() {
    yield all([
        takeEvery(UPDATE_PROFILE_START, updateProfileAsync),
        takeEvery(GET_PROFILE_START, getProfileAsync),
        takeEvery(UPDATE_IMAGE_START, updateImageAsync),
    ])

}
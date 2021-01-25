import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
    UPDATE_MEDICAL_START, UPDATE_MEDICAL_SUCCESS, UPDATE_MEDICAL_FAIL,
    GET_MEDICAL_START, GET_MEDICAL_SUCCESS, GET_MEDICAL_FAIL
} from './constant';
import { update_medical, get_medical } from './apis';



export function* updateProfileAsync({ payload }) {
    payload = {...payload, token: localStorage.getItem('token')}
    try {
        let { data } = yield call(update_medical.bind(this, payload));
        if (data.status != 'success') {
            yield put({ 'type': UPDATE_MEDICAL_FAIL, data })
        } else {
            yield put({ 'type': UPDATE_MEDICAL_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': UPDATE_MEDICAL_FAIL, data: { message: 'Some Internal Error Occurred' } })
    }
}



export function* getProfileAsync({ payload }) {
    payload = {...payload, token: localStorage.getItem('token')}
    try {
        let { data } = yield call(get_medical.bind(this, payload));

        if (data.status != 'success') {
            yield put({ 'type': GET_MEDICAL_FAIL, data })
        } else {
            yield put({ 'type': GET_MEDICAL_SUCCESS, data })
        }
    } catch (error) {
        yield put({ 'type': GET_MEDICAL_FAIL, data: { message: 'Some Internal Error Occurred' } })
    }
}




export default function* watchAll() {
    yield all([
        takeEvery(UPDATE_MEDICAL_START, updateProfileAsync),
        takeEvery(GET_MEDICAL_START, getProfileAsync),
    ])

}
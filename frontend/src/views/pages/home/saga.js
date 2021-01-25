import { all, takeEvery } from 'redux-saga/effects'

import { FETCH_YML } from '../../../service/ApiLinks';


export function* fetchYmlAsync() {

}


export default function* watchAll() {
    yield all([
        takeEvery(FETCH_YML, fetchYmlAsync),
    ])
    
}
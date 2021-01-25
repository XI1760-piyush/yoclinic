import { all, put, takeEvery, call } from 'redux-saga/effects'

import { 
   CHANGE_PASSWORD_START, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS
} from './constant';
import { make_change_password } from './apis';


  
export function* makeChangePasswordAsync({payload}) {
    try {
        payload = {...payload , token : localStorage.getItem('token')}
        let { data } = yield call(make_change_password.bind(this,payload));
        if(data.status!='success'){
            yield put({'type': CHANGE_PASSWORD_FAIL, data})
        } else {
            yield   put({'type':CHANGE_PASSWORD_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': CHANGE_PASSWORD_FAIL, data: { message : 'Some Internal Error Occurred' }})
    }    
}


export default function* watchAll() {
    yield all([
        takeEvery(CHANGE_PASSWORD_START, makeChangePasswordAsync)
    ])
    
}
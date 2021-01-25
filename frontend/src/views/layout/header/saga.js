import { all, put, takeEvery, call } from 'redux-saga/effects'

import { 
    REG_START, REG_SUCCESS, REG_FAIL,
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL
} from './constant';
import { make_register, make_login } from './apis';


  

export function* makeRegAsync({payload}) {
    let user = payload.user;
    try {
        let { data } = yield call(make_register.bind(this,user));
        if(data.status!='success'){
            yield put({'type': REG_FAIL, data})
        } else {
            yield   put({'type':REG_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': REG_FAIL, data: { message : 'Some Internal Error Occurred' }})
    }    
}


export function* makeLoginAsync({payload}) {
    let user = payload.user;
    try {
        let { data } = yield call(make_login.bind(this,user));
        if(data.status!='success'){
            yield put({'type': LOGIN_FAIL, data})
        } else {
            yield   put({'type':LOGIN_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': LOGIN_FAIL, data: { message : 'Some Internal Error Occurred' }})
    }    
}


export default function* watchAll() {
    yield all([
        takeEvery(REG_START, makeRegAsync),
        takeEvery(LOGIN_START, makeLoginAsync)
    ])
    
}
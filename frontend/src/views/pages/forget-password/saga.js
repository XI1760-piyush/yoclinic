import { all, put, takeEvery, call } from 'redux-saga/effects'

import { 
    RECOVER_EMAIL_START, RECOVER_EMAIL_SUCCESS, RECOVER_EMAIL_FAIL,
    RECOVER_OTP_START, RECOVER_OTP_SUCCESS, RECOVER_OTP_FAIL,
    RECOVER_PASSWORD_START, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAIL
} from './constant';
import { recover_email, recover_otp, update_password } from './apis';


  
export function* recoverEmailAsync({payload}) {
    try {
        let { data } = yield call(recover_email.bind(this,payload));
        if(data.status!='success'){
            yield put({'type': RECOVER_EMAIL_FAIL, data})
        } else {
            yield   put({'type':RECOVER_EMAIL_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': RECOVER_EMAIL_FAIL, data: { message : 'Some Internal Error Occurred' }})
    }    
}

export function* recoverOtpAsync({payload}) {
    try {
        let { data } = yield call(recover_otp.bind(this,payload));
        if(data.status!='success'){
            yield put({'type': RECOVER_OTP_FAIL, data})
        } else {
            yield   put({'type':RECOVER_OTP_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': RECOVER_OTP_FAIL, data: { message : 'Some Internal Error Occurred' }})
    }    
}

export function* updatePasswordAsync({payload}) {
    try {
        let { data } = yield call(update_password.bind(this,payload));
        if(data.status!='success'){
            yield put({'type': RECOVER_PASSWORD_FAIL, data})
        } else {
            yield   put({'type':RECOVER_PASSWORD_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': RECOVER_PASSWORD_FAIL, data: { message : 'Some Internal Error Occurred' }})
    }    
}


export default function* watchAll() {
    yield all([
        takeEvery(RECOVER_EMAIL_START, recoverEmailAsync),
        takeEvery(RECOVER_OTP_START, recoverOtpAsync),
        takeEvery(RECOVER_PASSWORD_START, updatePasswordAsync),
    ])
    
}
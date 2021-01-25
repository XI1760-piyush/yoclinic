import { all, put, takeEvery, call } from 'redux-saga/effects'

import { 
   REMOVE_PROFILE_START, REMOVE_PROFILE_FAIL, REMOVE_PROFILE_SUCCESS
} from './constant';
import { remove_profile } from './apis';


  
export function* makeChangePasswordAsync({payload}) {
    try {
        payload = {...payload , token : localStorage.getItem('token')}
        let { data } = yield call(remove_profile.bind(this,payload));
        if(data.status!='success'){
            yield put({'type': REMOVE_PROFILE_FAIL, data})
        } else {
            yield   put({'type':REMOVE_PROFILE_SUCCESS, data})
        }
    }  catch(error) {
            yield put({'type': REMOVE_PROFILE_FAIL, data: { message : 'Some Internal Error Occurred' }})
    }    
}


export default function* watchAll() {
    yield all([
        takeEvery(REMOVE_PROFILE_START, makeChangePasswordAsync)
    ])
    
}
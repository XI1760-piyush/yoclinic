import { fork, all } from 'redux-saga/effects';
import headerSaga from '../views/layout/header/saga'
import passwordSaga from '../views/pages/change-password/saga'
import recoverSaga from '../views/pages/forget-password/saga'
import profileSaga from '../views/pages/profile/saga'
import medicalSaga from '../views/pages/medical/saga'
import removeSaga from '../views/pages/remove-account/saga'
import addProductSaga from '../views/pages/add-product/saga'
import myProductSaga from '../views/pages/my-products/saga'
import productSaga from '../views/pages/product/saga'
import productsSaga from '../views/pages/products/saga'
import searchSaga from '../views/pages/search/saga'
import favProductSaga from '../views/pages/favourites/saga'

export default function* rootSaga() {
    yield all([
        fork(headerSaga),
        fork(passwordSaga),
        fork(recoverSaga),
        fork(profileSaga),
        fork(medicalSaga),
        fork(removeSaga),
        fork(addProductSaga),
        fork(myProductSaga),
        fork(productSaga),
        fork(productsSaga),
        fork(favProductSaga),
        fork(searchSaga)
    ]);
}
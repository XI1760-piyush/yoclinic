import { combineReducers } from 'redux'
import headerReducer from '../views/layout/header/store';
import passwordReducer from '../views/pages/change-password/store';
import recoverReducer from '../views/pages/forget-password/store';
import profileReducer from '../views/pages/profile/store';
import medicalReducer from '../views/pages/medical/store';
import removeReducer from '../views/pages/remove-account/store';
import addProductReducer from '../views/pages/add-product/store';
import myProductReducer from '../views/pages/my-products/store';
import productReducer from '../views/pages/product/store';
import productsReducer from '../views/pages/products/store';
import favProductReducer from '../views/pages/favourites/store';
import searchReducer from '../views/pages/search/store';

export default combineReducers({
  headerReducer,
  passwordReducer,
  recoverReducer,
  profileReducer,
  medicalReducer,
  removeReducer,
  addProductReducer,
  myProductReducer,
  productReducer,
  productsReducer,
  favProductReducer,
  
  searchReducer
})
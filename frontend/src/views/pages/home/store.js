import { FETCH_YML } from '../../../service/ApiLinks';


export default function storeCases(state = {}, action) {

  switch (action.type) {
  case FETCH_YML :
   return  { ...state }

   default:
    return state
  }
}


import { CHANGE_PASSWORD_START } from './constant';



export const make_change_password = (data) => ({
  type: CHANGE_PASSWORD_START,
  payload: data
})


import { REG_START, LOGIN_START } from './constant';



export const make_register = (user) =>({
  type: REG_START,
  payload: { user }
})

export const make_login = (user) =>({
  type: LOGIN_START,
  payload: { user }
})

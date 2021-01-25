import { RECOVER_EMAIL_START, RECOVER_OTP_START, RECOVER_PASSWORD_START } from './constant';



export const make_recover_password = (data) => ({
  type: RECOVER_EMAIL_START,
  payload: data
})

export const make_recover_otp = (data) => ({
  type: RECOVER_OTP_START,
  payload: data
})

export const update_password = (data) => ({
  type: RECOVER_PASSWORD_START,
  payload: data
})
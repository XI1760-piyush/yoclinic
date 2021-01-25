var jwt = require('jsonwebtoken');
var UserMdl = require('../models/users');


async function register(req, res) {
    let post = { ...req.body }

    let name, email, phone, password, type
    
    if (post.type!='doctor' || post.type!='patient') {
        type = post.type
    } else {
        return res.json({ 'status': 'failure', message: 'Please Select a Type' })
    }

    
    if (post.name) {
        if (post.name.length < 3) {
            return res.json({ 'status': 'failure', message: 'Name Should Be atleast 3 Character Long' })
        } else if (post.name.length > 32) {
            return res.json({ 'status': 'failure', message: 'Name Should Be atmost 50 Character Long' })
        } else {
            name = post.name
        }
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Name' })
    }


    if (post.email) {
        let emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (post.email.length < 3) {
            return res.json({ 'status': 'failure', message: 'Email Should Be atleast 3 Character Long' })
        } else if (post.email.length > 300) {
            return res.json({ 'status': 'failure', message: 'Email Should Be atmost 300 Character Long' })
        } else if (!post.email.match(emailReg)) {
            return res.json({ 'status': 'failure', message: 'Invalid Email Format' })
        } else {
            email = String(post.email).toLocaleLowerCase().trim()
        }
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Email' })
    }

    if (post.phone) {
        let phoneReg = /^[0-9]+$/
        if (post.phone.length != 10) {
            return res.json({ 'status': 'failure', message: 'Phone Number Should Be 10 Character Long' })
        } else if (!post.phone.match(phoneReg)) {
            return res.json({ 'status': 'failure', message: 'Phone Number Should Be Numeric Only' })
        } else {
            phone = String(post.phone).toLocaleLowerCase().trim()
        }

    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Phone Number' })
    }

    if (post.password) {
        if (post.password.length < 8) {
            return res.json({ 'status': 'failure', message: 'Password Should Be atleast 8 Character Long' })
        } else if (post.password.length > 32) {
            return res.json({ 'status': 'failure', message: 'Password Should Be atmost 32 Character Long' })
        } else {
            password = String(post.password)
        }
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Password' })
    }


    if (!post.cpassword) {
        return res.json({ 'status': 'failure', message: 'Please Enter Confirm Password' })
    }

    if (post.cpassword != post.password) {
        return res.json({ 'status': 'failure', message: 'Please Enter Confirm Password' })
    }

    try {
        let data
        data = await UserMdl.check_register({ email })
        if (data[0] && data[0].id) {
            return res.json({ 'status': 'failure', message: 'Email Already in Use' })
        }
        token = jwt.sign({ name, phone, email , type }, 'P!yush@1994');
        data = await UserMdl.do_register({ name, phone, email, password,type, token })
        if (data && data.insertId) {
            return res.json({ 'status': 'success', data: { token: token, name: name } })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }

}


async function login(req, res) {

    let post = { ...req.body }

    let userinfo, password
    if (post.userinfo) {
        userinfo = String(post.userinfo).toLocaleLowerCase().trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Phone Number or Email Address' })
    }

    if (post.password) {
        password = String(post.password)
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Password' })
    }

    try {
        let data, name
        data = await UserMdl.make_login({ userinfo, password })

        if (data[0] && data[0].id) {

            if(data[0].is_active!=1){
                return res.json({ 'status': 'failure', message: 'User Profile is Locked', })
            }

            token = jwt.sign({ name: data[0].name, phone: data[0].phone, email: data[0].email }, 'P!yush@1994');
            name = data[0].name
            data = await UserMdl.update_token({ uid: data[0].id, token })
            if (data && data.affectedRows) {
                return res.json({ 'status': 'success', data: { token: token, name: name } })
            }
        } else {
            return res.json({ 'status': 'failure', message: 'Invalid Username or Password', })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


async function forgetPassword(req, res) {
    let post = { ...req.body }
    let userinfo
    if (post.userinfo) {
        userinfo = String(post.userinfo).toLocaleLowerCase().trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Phone Number or Email Address' })
    }

    try {
        let data
        data = await UserMdl.check_exitence({ userinfo })
        if (data[0] && data[0].id) {
            otp = Math.floor(Math.random() * 1000000);

            data = await UserMdl.update_otp({ uid: data[0].id, otp })
            if (data && data.affectedRows) {
                return res.json({ 'status': 'success', message: 'OTP sent to Email Address', data: {} })
            }
        } else {
            return res.json({ 'status': 'success', message: 'Email Not in Use', data: {} })
        }

    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


async function recoverPassword(req, res) {

    let post = { ...req.body }
    let userinfo, otp
    if (post.userinfo) {
        userinfo = String(post.userinfo).toLocaleLowerCase().trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Phone Number or Email Address Not Found' })
    }

    if (post.otp) {
        let phoneReg = /^[0-9]+$/
        if (post.otp.length != 6) {
            return res.json({ 'status': 'failure', message: 'Phone Number Should Be 6 Character Long' })
        } else if (!post.otp.match(phoneReg)) {
            return res.json({ 'status': 'failure', message: 'Phone Number Should Be Numeric Only' })
        } else {
            otp = String(post.otp).toLocaleLowerCase().trim()
        }
    } else {
        return res.json({ 'status': 'failure', message: 'OTP Not Found' })
    }

    try {
        let data
        data = await UserMdl.check_otp({ userinfo, otp })

        if (data[0] && data[0].id) {
            return res.json({ 'status': 'success', message: 'OTP Successfully Matched', })
        } else {
            return res.json({ 'status': 'failure', message: 'Invalid OTP', })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }

}


async function changeOTPPassword(req, res) {

    let post = { ...req.body }
    let userinfo, otp, password
    if (post.userinfo) {
        userinfo = String(post.userinfo).toLocaleLowerCase().trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Phone Number or Email Address Not Found' })
    }

    if (post.otp) {
        let phoneReg = /^[0-9]+$/
        if (post.otp.length != 6) {
            return res.json({ 'status': 'failure', message: 'Phone Number Should Be 6 Character Long' })
        } else if (!post.otp.match(phoneReg)) {
            return res.json({ 'status': 'failure', message: 'Phone Number Should Be Numeric Only' })
        } else {
            otp = String(post.otp).toLocaleLowerCase().trim()
        }
    } else {
        return res.json({ 'status': 'failure', message: 'OTP Not Found' })
    }

    if (post.npassword) {
        if (post.npassword.length < 8) {
            return res.json({ 'status': 'failure', message: 'Password Should Be atleast 8 Character Long' })
        } else if (post.npassword.length > 32) {
            return res.json({ 'status': 'failure', message: 'Password Should Be atmost 32 Character Long' })
        } else {
            password = String(post.npassword)
        }
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Password' })
    }

    if (!post.cpassword) {
        return res.json({ 'status': 'failure', message: 'Please Enter Confirm Password' })
    }

    if (post.cpassword != post.npassword) {
        return res.json({ 'status': 'failure', message: 'Password and Confirm Password should be Same' })
    }

    try {
        let data
        data = await UserMdl.update_password_otp({ userinfo, otp, password })
        console.log(data)
        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Password Successfully Changed', data: {} })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Password Could Not Be Changed', data: {} })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


async function changePassword(req, res) {

    let post = { ...req.body }
    let opassword, npassword, cpassword, token

    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    if (post.opassword) {
        if (post.opassword.length < 8) {
            return res.json({ 'status': 'failure', message: 'Old Password Should Be atleast 8 Character Long' })
        } else if (post.opassword.length > 32) {
            return res.json({ 'status': 'failure', message: 'Old Password Should Be atmost 32 Character Long' })
        } else {
            opassword = String(post.opassword)
        }
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Old Password' })
    }


    if (post.npassword) {
        if (post.npassword.length < 8) {
            return res.json({ 'status': 'failure', message: 'Password Should Be atleast 8 Character Long' })
        } else if (post.npassword.length > 32) {
            return res.json({ 'status': 'failure', message: 'Password Should Be atmost 32 Character Long' })
        } else {
            npassword = String(post.npassword)
        }
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Password' })
    }


    if (!post.cpassword) {
        return res.json({ 'status': 'failure', message: 'Please Enter Confirm Password' })
    }

    if (post.cpassword != post.npassword) {
        return res.json({ 'status': 'failure', message: 'Confirm Password Should Be Same as New Password' })
    }

    if (post.cpassword == post.opassword) {
        return res.json({ 'status': 'failure', message: 'Password Cannot be Same as Old Password' })
    }

     try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }

        data = await UserMdl.verify_old_password({ opassword, uid: user[0].id })
        if (data && data[0] && data[0].id) { } else {
            return res.json({ 'status': 'failure', message: 'Old Password is Incorrect' })
        }

        data = await UserMdl.update_password({ uid:user[0].id, password: npassword })
        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Password Succesfully Changed', data: {} })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Password Could Not Be Changed', data: {} })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


exports.register = register;
exports.login = login;
exports.forgetPassword = forgetPassword;
exports.recoverPassword = recoverPassword;
exports.changeOTPPassword = changeOTPPassword;
exports.changePassword = changePassword;
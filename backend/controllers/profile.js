var fs = require('fs')
var md5 = require('md5');
var UserMdl = require('../models/users');


async function getProfile(req, res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    try {
        let user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        } else {
            return res.json({ 'status': 'success', data: user[0] })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }


}

async function updateProfile(req, res) {
    let post = { ...req.body }

    let name, phone, address, city, state, zipcode, token

    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
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

    if (post.address) {
        address = post.address
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Address' })
    }

    if (post.city) {
        city = post.city
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter City' })
    }

    if (post.state) {
        state = post.state
    } else {
        return res.json({ 'status': 'failure', message: 'Please Select State' })
    }

    if (post.zipcode) {
        zipcode = post.zipcode
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Zipcode' })
    }

    try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }

        data = await UserMdl.update_profile({ uid: user[0].id, name, phone, address, city, state, zipcode })
        user = await UserMdl.userinfo({ token })
        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Profile Updated Successfully', data: user[0] })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Profile Could Not Be Updated', data: {} })
        }


    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }

}



async function updateImage(req, res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    if (!req.file) {
        return res.json({ 'status': 'failure', message: 'Could Not Find Image', data: {} })
    }
    let pic = req.file;

    if (pic.size <= 0) {
        return res.json({ 'status': 'failure', message: 'Invalid Image or Image Currpted', data: {} })
    }

    if (['image/png', 'image/jpeg', ''].indexOf(pic.mimetype) < 0) {
        return res.json({ 'status': 'failure', message: 'Invalid Image Format , Use PNG or JPEG only', data: {} })
    }


    try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }

        let nameArr = String(pic.originalname).split('.')
        let ext = nameArr[nameArr.length - 1]
        let imgName = md5(user[0].email)
        let basePath = String(pic.path).replace(pic.filename, '')
        let newPath = basePath + 'profile-images/' + imgName + '.' + ext
        let savePath = '/profile-images/' + imgName + '.' + ext
        fs.renameSync(pic.path, newPath)

        data = await UserMdl.update_profile_pic({ uid: user[0].id, pic: savePath })
        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Profile Updated Successfully', data: { url: savePath } })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Profile Could Not Be Updated', data: {} })
        }

    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}



async function removeProfile(req, res) {
    let post = { ...req.body }

    let token, password

    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
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


    try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        if(password!=user[0].password) {
            return res.json({ 'status': 'failure', message: 'Invalid Password'})
        }

        data = await UserMdl.remove_profile({ uid: user[0].id })
        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Profile Removed Successfully'})
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Profile Could Not Be Removed', data: {} })
        }


    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }

}
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.updateImage = updateImage;
exports.removeProfile = removeProfile;
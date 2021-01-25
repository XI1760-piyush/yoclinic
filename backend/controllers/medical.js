var UserMdl = require('../models/users');
var MedMdl = require('../models/medical');

async function getMedical(req, res) {
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
            let medical = await MedMdl.getinfo({ id:user[0].id })
            return res.json({ 'status': 'success', data: medical[0] })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }


}

async function updateMedical(req, res) {
    let post = { ...req.body }
    let title, biography, did, tags, degree, exp, apointments

    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }
   

    if (post.title) {
        if (post.title.length < 3) {
            return res.json({ 'status': 'failure', message: 'Title Should Be atleast 3 Character Long' })
        } else if (post.title.length > 100) {
            return res.json({ 'status': 'failure', message: 'Title Should Be atmost 100 Character Long' })
        } else {
            title = post.title
        }
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Title' })
    }

    if (post.degree) {
        degree = post.degree
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Degree' })
    }

    if (post.experience) {
        experience = post.experience
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter experience' })
    }
    

    if (post.biography) {
        biography = post.biography
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Biography' })
    }

    if (post.tags) {
        tags = post.tags
    } else {
        return res.json({ 'status': 'failure', message: 'Please Enter Tags' })
    }

    try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        did = user[0].id
        data = await MedMdl.update_medical({ did: user[0].id, title, degree, experience, biography, tags })
        let medical = await MedMdl.getinfo({ token })
        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Medical Profile Updated Successfully', data: medical[0] })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Medical Profile Could Not Be Updated', data: {} })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }

}


exports.getMedical = getMedical;
exports.updateMedical = updateMedical;

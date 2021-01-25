var jwt = require('jsonwebtoken');
var fs = require('fs');
var UserMdl = require('../models/users');
var draftMdl = require('../models/drafts');


function makeUnique(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

async function startDraft(req, res) {

    let post = { ...req.body }
    let token

    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        await draftMdl.delete_old_draft(user[0].id);
        data = await draftMdl.start_draft(user[0].id);
        return res.json({ 'status': 'success', message: 'Draft Craeted', data: { did: data.insertId } })

    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


async function savePhoto(req, res) {
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
        let imgName = makeUnique(26);
        let basePath = String(pic.path).replace(pic.filename, '')
        let newPath = basePath + 'product-images/' + imgName + '.' + ext
        let savePath = '/product-images/' + imgName + '.' + ext
        fs.renameSync(pic.path, newPath)
        fs.unlink(pic.path,()=>{})
        data = await draftMdl.getImages(user[0].id)
        let arrImg
        if(!data[0].images){
            arrImg = [savePath]
        } else {
            arrImg = [...JSON.parse(data[0].images), savePath ]
        }
        data = await draftMdl.addImage(user[0].id,arrImg)

        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Image Added Successfully', data: arrImg })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Image Could Not Be Updated', data: {} })
        }

    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}

async function removePhoto(req, res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

     try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        data = await draftMdl.getImages(user[0].id)
        let arrImg = JSON.parse(data[0].images)
        let index = arrImg.indexOf(post.path)
        arrImg.splice(index,1)
        data = await draftMdl.addImage(user[0].id,arrImg)
        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Image Removed Successfully', data: arrImg })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Image Could Not Be Updated', data: {} })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }

}

exports.startDraft = startDraft;
exports.savePhoto = savePhoto;
exports.removePhoto = removePhoto;
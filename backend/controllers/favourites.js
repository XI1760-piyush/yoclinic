

var UserMdl = require('../models/users');
var productMdl = require('../models/product');
var favMdl = require('../models/favourite');


async function addFav(req, res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    if (post.pid) {
        pid = String(post.pid).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Product ID Not Found' })
    }

     try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        data  = await favMdl.addProduct({uid:user[0].id ,pid})
        return res.json({ 'status': 'success', message: "Product Added"  })
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}

async function removeFav(req, res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    if (post.pid) {
        pid = String(post.pid).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Product ID Not Found' })
    }

     try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        data  = await favMdl.removeProduct({uid:user[0].id ,pid})
        return res.json({ 'status': 'success', message: "Product Removed"  })
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


async function getFavs(req, res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    let cat, sort, order='desc';
    (!post.cat || post.cat == 'All') ? cat = '' : cat = String(post.cat).toLowerCase()
    if(!post.state || post.state=='Time') {
        sort = 'id'
    } else if(post.state=='Price (Low to High)') {
        sort = 'price'
        order= 'asc'
    } else if(post.state=='Price (High to Low)') {
        sort = 'price'
        order= 'desc'
    } else if (post.state=='Name'){
        sort = 'title'
    } else {
        sort = 'id'
    }
    let page = post.page ? post.page - 1 : 0
    let limit  = post.count ? post.count : 10 
    let start = page*limit

     try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        data  = await favMdl.listProduct({uid:user[0].id}, sort, order, cat, start, limit)
        let totalCount = await favMdl.listProduct_count({uid:user[0].id},sort, order, cat)
        return res.json({ 'status': 'success', message: null , data :{ list:data, totalCount : totalCount.length, page} })
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


exports.addFav = addFav
exports.removeFav = removeFav
exports.getFavs = getFavs
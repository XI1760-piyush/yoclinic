var jwt = require('jsonwebtoken');
var fs = require('fs');
var UserMdl = require('../models/users');
var draftMdl = require('../models/drafts');
var productMdl = require('../models/product');
var favMdl = require('../models/favourite');




async function saveProduct(req, res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    try {
        let data, user
        let product = {}
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        product['uid'] = user[0].id
        data = await draftMdl.getImages(user[0].id)
        let images = data[0]['images']

        if (post.pname) {
            product['title'] = String(post.pname).toLocaleLowerCase().trim();
        } else {
            return res.json({ 'status': 'failure', message: 'Please Enter Product Name', data: {} })
        }

        if (post.price) {
            if (!isNaN(post.price)) {
                product['price'] = String(post.price).toLocaleLowerCase().trim();
            } else {
                return res.json({ 'status': 'failure', message: 'Please Enter Should Be Numeric', data: {} })
            }

        } else {
            return res.json({ 'status': 'failure', message: 'Please Enter Price', data: {} })
        }

        if (post.category) {
            product['category'] = String(post.category).toLocaleLowerCase().trim();
        } else {
            return res.json({ 'status': 'failure', message: 'Please Select Product Category', data: {} })
        }

        if (post.description) {
            product['description'] = String(post.description).trim();
        } else {
            return res.json({ 'status': 'failure', message: 'Please Enter Product Description', data: {} })
        }

        if (!images) {
            return res.json({ 'status': 'failure', message: 'Please Select Atleadt One Image', data: {} })
        } else {
            product['images'] = images
        }

        if (post.tags && post.tags.length > 0) {
            product['tags'] = Array(post.tags).join(',');
        } else {
            return res.json({ 'status': 'failure', message: 'Please Enter Atleast One Tag for Product', data: {} })
        }
        product['fields'] = JSON.stringify(post.fields)

        if (post.newAddress) {
            if (post.address) {
                product['address'] = String(post.address).trim();
            } else {
                return res.json({ 'status': 'failure', message: 'Please Enter Address', data: {} })
            }

            if (post.city) {
                product['city'] = String(post.city).trim();
            } else {
                return res.json({ 'status': 'failure', message: 'Please Enter City', data: {} })
            }

            if (post.state) {
                product['state'] = String(post.state).trim();
            } else {
                return res.json({ 'status': 'failure', message: 'Please Select State', data: {} })
            }

            if (post.zipcode) {
                product['pincode'] = String(post.zipcode).trim();
            } else {
                return res.json({ 'status': 'failure', message: 'Please Select Zipcode', data: {} })
            }

            if (post.contact_no) {
                product['contact_no'] = String(post.contact_no).trim();
            } else {
                return res.json({ 'status': 'failure', message: 'Please Select Zipcode', data: {} })
            }
        }

        data = await productMdl.insertProduct(product);

        if (data && data.affectedRows) {
            return res.json({ 'status': 'success', message: 'Product Saved Successfully' })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred, Image Could Not Be Updated', data: {} })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }

}


async function ownProduct(req, res) {
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
        data = await productMdl.get_own_products(user[0].id, sort, order, cat, start, limit)
        totalCount = await productMdl.get_own_products_count(user[0].id, sort, order, cat)
        return res.json({ 'status': 'success', message: null, data: {list:data, totalCount: totalCount.length , page }})

    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


async function removeProduct(req, res) {
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
        data = await productMdl.remove_products(user[0].id, pid)
        console.log(data)
        if (data && data.affectedRows) {
            data = await productMdl.get_own_products(user[0].id)
            return res.json({ 'status': 'success', message: 'Product Removed Successfully', data })
        } else {
            return res.json({ 'status': 'failure', message: 'Some Problem Occurred', data: {} })
        }
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


async function getProduct(req, res) {
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
        let data, user, related, fav
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        data = await productMdl.get_product(pid)
        data = { ...data[0] }
        fav = await favMdl.getProduct({ uid: user[0].id, pid })
        data['isFav'] = fav.length
        related = await productMdl.get_product_category(data['category'])
        return res.json({ 'status': 'success', message: null, data: { product: data, user: user[0], related } })
    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}

async function searchProduct (req,res) {
    let post = { ...req.body }
    if (post.token) {
        token = String(post.token).trim()
    } else {
        return res.json({ 'status': 'failure', message: 'Token Not Found' })
    }

    let search = post.search ?  post.search : ''
    let loc = post.loc ?  post.loc : ''

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


    //try {
        let data, user
        user = await UserMdl.userinfo({ token })
        if (!(user[0] && user[0].id)) {
            return res.json({ 'status': 'failure', message: 'Invalid Token, Please Login Again' })
        }
        data = await productMdl.get_search_products(sort, order, cat, start, limit, search, loc)
        let totalCount = await productMdl.get_search_products_count(sort, order, cat, search, loc)
       
        return res.json({ 'status': 'success', message: null, data: { list:data, totalCount:totalCount.length, page } })

    // } catch (e) {
    //     return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    // }

}

async function listProduct(req, res) {
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
        data = await productMdl.get_products(sort, order, cat, start, limit)
        let totalCount = await productMdl.get_products_count(sort, order, cat)
       
        return res.json({ 'status': 'success', message: null, data: { list:data, totalCount:totalCount.length, page } })

    } catch (e) {
        return res.json({ 'status': 'failure', message: 'Some Error Occurred' })
    }
}


exports.saveProduct = saveProduct
exports.ownProduct = ownProduct
exports.removeProduct = removeProduct
exports.getProduct = getProduct
exports.searchProduct = searchProduct
exports.listProduct = listProduct
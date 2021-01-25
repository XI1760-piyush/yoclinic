var express = require('express')
var router = express.Router()
const multer = require('multer');
const upload = multer({ dest: __dirname+'/uploads/' });

// import controllers
var userCtrl = require('./controllers/user');
var profileCtrl = require('./controllers/profile');
var draftCtrl = require('./controllers/draft')
var productCtrl = require('./controllers/product')
var favCtrl = require('./controllers/favourites')
var medicalCtrl = require('./controllers/medical');


// routes
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/forget-password', userCtrl.forgetPassword);
router.post('/recover-password', userCtrl.recoverPassword);
router.post('/change-otp-password', userCtrl.changeOTPPassword);
router.post('/change-password', userCtrl.changePassword);

router.post('/update-profile', profileCtrl.updateProfile);
router.post('/get-profile', profileCtrl.getProfile);
router.post('/update-image', upload.single('profilePic'), profileCtrl.updateImage);
router.post('/remove-profile',  profileCtrl.removeProfile);

router.post('/draft/start',  draftCtrl.startDraft);
router.post('/draft/photo/save',upload.single('productPic'), draftCtrl.savePhoto);
router.post('/draft/photo/remove', draftCtrl.removePhoto);

router.post('/product/save', productCtrl.saveProduct);
router.post('/product/own', productCtrl.ownProduct);
router.post('/product/remove', productCtrl.removeProduct);
router.post('/products', productCtrl.listProduct);
router.post('/product', productCtrl.getProduct);
router.post('/add-fav', favCtrl.addFav);
router.post('/remove-fav', favCtrl.removeFav);
router.post('/favs', favCtrl.getFavs);


router.post('/update-medical', medicalCtrl.updateMedical);
router.post('/get-medical', medicalCtrl.getMedical);

router.post('/search', productCtrl.searchProduct);



module.exports = router
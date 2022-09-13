const express=require('express');
const {login,testRoles}=require('../controllers/loginControllers');
const verifyJWT = require('../middelware/verifyJWT');

const testRole=require('../middelware/isGuest')
const router=express.Router();

router.post('/',login )
router.get('/',verifyJWT,testRole,testRoles)



module.exports = router
const express = require('express');
const router =express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');


router.get('/profile/:id',passport.checkAuthentication,userController.user);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-in',userController.userSignin);
router.get('/sign-up',userController.userSignup);
router.post('/create',userController.create);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile', 'email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

module.exports = router;
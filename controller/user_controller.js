const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.user = async function (req, res) {
     let findUser = await User.findById(req.params.id);
    return res.render('user', {
        title: 'user profile',
         profile_user: findUser
    })
}


module.exports.userSignin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: 'Sign in'
    })
}

module.exports.userSignup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: 'Sign up'
    })
}


module.exports.create = async function (req, res) {
    //check password and confirm password is matching or not
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        let findUser = await User.findOne({
            email: req.body.email
        });
        if (!findUser) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        return res.redirect('back')
    }
}



module.exports.createSession = async function (req, res) {
    req.flash('success','logged in successfully')
    return res.redirect('/');
}

module.exports.update = async function (req, res) {
   
    if (req.user.id == req.params.id) {
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("******* Multer Error*********",err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();

                return res.redirect('/')
            })
        }
        catch(err)
        {

        }
    // User.findByIdAndUpdate(req.params.id,req.body).then((data)=>{
    //     console.log("update data",data)
    // });
    //        return res.redirect('/');
     }

    else{
        req.flash('error','Unauthorixed');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.destroySession = function (req, res) {
   
    req.logout(function (err) {
        if (err) {
            console.log('error in loging out')
            return next(err);
        }
    })

    req.flash('success','you have logged out!');
    return res.redirect('/');
}
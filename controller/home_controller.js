const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {
  //populate user because in schema there is user

  let data = await Post.find({})
  .sort('-createdAt')
  .populate('user')
    .populate({
      path: 'comments',
      //to show user name in comment
      populate: {
        path: 'user'
      }
    })

  let allUser = await User.find({});
  return res.render('home', {
    title: 'home',
    posts: data,
    allUser : allUser
  })

}
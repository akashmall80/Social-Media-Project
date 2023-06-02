const Post = require('../../../models/post');
const Comment = require('../../../models/comments')

module.exports.index = async function (req, res) {

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
    return res.json(200, {
        message: 'list of posts',
        posts: data
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let findPost = await Post.findById(req.params.id);
        if (findPost.user == req.user.id) {
            findPost.deleteOne();
            let deleteComment = await Comment.deleteMany({
                post: req.params.id
            });    
            return res.json(200,{
                message:"post and associated comments deleted successfullt"
            })
        } 
        else{
            return res.json(401,{
                message:'You cannot delte this post'
            })
        }
        } 
    catch (err) {
        return res.json(500,{
            message : "Internal Server Error"
        })
  }
}

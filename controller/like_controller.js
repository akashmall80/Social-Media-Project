const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.toggleLike = async function(req,res){
    try{
        //likes/toggle/?id=abcdef&type=Post
        let likeable ;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        //check if a like already exists
        let existingLike = await Like.findOne({
            likeable:req.query,
            onModel : req.query.type,
            user:req.user._id
        })
        //if a like already exist then delete it

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.deleteOne();
        }

        else{

            //else make a new like
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel : req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message:'req successful',
            data:{
                deleted:deleted
            }
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            message:'internal Server Error'
        });
    }
}

const Comment = require('../models/comments');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email');


module.exports.create = async function (req, res) {
    try {
        let findPost = await Post.findById(req.body.post);
        if (findPost) {
            let createComment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            findPost.comments.push(createComment);
            findPost.save();
            createComment = await createComment.populate('user', 'name email');
            console.log(createComment)
            // commentMailer.newComment(createComment);
            let job = queue.createJob('emails',createComment).save(function(err){
                if(err){
                    console.log('error in creating the queue');
                    return;
                }
                console.log(job.id);
                return res.redirect('/');
            })
           
        }
    } catch (err) {
        console.log('creating comment');
        return res.redirect('/');
    }
}

module.exports.destroy = async function (req, res) {
    //find the comment

    try {
        let findComment = await Comment.findById(req.params.id);

        if (findComment.user == req.user.id) {
            //save post id 
            let postId = findComment.post;
            findComment.deleteOne();
            //update the post
            Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });
            return res.redirect('back');
        }
    } catch (err) {
        console.log('finding comment');
        return res.redirect('back');
    }
}
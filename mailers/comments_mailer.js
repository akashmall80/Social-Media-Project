const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({
        comment: comment
    }, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'socialmedia@gmail.com',
        to: comment.user.email,
        subject: "New Comment Added",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    })
}
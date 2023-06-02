const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'theakash80@gmail.com',
        pass: 'fxjzoxxmbzegbcie'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailerHTML;
    ejs.renderFile(
        path.join(__dirname, '../view/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log(err, 'error in rendering template');
                return;
            }

            mailerHTML = template;
        }
    )

    return mailerHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
const development = {
    name :'development',
    asset_path : '/assets',
    session_cookie_key : 'blahsomething',
    db: 'social_dev',
    smtp :{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'theakash80@gmail.com',
            pass: 'fxjzoxxmbzegbcie'
        }
    },
   google_clientID: "675902497755-o2j5r98gk1hrvnfq3rtfnhkmtdjuphqn.apps.googleusercontent.com",
   google_clientSecret: "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",
   google_callbackURL: "http://localhost:8000/users/auth/google/callback",
   jwt_secret : 'codeial'
}

const production ={
    name : 'production'
}

module.exports = development
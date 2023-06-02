const express = require('express');
const env = require('./config/envirnoment')
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const passportJWT = require('./config/passport-jwt-stategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const sassMiddleware = require('node-sass-middleware');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path avaliable to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './view');


app.use(session({
    name: 'social_dev',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost/social_media_yt',
        autoRemove: 'disabled'
    })

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

app.use('/', require('./route/index'));

app.listen(8000, function (err) {
    if (err) {
        console.log(err, 'error in listen');
    }
    console.log('server running at port', port)
})
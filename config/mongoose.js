const mongoose = require('mongoose');
const env = require('./envirnoment');
mongoose.connect('mongodb://localhost/social_media_yt');

const db = mongoose.connection;

db.on('error',console.error.bind('eroor in connecting to database'));

db.once('open',function(){
    console.log("connected");
})

module.exports = db;
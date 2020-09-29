const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/facebookAuth',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const userSchema = mongoose.Schema({
    uid:String,
    token:String,
    name:String,
    genre:String,
    avatar:String
});

module.exports = mongoose.model('user',userSchema)
const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true,'User with this email already exists']
    },
    password : {
        type : String ,
        required : true
    },
    work : {
        type : String,
        required : true
    },
    numtask : {
        type : String,
        required : true
    }
})
//saving the schema for a collection with name User
module.exports = mongoose.model('User',UserSchema)
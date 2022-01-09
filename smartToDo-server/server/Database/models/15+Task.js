const mongoose = require('mongoose');
const {Schema} = mongoose;

const Task2Schema = new Schema({
    isPending : {
        type : Boolean,
        required : true,
        default : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    TaskName : {
        type : String,
        required : true
    },
    TaskDeadline : {
        type : String,
        required : true
    },
    Today : {
        type : Boolean,
        required : true,
        default : true,
    },
    Tomorrow : {
        type : Boolean,
        required : true,
        default : true
    },
    UserID : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    CreatedOn : {
        type : Date,
        default :  Date.now(),
        required : true
    }
})
//saving the schema for a collection with name Task1
module.exports = mongoose.model('Task3',Task2Schema)
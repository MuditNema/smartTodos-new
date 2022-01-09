const mongoose = require('mongoose'); 
const DB_name = 'SmartToDo'
const mongoURI = `mongodb+srv://smartToDo:DOTSLASH2021@cluster0.tqz7y.mongodb.net/${DB_name}?authSource=admin&replicaSet=atlas-ax51sd-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
const port = 5000;
const connectToMongo = async () =>{
    mongoose.connect(mongoURI,()=>{
        console.log(`MongoDB Started on port ${port}`);
    })
}

module.exports = connectToMongo;
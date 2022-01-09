const express =  require('express');
const app = express();
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '#DOTSLASH2021#';
app.use(express.json());
const User = require('../Database/models/User');
const fetchUser = require('../middleware/fetchUser');
router.post('/loginuser', async (req,res) => {
    let success = false;
    let authtoken = '';
    try {
        const {email,password} = req.body;

        let user = await User.findOne({email})
        // get the user from database
        if(!user){
            res.send({authtoken,'message':'No user found',success})
        }
        const PassCompare = await bcrypt.compare(password,user.password);
        if(!PassCompare){
            res.send({authtoken,'message':'Wrong Password',success})
        }
        let data = {
            user : {id:user.id}
        }
        console.log(data);
        // authtoken will have a payload as an object with user id in it which can be later extracted using a middleware to authenticate the user
        authtoken  =  jwt.sign(data,JWT_SECRET);
        success = true;
        res.send({user,authtoken,'message':'Successful Login',success});
    }
    catch (error) {
        res.send({authtoken,'message':error,success});
    }
})

router.post('/createuser',[
    body('username').isLength({min:5}),
    body('password').isStrongPassword(),
    body('email').isEmail(),
    body('work').exists(),
    body('numtask').exists()
],async (req,res) =>{
    try {
        console.log('Creating user started')
        let success = false;
        let error = validationResult(req);
        console.log(error);
        if(!error.isEmpty()){
            res.send({"message":"some error occured",success})
        }
        let user = await User.findOne({email: req.body.email});
        if(user){
            res.send({"message" : "User with this email already exists",success})
        }
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(req.body.password, salt);
        let Obj = {
            username: req.body.username,
            password : newPass,
            email : req.body.email,
            work : req.body.work,
            numtask : req.body.numtask
        }
        let result = await User(Obj);
        let RegisteredUser = await result.save();
        success = true;
        res.send({success ,  RegisteredUser , "message" : "User Registered succesfully"})        
    } catch (error) {
        res.send({"message":"THIS IS IT",success:false})
    }
})


module.exports = router;
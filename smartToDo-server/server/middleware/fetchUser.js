const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = '#DOTSLASH2021#';

const fetchUser = async (req,res,next) => {
    try {
        let token =  req.header('auth-token');
        if(!token){
            return res.send({"message":'No tokens'})
        }
        const USERDATA =  jwt.verify(token,JWT_SECRET);
        //Creating a js object in the request body with the id of user in it.
        req.UserData = await USERDATA.user;
        next();
    } catch (error) {
        res.send({message : error});
    }
}


module.exports = fetchUser;
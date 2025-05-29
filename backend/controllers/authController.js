const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (userId) => {
   return jwt.sign({id : userId}, process.env.JWT_SECRET, {
    expiresIn : '30d'
   })
}

exports.registerUser = async(req, res) => {
    const {name, email, password} = req.body;
    
    const userExists = await User.findOne({email});
    if(userExists)return res.json({message : 'user already exists'});
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
    }else{
        res.status(400).json({message : 'Invalid credentials'})
    }
}

exports.loginUser = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user)return res.status(401).json({message : 'wrong credential'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)return res.status(401).json({message : 'wrong credentials'});
    res.json({
        _id : user._id,
        name : user.name,
        email : user.email,
        isAdmin : user.isAdmin,
        token : generateToken(user._id)
    })
}
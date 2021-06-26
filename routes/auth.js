const router = require('express').Router();
const User = require('../models/User');

//Validation
const Joi = require('@hapi/joi');

const schema = Joi.object( {
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
});

router.post('/register',async(req,res)=>{
    //Validate user before making user
    const {error} = schema.validate(req.body);
    res.send(error.details[0].message);
    // const user = new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // });
    // try{
    //     const savedUser = await user.save();
    //     res.send(savedUser);
    // }catch(err){
    //     res.status(400).send(err);
    // }
});

router.post('/login',(req,res)=>{
    console.log('Login');
    res.send('Login');
});

module.exports = router;
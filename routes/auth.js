const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registrationValidation} = require('../validation');
const {loginValidation} = require('../validation');


//REGISTER
router.post('/register', async (req, res) => {

    //Validate user before making user
    const {error} = registrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user is in database
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        imageUrl:req.imageUrl
    });
    try {
        const savedUser = await user.save();
        const jwt = jwt.sign({user_id: user._id}, process.env["TOKEN_SECRET "]);
        res.header(jwt).send(jwt)
            .send({
                uid: user._id,
                name: savedUser.name,
                email: savedUser.email
            });
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //Validate the data before we login user
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email exist in database and is valid
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email does not exist');

    //Is password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
        .send({
            name:user._id,
            email:user.email,
            imageUrl:user.imageUrl
        });
});

module.exports = router;
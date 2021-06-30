const router = require('express').Router();
const verify = require('./veryfyTokens');
const User = require('../models/User');

router.get('/users/:email',verify,async (req,res) => {
    const email = req.body.email;
    const user = User.findOne({email:email});
    if(!user) return res.status(404).send('User does not exist');
     res.status(200).json(user);
});
module.exports = router;
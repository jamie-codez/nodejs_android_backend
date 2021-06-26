const router = require('express').Router();
const verify = require('./veryfyTokens');

router.get('/',verify,(req,res) =>{
    res.json({
        post:{
            title:'my first post',
            descripton:'Random data you should not access'
        }
    });
});


module.exports = router;
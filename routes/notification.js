const router = require('express').Router();
const Notification = require('../models/Notification');
const verify = require('../routes/veryfyTokens');
const {mongo} = require('mongoose');

router.get('/:uid',verify,async (req,res)=>{
    const uid = req.param.id;
    const myNotifications = await mongo.findOne({_id:uid});
    res.status(200).json(myNotifications).send(myNotifications);
});
router.post('/',verify,async (req,res)=>{
    if (req.body==null) return res.status(400).send('Request body is empty');


    const notification = new Notification({
        title:req.body.title,
        description:req.body.description,
        notify:req.body.notify,
        notificationDate:req.body.notificationDate,
        notificationTime:req.body.notificationTime
    });
    try {
        const savedNotification = await notification.save();
        res.status(200).send(`Notification saved with id ${savedNotification._id}`);
    }catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
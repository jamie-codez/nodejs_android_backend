const router = require('express').Router();
const verify = require('./veryfyTokens');
const Post = require('../models/Post')
const {mongo} = require("mongoose");

router.get('/', verify, async (req, res) => {
    const posts = await mongo.find();
    if (posts == null) return res.status(200).send('null');
    res.status(200).json(posts).send(posts);
});

router.post('/', verify, async (req, res) => {
    if (req.body == null) {
        return res.status(400).send("Request body is empty");
    }
    const post = new Post({
        from:req.body.from,
        title: req.body.title,
        description: req.body.description,
        mediaUrl: req.body.mediaUrl
    });

    try {
        const savedPost = await post.save()
        res.status(200).send(`Post saved with is ${savedPost._id}`)
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;
var express = require("express");
var router = express.Router();
require("../models/connexion");

const uid2 = require("uid2");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const { checkTweet } = require("../modules/checkTweet");

router.post("/:userToken", async (req, res) => {
    const user = await User.findOne({ token: req.params.userToken });
    if (!user) {
        res.json({ result: false, error: "User not found" });
        return;
    }
    if (checkTweet(req.body, ["tweetContent"]) === false) {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    } else {
        const date = new Date();
        const newTweet = new Tweet({
        tweetContent: req.body.tweetContent,
        date: date,
        username: user._id,
        likes: [],
        token: uid2(32),
    });
    const newDoc = await newTweet.save();
    res.json({ result: true, tweet: newDoc });
    }
});

router.put("/like/:userToken/:tweetToken", async (req, res) => {
    const user = await User.findOne({ token: req.params.userToken });
    const tweet = await Tweet.findOne({ token: req.params.tweetToken });
    if (!user || !tweet) {
        res.json({ result: false, error: "User or tweet not found" });
        return;
    }else if (tweet.likes.includes(req.params.userToken)) {
        const likedTweet = await Tweet.updateOne(
            {token: req.params.tweetToken },
            {$pull : {likes: req.params.userToken}}
        )
        res.json({ result: 'like removed', likedTweet: likedTweet})
    } 
    else {
        const likedTweet = await Tweet.updateOne(
            {token: req.params.tweetToken},
            {$push: {likes: req.params.userToken}}
        )
        res.json({ result: true, likedTweet: likedTweet});
    }
});

router.get("/", async (req, res) => {
    const allTweets = await Tweet.find().populate('username')
    res.json({result: true, allTweets: allTweets})
})

router.delete('/delete/:tweetToken', async (req, res) => {
    const tweets = await Tweet.deleteOne({token: req.params.tweetToken})
    res.json({result: true, tweets: tweets})
})

module.exports = router;

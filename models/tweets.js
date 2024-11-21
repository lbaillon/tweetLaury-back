const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    tweetContent: String,
    date: String,
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    likes: Array,
    token: String
})

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
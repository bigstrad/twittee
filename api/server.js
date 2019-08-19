const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.TWIT_TEE_API_PORT || 8001;
const tweetutil = require("./tweetutil.js");

app.get('/api/twit/:userId/:tweetId', (req, res) => {
    let userId = req.params.userId;
    let tweetId = req.params.tweetId;
    tweetutil.parseLiveTweet(userId, tweetId)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
});

app.get('/api/twit/:userId', (req, res) => {
    let userId = req.params.userId;
    tweetutil.parseLiveTweet(userId)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});


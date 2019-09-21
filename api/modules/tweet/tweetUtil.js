const Twit = require('twit')
const path = require("path");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const consumerKey = process.env.TWIT_TEE_CONSUMER_KEY;
const consumerSecret = process.env.TWIT_TEE_CONSUMER_SECRET;
const accessToken = process.env.TWIT_TEE_ACCESS_TOKEN;
const accessTokenSecret = process.env.TWIT_TEE_ACCESS_TOKEN_SECRET;

// Twitter Apps
// https://apps.twitter.com/

var T = new Twit({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token: accessToken,
    access_token_secret: accessTokenSecret
})

T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

function onAuthenticated(err, res) {
    if (err) throw err;
    console.log('Twitter authentication successful. Ready.');
}

exports.searchTweet = function (userId, tweetId) {
    let paramObject = {};
    // let fileName = '';
    if (tweetId === undefined || tweetId === null || tweetId === '' || tweetId === 'undefined') {
        // params - https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets

        // get list of tweets
        paramObject = {
            q: 'from:' + userId,
            tweet_mode: 'extended', // https://developer.twitter.com/en/docs/tweets/tweet-updates#rendering-modes
            result_type: 'popular', // mixed, recent, popular
            count: 100
        };
        // fileName = 'tweet.json'
    } else {
        // get specific tweet
        paramObject = {
            q: 'from:' + userId,
            tweet_mode: 'extended',
            max_id: tweetId,
            count: 1
        };
        // fileName = 'tweetById.json'
    }
    return new Promise((resolve, reject) => {
        T.get('search/tweets', paramObject)
            .then(function (result) {
                // saveTweet(result.data, fileName);
                resolve(parseData(result.data));
            })
            .catch(function (err) {
                reject(err);
            })
    })
}

parseData = function (data) {
    let out = [];
    // let json = JSON.parse(data);
    data.statuses.map(row => {
        let jsonParsed = {
            name: row.user.name,
            screen_name: row.user.screen_name,
            verified: row.user.verified,
            profile_img_url: row.user.profile_image_url,
            created_at: row.created_at,
            id_str: row.id_str,
            full_text: parseDataRow(row.full_text)
        };
        out.push(jsonParsed);
    });
    return out;
}

parseDataRow = function (data) {
    return data;
    let place = data.search('https://t.co/');
    if (place === -1) {
        return data;
    }
    return data.substring(0, place);
}

// function saveTweet(tweetData, fileName) {
//     fileName = path.resolve(__dirname) + '/' + fileName;
//     fs.writeFile(fileName, JSON.stringify(tweetData), (err) => {
//         if (err) throw err;
//         console.log('Tweet saved to ' + fileName);
//     });
// }

// exports.searchSavedTweet = function() {
//     return new Promise((resolve, reject) => {
//         let fileName = 'tweet.json';
//         fileName = path.resolve(__dirname) + '/' + fileName;  
//         fs.readFile(fileName, function read(err, data) {
//             if (err) reject(err);
//             let out = [];
//             let json = JSON.parse(data);
//             json.statuses.map(row => {
//                 // console.log(row.id_str);
//                 let jsonParsed = {
//                     name: row.user.name,
//                     screen_name: row.user.screen_name,
//                     verified: row.user.verified,
//                     profile_img_url: row.user.profile_image_url,
//                     created_at: row.created_at,
//                     id_str: row.id_str,
//                     full_text: row.full_text
//                 };
//                 out.push(jsonParsed);
//             });
//             // console.log(JSON.stringify(out));
//             resolve(out);
//         });
//     })
// }
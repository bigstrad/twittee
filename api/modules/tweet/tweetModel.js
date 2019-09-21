const mongoose = require('mongoose');

/**
 * Schemas
 */
const tweetAccountSchema = mongoose.Schema({
    label: {
        type: String,
        required: false
    },
    uuid: { 
        type: String
    },
    options: [{
        label: {
            type: String,
            required: false
        },
        value: {
            type: String,
            required: true
        },
        uuid: { 
            type: String
        }
    }]//,
    // updated: {
    //     type: Date,
    //     default: Date.now
    // }
});

/**
 * Models
 */
module.exports = {
    TweetAccount: mongoose.model('tweetAccount', tweetAccountSchema)
}  
const mongoose = require('mongoose');

/**
 * Schemas
 */
const teeColorSchema = mongoose.Schema({
        label: {
            type: String,
            required: false
        },
        value: {
            type: String,
            required: true
        },
        uuid: { 
            type: String,
            required: true,
            unique: true
        }
    //,
    // updated: {
    //     type: Date,
    //     default: Date.now
    // }
});

const teeSizeSchema = mongoose.Schema({
    label: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: true
    },
    uuid: { 
        type: String,
        required: true,
        unique: true
    }
//,
// updated: {
//     type: Date,
//     default: Date.now
// }
});

/**
 * Models
 */
module.exports = {
    TeeColor: mongoose.model('teeColor', teeColorSchema),
    TeeSize: mongoose.model('teeSize', teeSizeSchema)
}  
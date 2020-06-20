const mongoose = require('mongoose');

/**
 * Schemas
 */
const orderSchema = mongoose.Schema({
        orderId: { // using simpler id - better for customers than uuid
            type: String,
            required: true,
            unique: true
        },
        status: { 
            type: String,
            required: true
        },
        charge: { 
            type: Object,
            required: true
        },
        order: { 
            type: Object,
            required: true
        },
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
    Order: mongoose.model('order', orderSchema)
}  
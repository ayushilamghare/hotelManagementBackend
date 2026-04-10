const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    method: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'cash'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'inr',
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending',
    },
    roomName: String,
    guestName: String,
    guestEmail: String,
    
    // Method-specific fields
    upiId: String,
    bankCode: String,
    cardLast4: String,
    stripePaymentIntentId: String,
    
    // Metadata
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', paymentSchema);

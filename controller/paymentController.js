const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');

// Generate transaction ID
const generateTransactionId = () => {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// CARD/STRIPE PAYMENT
const createPaymentIntent = async (req, res) => {
    try {
        const { amount, roomName, guestName, guestEmail } = req.body;

        if (!amount || !roomName || !guestName || !guestEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: 'inr',
            metadata: {
                roomName,
                guestName,
                guestEmail,
            },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrievePaymentIntent = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        res.status(200).json({
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            metadata: paymentIntent.metadata,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPI PAYMENT
const createUPIPayment = async (req, res) => {
    try {
        const { amount, roomName, guestName, guestEmail, upiId } = req.body;

        if (!amount || !roomName || !guestName || !guestEmail || !upiId) {
            return res.status(400).json({ error: 'Missing required fields', success: false });
        }

        const transactionId = generateTransactionId();

        // In a real scenario, you would integrate with a UPI payment gateway
        // For now, we'll create a mock payment record
        const payment = new Payment({
            transactionId,
            method: 'upi',
            amount,
            currency: 'inr',
            roomName,
            guestName,
            guestEmail,
            upiId,
            status: 'completed',
            createdAt: new Date(),
        });

        await payment.save();

        res.status(200).json({
            success: true,
            transactionId,
            message: 'UPI payment initiated successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// NET BANKING PAYMENT
const createNetBankingPayment = async (req, res) => {
    try {
        const { amount, roomName, guestName, guestEmail, bankCode } = req.body;

        if (!amount || !roomName || !guestName || !guestEmail || !bankCode) {
            return res.status(400).json({ error: 'Missing required fields', success: false });
        }

        const transactionId = generateTransactionId();

        const payment = new Payment({
            transactionId,
            method: 'netbanking',
            amount,
            currency: 'inr',
            roomName,
            guestName,
            guestEmail,
            bankCode,
            status: 'completed',
            createdAt: new Date(),
        });

        await payment.save();

        res.status(200).json({
            success: true,
            transactionId,
            message: 'Net Banking payment initiated successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// CASH PAYMENT
const createCashPayment = async (req, res) => {
    try {
        const { amount, roomName, guestName, guestEmail } = req.body;

        if (!amount || !roomName || !guestName || !guestEmail) {
            return res.status(400).json({ error: 'Missing required fields', success: false });
        }

        const transactionId = generateTransactionId();

        const payment = new Payment({
            transactionId,
            method: 'cash',
            amount,
            currency: 'inr',
            roomName,
            guestName,
            guestEmail,
            status: 'pending', // Cash payment is pending until received
            createdAt: new Date(),
        });

        await payment.save();

        res.status(200).json({
            success: true,
            transactionId,
            message: 'Cash payment booking created. Please pay at the hotel.',
            paymentDue: 'on-arrival',
        });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// GET PAYMENT DETAILS
const getPaymentDetails = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPaymentIntent,
    retrievePaymentIntent,
    createUPIPayment,
    createNetBankingPayment,
    createCashPayment,
    getPaymentDetails,
};

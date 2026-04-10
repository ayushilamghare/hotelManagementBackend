const express = require('express');
const router = express.Router();
const { 
    createPaymentIntent, 
    retrievePaymentIntent,
    createUPIPayment,
    createNetBankingPayment,
    createCashPayment,
    getPaymentDetails
} = require('../controller/paymentController');

// Card/Stripe Payment
router.post('/create-payment-intent', createPaymentIntent);
router.get('/payment-intent/:paymentIntentId', retrievePaymentIntent);

// UPI Payment
router.post('/create-upi-payment', createUPIPayment);

// Net Banking Payment
router.post('/create-netbanking-payment', createNetBankingPayment);

// Cash Payment
router.post('/create-cash-payment', createCashPayment);

// Get Payment Details
router.get('/payment/:transactionId', getPaymentDetails);

module.exports = router;

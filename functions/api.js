// Load environment variables
require('dotenv').config();
const express = require("express");
const ServerlessHttp = require("serverless-http");
const { getTransactionInfo } = require('transaction-sms-parser');
const { extractBankName } = require('./bankKeywords');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to parse transaction information from a list of SMS messages
app.post('/.netlify/functions/api/parse-transactions', (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'An array of messages is required' });
    }

    try {
        const transactions = messages.map(message => {
            const transactionInfo = getTransactionInfo(message);
            const bankName = extractBankName(message);

            return {
                ...transactionInfo,
                account: {
                    ...transactionInfo.account,
                    name: bankName // Add bank name to the account information
                }
            };
        });

        res.json(transactions);
    } catch (error) {
        console.error('Error parsing transactions:', error);
        res.status(500).json({ error: 'Error parsing transactions' });
    }
});

// Create a serverless handler
const handler = ServerlessHttp(app);

// Export the handler for serverless deployment
module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
};
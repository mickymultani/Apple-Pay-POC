import React, { useState } from 'react';
import axios from 'axios';
// Consider importing any icons or styles you plan to use

const PaymentForm = () => {
  const [pan, setPan] = useState('');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [tokenDetails, setTokenDetails] = useState(null);
  const [transactionResult, setTransactionResult] = useState(null);

  const handleTokenize = async (event) => {
    event.preventDefault();
    setTransactionResult(null); // Reset transaction result on new tokenization
    try {
      const response = await axios.post('http://localhost:5000/tokenize', { pan });
      setTokenDetails(response.data); // Set the whole token details object
    } catch (error) {
      console.error('Error during tokenization:', error);
      setTokenDetails(null); // Reset token details if there's an error
    }
  };

  const handleAuthorize = async () => {
    if (!tokenDetails) {
      console.error('No tokenized details available for authorization.');
      return;
    }

    const { dan, expiry, cvv } = tokenDetails;
    try {
      const response = await axios.post('http://localhost:5000/authorize', {
        encryptedDan: `encrypted_${dan}`, // Simulate encryption
        expiry,
        cvv,
        amount,
        merchantId: merchant // Assuming merchantId is the same as merchant for simplicity
      });
      setTransactionResult(response.data); // Set the transaction result
    } catch (error) {
      console.error('Error during authorization:', error);
      setTransactionResult(null); // Reset transaction result if there's an error
    }
  };

  return (
    <div className="payment-form">
      <h2>Simulate Apple Pay Transaction</h2>
      
      <form onSubmit={handleTokenize} className="tokenize-form">
        <div className="input-group">
          <label htmlFor="pan">Mock PAN:</label>
          <input type="text" id="pan" value={pan} onChange={(e) => setPan(e.target.value)} />
          <small>Enter your card number to be tokenized into DAN.</small>
        </div>
        <button type="submit">Tokenize</button>
      </form>

      {tokenDetails && (
        <div className="token-details">
          <p><strong>Tokenized Details (DAN):</strong> {tokenDetails.dan}</p>
          <p>Expiry: {tokenDetails.expiry}</p>
          <p>CVV: {tokenDetails.cvv}</p>
          <div className="transaction-details">
            <div className="input-group">
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="merchant">Merchant:</label>
              <input type="text" id="merchant" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
            </div>
            <button onClick={handleAuthorize}>Tap to Pay</button>
          </div>
        </div>
      )}

      {transactionResult && (
        <div className="transaction-result">
          <p>Transaction Status: {transactionResult.message}</p>
          <p>Transaction ID: {transactionResult.transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;

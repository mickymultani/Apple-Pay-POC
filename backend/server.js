const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock Endpoint for Tokenization (PAN to DAN)
app.post('/tokenize', (req, res) => {
  const { pan } = req.body;

  if (!pan) {
    return res.status(400).json({ message: "PAN is required for tokenization" });
  }

  // Simulate a more complex and unique DAN
  const dan = "DAN" + Math.random().toString(36).substr(2, 10) + pan.substring(pan.length - 4);

  // Mock expiry date and security code
  const expiry = "12/25"; // MM/YY format
  const cvv = Math.floor(100 + Math.random() * 900); // 3-digit number

  // Simulating encryption of the DAN for transmission
  const encryptedDan = `encrypted_${dan}`;

  // Sending back generated DAN, expiry, and cvv
  res.json({ dan: encryptedDan, expiry, cvv });
});

// Mock Endpoint for Transaction Authorization
app.post('/authorize', (req, res) => {
  const { encryptedDan, expiry, cvv, amount, merchantId } = req.body;

  // Basic validation to ensure all required fields are present
  if (!encryptedDan || !expiry || !cvv || !amount || !merchantId) {
    return res.status(400).json({ message: "Missing required transaction details" });
  }

  // Simulate decryption of DAN (for educational purposes in PoC)
  try {
    const decryptedDan = encryptedDan.replace('encrypted_', '');

    // Simulate checking details and authorizing transaction
    // In a real scenario, this would involve more complex logic and security checks
    const isTransactionApproved = true;

    // Generate a mock response
    const response = {
      success: isTransactionApproved,
      message: isTransactionApproved ? "Transaction Approved" : "Transaction Denied",
      transactionId: isTransactionApproved ? "Tx" + Math.random().toString(36).substr(2, 9) : null,
      // For educational purposes, showing the used DAN
      dan: decryptedDan
    };

    res.json(response);
  } catch (error) {
    console.error('Error during decryption or authorization:', error);
    res.status(500).json({ message: "Error processing transaction" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

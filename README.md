# Apple Pay Transaction Simulation PoC

## Overview

This Proof of Concept (PoC) is designed to simulate and explain the Apple Pay transaction process. Apple Pay is a contactless payment technology that allows users to make payments using their Apple devices. This PoC aims to demystify the technology behind Apple Pay by simulating the tokenization of the Primary Account Number (PAN) into a Device Account Number (DAN), preparing transaction details, and finally, simulating the authorization process of a transaction.

## Key Features

- **Tokenization**: Converts a mock PAN into a DAN, simulating the security measure that Apple Pay uses to protect card numbers.
- **Transaction Simulation**: Prepares and authorizes a transaction using the simulated DAN and other transaction details.

## Understanding the Apple Pay Process (Very High Level)

Apple Pay simplifies transactions while enhancing security and privacy. Here's a breakdown of the process simulated in this PoC:

### 1. Adding a Card to Wallet (Tokenization)

When a user adds a credit or debit card to Apple Pay, the real card number is not stored on the device or on Apple servers. Instead, a unique Device Account Number is assigned, encrypted, and securely stored in the Secure Element on the user's device. This number is used in place of the user's actual credit card number.

In ourthis simulation:
- Users input a mock PAN.
- The system then "tokenizes" this number, producing a simulated DAN.

### 2. Preparing for a Transaction

When making a payment, the user selects their card and authenticates using Face ID, Touch ID, or passcode. Apple Pay then uses the DAN along with a transaction-specific dynamic security code to process the payment. This ensures that the actual card numbers are not shared with merchants or transmitted with payment.

In our simulation:
- Users can enter transaction details such as amount and merchant.
- The system combines these with the tokenized card details to prepare for authorization.

### 3. NFC Communication and Authorization

At the point of sale, the user holds their device near the contactless reader. The Secure Element passes the encrypted payment information to the reader via Near Field Communication (NFC). The payment is then processed through the card network as any other payment would be.

In our simulation:
- Users simulate the "tap" of NFC communication by clicking the "Tap to Pay" button.
- Our system simulates the authorization response from the bank or payment processor.

### 4. Transaction Completion

Once the payment is complete, Apple Pay displays a subtle vibration and beep, along with a checkmark on the screen, indicating a successful transaction.

In our simulation:
- Upon successful "authorization," users see a transaction success message, mimicking the Apple Pay confirmation.

## Setup and Installation

Ensure you have Node.js installed and follow the setup instructions for both the backend and frontend components detailed in the respective directories.

## How to Use

Follow the step-by-step guide within the application to simulate adding a card, preparing a transaction, and completing a payment.

## Contributing

Contributions are welcome to enhance the simulation, improve educational content, or refine the user experience. Please follow the standard procedures for contributing to a project.

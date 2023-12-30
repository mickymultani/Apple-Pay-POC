import React from 'react';
import PaymentForm from './components/PaymentForm';
import './App.css'; // assuming you have global styles defined here

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Apple Pay PoC</h1>
      </header>
      <main>
        <PaymentForm />
      </main>
    </div>
  );
}

export default App;

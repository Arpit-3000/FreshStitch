import React, { useEffect, useState } from "react";
import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl } from "@solana/web3.js";

const SolanaPaymentModal = ({ isOpen, onClose, amountSOL, receiverWallet }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");  // Sender's address

  const network = clusterApiUrl("devnet");
  const connection = new Connection(network);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
        setWalletConnected(true);
      }
    } catch (err) {
      console.log("Auto-connect skipped or rejected by user.");
    }
  };

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        setWalletConnected(true);
      } else {
        alert("Phantom wallet not found! Install it from https://phantom.app/");
      }
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!receiverWallet || receiverWallet.length < 32) {
        alert("Invalid receiver wallet address!");
        return;
      }
  
      const fromPubkey = new PublicKey(walletAddress);
      const toPubkey = new PublicKey(receiverWallet.trim()); // remove stray spaces
  
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: amountSOL * 1e9,
        })
      );
  
      transaction.feePayer = fromPubkey;
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
  
      const signed = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);

      onClose();
      alert(`Transaction successful! Signature:\n${signature}`);
      
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction failed! Check console for details.");
      
    }
  };

  useEffect(() => {
    if (isOpen && !walletConnected) {
      checkIfWalletIsConnected();
    }
  }, [isOpen, walletConnected]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 animate-fade-in">
        <div className="bg-gradient-to-r from-cadetblue to-cadetdark text-white rounded-xl p-4 mb-4 shadow-md font-serif">
          <h2 className="text-2xl font-semibold text-center">Solana Payment</h2>
        </div>

        {walletConnected ? (
          <>
            <div className="mb-4 space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Sender's Wallet Address:</strong>
                <br />
                <span className="text-xs break-all text-gray-500">{walletAddress}</span>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Receiver's Wallet Address:</strong>
                <br />
                <span className="text-xs break-all text-gray-500">{receiverWallet}</span>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Amount to Pay:</strong> {amountSOL} SOL
              </p>
            </div>
            <button
              onClick={sendTransaction}
              className="w-full bg-gradient-to-r from-cream to-creamDark font-serif text-black font-semibold py-2 rounded-lg transition duration-200 mb-2"
            >
              Pay Now
            </button>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-cream to-creamDark font-serif text-black font-semibold py-2 rounded-lg transition duration-200"
          >
            Connect Phantom Wallet
          </button>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded-lg transition duration-200 font-serif"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SolanaPaymentModal;

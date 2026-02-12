
import { useEffect, useState } from "react";
import { sha256 } from "../utils/hash";

type TransactionType = {
  sender: string;
  receiver: string;
  amount: number;
  gas: number;
  timestamp: Date;
  signature: string;
  txId: string;
};

export const Transaction = () => {
  const [tx, setTx] = useState<TransactionType>({
    sender: "0xSenderAddress",
    receiver: "0xReceiverAddress",
    amount: 1,
    gas: 0.01,
    timestamp: new Date(),
    signature: "",
    txId: "",
  });

  // Generate txId whenever core transaction data changes
  useEffect(() => {
    const generateHash = async () => {
      const input = `${tx.sender}${tx.receiver}${tx.amount}${tx.gas}${tx.timestamp.toISOString()}`;
      const hash = await sha256(input);

      setTx(prev => ({
        ...prev,
        txId: hash,
      }));
    };

    generateHash();
  }, [tx.sender, tx.receiver, tx.amount, tx.gas, tx.timestamp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setTx(prev => ({
      ...prev,
      [id]:
        id === "amount" || id === "gas"
          ? Number(value)
          : value,
      timestamp: new Date(), // simulate new tx when edited
    }));
  };

  const simulateSignature = async () => {
    // Just simulate: signature = hash(sender + txId)
    const input = `${tx.sender}${tx.txId}`;
    const signature = await sha256(input);

    setTx(prev => ({
      ...prev,
      signature,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-5">

      <h2 className="text-xl font-bold text-center">
        Transaction Simulator
      </h2>

      <div className="flex flex-col gap-4 text-sm">

        <label>
          Sender:
          <input
            id="sender"
            value={tx.sender}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-amber-50"
          />
        </label>

        <label>
          Receiver:
          <input
            id="receiver"
            value={tx.receiver}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-amber-50"
          />
        </label>

        <label>
          Amount:
          <input
            id="amount"
            type="number"
            value={tx.amount}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-amber-50"
          />
        </label>

        <label>
          Gas Fee:
          <input
            id="gas"
            type="number"
            value={tx.gas}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-amber-50"
          />
        </label>

        <div className="text-xs text-gray-600 break-all">
          <strong>Timestamp:</strong> {tx.timestamp.toISOString()}
        </div>

        <div className="text-xs break-all bg-gray-100 p-2 rounded">
          <strong>Transaction ID (Hash):</strong>
          <div>{tx.txId}</div>
        </div>

        <label>
          Signature:
          <input
            id="signature"
            value={tx.signature}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-gray-100 text-xs"
          />
        </label>

        <button
          onClick={simulateSignature}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Simulate Signature
        </button>

      </div>
    </div>
  );
};


import { useEffect, useState } from "react";
import { sha256 } from "../utils/hash";
import { generateAddress } from "../utils/address";

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
    sender: generateAddress(),
    receiver: generateAddress(),
    amount: 1,
    gas: 0.01,
    timestamp: new Date(),
    signature: "",
    txId: "",
  });
  const [isSigned, setIsSigned] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Generate txId whenever core transaction data changes
  useEffect(() => {
    const generateHash = async () => {
      const input = `${tx.sender}${tx.receiver}${tx.amount}${tx.gas}${tx.timestamp.toISOString()}`;
      const hash = await sha256(input);

      setTx((prev) => ({
        ...prev,
        txId: hash,
      }));
      setIsSigned(false);
      setIsValid(null);
    };

    generateHash();
  }, [tx.sender, tx.receiver, tx.amount, tx.gas, tx.timestamp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setTx((prev) => ({
      ...prev,
      [id]: id === "amount" || id === "gas" ? Number(value) : value,
      timestamp: new Date(), // simulate new tx when edited
    }));
  };

  const signTransaction = async () => {
    const input = `${tx.sender}${tx.txId}`;
    const signature = await sha256(input);

    setTx((prev) => ({
      ...prev,
      signature,
    }));

    setIsSigned(true);
    setIsValid(null); // reset validation
  };
const verifySignature = async () => {
  if (!tx.signature) {
    setIsValid(false);
    return;
  }

  const expected = await sha256(`${tx.sender}${tx.txId}`);
  setIsValid(tx.signature === expected);
};
  // for random address generation
  const generateSender = () => {
    setTx((prev) => ({
      ...prev,
      sender: generateAddress(),
      timestamp: new Date(),
    }));
  };

  const generateReceiver = () => {
    setTx((prev) => ({
      ...prev,
      receiver: generateAddress(),
      timestamp: new Date(),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-5">
      <h2 className="text-xl font-bold text-center">Transaction Simulator</h2>

      <div className="flex flex-col gap-4 text-sm">
        <label>
          Sender:
          <div className="flex gap-2">
            <input
              id="sender"
              value={tx.sender}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded bg-amber-50"
            />
            <button
              onClick={generateSender}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-xs"
            >
              Random
            </button>
          </div>
        </label>

        <label>
          Receiver:
          <div className="flex gap-2">
            <input
              id="receiver"
              value={tx.receiver}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded bg-amber-50"
            />
            <button
              onClick={generateReceiver}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-xs"
            >
              Random
            </button>
          </div>
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
            readOnly
            value={tx.signature}
            className="w-full p-2 mt-1 border rounded bg-gray-100 text-xs"
          />
        </label>

        <div className="flex gap-2">
          <button
            onClick={signTransaction}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Sign Transaction
          </button>

          <button
            onClick={verifySignature}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
            disabled={!isSigned}
          >
            Verify Signature
          </button>
        </div>
        <div className="text-sm mt-2">
          <p>
            Status:{" "}
            {isSigned ? (
              <span className="text-blue-600 font-medium">Signed</span>
            ) : (
              <span className="text-gray-500">Not Signed</span>
            )}
          </p>

          {isValid !== null && (
            <p>
              Verification:{" "}
              {isValid ? (
                <span className="text-green-600 font-medium">Valid ✔️</span>
              ) : (
                <span className="text-red-600 font-medium">Invalid ❌</span>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
        <p>
          <strong>Transaction:</strong> Represents a transfer of value between
          two addresses.
        </p>
        <p>
          <strong>Transaction ID:</strong> A hash of transaction data ensuring
          uniqueness.
        </p>
        <p>
          <strong>Signature:</strong> Simulates proof that the sender authorized
          this transaction.
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          Note: Signature here is simulated for demonstration purposes.
        </p>
      </div>
    </div>
  );
};

import { useState } from "react";

type Transaction = {
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: Date;
}
export const Transaction = ({ from, to, amount, fee, timestamp }: Transaction) => {
  const [tx] = useState<Transaction>({ from, to, amount, fee, timestamp })
  return (
    <div className="flex flex-col px-4 py-2">
      <span className="flex justify-between">
        <span>from:</span>
        <span>{tx.from}</span >
      </span>
      <span className="flex justify-between">
        <span>to:</span>
        <span>{tx.to}</span >
      </span>

      <span className="flex justify-between">
        <span>amount:</span>
        <span>{tx.amount}</span >
      </span>

      <span className="flex justify-between">
        <span>fee:</span>
        <span>{tx.fee}</span >
      </span>

      <span className="flex justify-between">
        <span>timestamp:</span>
        <span>{tx.timestamp.toISOString()}</span >
      </span>
    </div>
  )
}

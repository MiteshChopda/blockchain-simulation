export interface Transaction {
  id: string
  from: Address
  to: Address
  amount: number
  timestamp: Timestamp
}

export type Block = {
  id: string;
  transactions: Transaction[];
  nonce: number;
  hash: string;
  prevHash: string;
  timestamp: Date;
}

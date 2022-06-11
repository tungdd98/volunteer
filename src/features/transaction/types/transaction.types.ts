export interface TransactionDef {
  id: string;
  uid: string;
  toAddress: string;
  orai: string;
  createdAt: string;
}

export type TransactionRequest = Omit<TransactionDef, "id">;

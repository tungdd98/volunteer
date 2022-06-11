import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "app/firebase";

import { TransactionDef, TransactionRequest } from "../transaction";

const collectionName = "transactions";

const getTransactionListByUidApi = async (
  uid: string
): Promise<TransactionDef[]> => {
  const q = query(collection(db, collectionName), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);
  const data: TransactionDef[] = [];

  querySnapshot.forEach(snap => {
    const item = snap.data();
    data.push({
      ...item,
      id: snap.id,
    } as TransactionDef);
  });

  return data;
};

const createTransactionApi = async (
  data: TransactionRequest
): Promise<null> => {
  await addDoc(collection(db, collectionName), data);

  return null;
};

export const transactionApi = {
  getTransactionListByUidApi,
  createTransactionApi,
};

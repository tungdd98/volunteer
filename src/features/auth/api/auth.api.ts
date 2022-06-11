import { AxiosResponse } from "axios";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { api } from "app/axios";
import { db } from "app/firebase";

import { Account, AuthEndpointsEnum } from "../auth";

const collectionName = "accounts";

const uploadPersonalCodeApi = (file: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(AuthEndpointsEnum.IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const createAccountApi = async (data: Account): Promise<null> => {
  await addDoc(collection(db, collectionName), data);

  return null;
};

const getAccountDetailApi = async (uid: string): Promise<Account | null> => {
  const q = query(collection(db, collectionName), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const data: Account[] = [];

  querySnapshot.forEach(docS => {
    data.push(docS.data() as Account);
  });

  return data[0];
};

export const authApi = {
  uploadPersonalCodeApi,
  createAccountApi,
  getAccountDetailApi,
};

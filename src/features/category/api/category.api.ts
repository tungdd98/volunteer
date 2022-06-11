import { collection, getDocs } from "firebase/firestore";

import { db } from "app/firebase";

import { CategoryDef } from "../category";

const collectionName = "categories";

const getCategoryListApi = async (): Promise<CategoryDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: CategoryDef[] = [];

  querySnapshot.forEach(snap => {
    const item = snap.data();
    data.push({
      ...item,
      id: snap.id,
    } as CategoryDef);
  });

  return data;
};

export const categoryApi = {
  getCategoryListApi,
};

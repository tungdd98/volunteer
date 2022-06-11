import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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

const getCategoryDetailApi = async (
  categoryId: string
): Promise<CategoryDef | null> => {
  const docRef = doc(db, collectionName, categoryId);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data() as CategoryDef;

  return {
    ...data,
    id: categoryId,
  };
};

export const categoryApi = {
  getCategoryListApi,
  getCategoryDetailApi,
};

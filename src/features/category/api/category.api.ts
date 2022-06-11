import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

import { db } from "app/firebase";

import { CategoryDef, CategoryRequest } from "../category";

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

const createCategoryApi = async (data: CategoryRequest): Promise<null> => {
  await addDoc(collection(db, collectionName), data);

  return null;
};

const updateCategoryApi = async (
  articleId: string,
  data: CategoryRequest
): Promise<null> => {
  const sfDocRef = doc(db, collectionName, articleId);

  await runTransaction(db, async transaction => {
    const sfDoc = await transaction.get(sfDocRef);
    if (sfDoc.exists()) {
      transaction.update(sfDocRef, data);
    }
  });

  return null;
};

export const categoryApi = {
  getCategoryListApi,
  getCategoryDetailApi,
  createCategoryApi,
  updateCategoryApi,
};

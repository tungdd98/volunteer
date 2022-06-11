import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  runTransaction,
  query,
  where,
} from "firebase/firestore";

import { db } from "app/firebase";

import { ArticleDef, ArticleForm } from "../article";

const collectionName = "articles";

const getArticleListApi = async (): Promise<ArticleDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: ArticleDef[] = [];

  querySnapshot.forEach(snap => {
    const item = snap.data();
    data.push({
      ...item,
      id: snap.id,
    } as ArticleDef);
  });

  return data;
};

const getArticleDetailApi = async (
  articleId: string
): Promise<ArticleDef | null> => {
  const docRef = doc(db, collectionName, articleId);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data() as ArticleDef;

  return {
    ...data,
    id: articleId,
  };
};

const createArticleApi = async (data: ArticleForm): Promise<null> => {
  await addDoc(collection(db, collectionName), {
    ...data,
    currentDonate: 0,
  });

  return null;
};

const updateArticleApi = async (
  articleId: string,
  data: ArticleForm
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

const updateCurrentDonateArticleApi = async (
  articleId: string,
  currentDonateOld: number
): Promise<null> => {
  const sfDocRef = doc(db, collectionName, articleId);

  await runTransaction(db, async transaction => {
    const sfDoc = await transaction.get(sfDocRef);
    if (sfDoc.exists()) {
      transaction.update(sfDocRef, {
        currentDonate: currentDonateOld + 1,
      });
    }
  });

  return null;
};

const getArticleListByCategoryIdApi = async (
  categoryId: string
): Promise<ArticleDef[]> => {
  const q = query(
    collection(db, collectionName),
    where("categoryId", "==", categoryId)
  );
  const querySnapshot = await getDocs(q);
  const data: ArticleDef[] = [];

  querySnapshot.forEach(snap => {
    const item = snap.data();
    data.push({
      ...item,
      id: snap.id,
    } as ArticleDef);
  });

  return data;
};

export const articleApi = {
  getArticleListApi,
  getArticleDetailApi,
  createArticleApi,
  updateArticleApi,
  updateCurrentDonateArticleApi,
  getArticleListByCategoryIdApi,
};

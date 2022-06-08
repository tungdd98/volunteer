import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { omit } from "lodash";

import { db } from "app/firebase";

import { ArticleDef, ArticleForm } from "../article";

const collectionName = "articles";

const getArticleListApi = async (): Promise<ArticleDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: ArticleDef[] = [];

  querySnapshot.forEach(snap => {
    const item = omit(snap.data(), "createdAt");
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

  const data = omit(docSnap.data(), "createdAt") as ArticleDef;

  return {
    ...data,
    id: articleId,
  };
};

const postArticleApi = async (data: ArticleForm): Promise<null> => {
  await addDoc(collection(db, collectionName), {
    ...data,
    currentDonate: 0,
  });

  return null;
};

export const articleApi = {
  getArticleListApi,
  getArticleDetailApi,
  postArticleApi,
};

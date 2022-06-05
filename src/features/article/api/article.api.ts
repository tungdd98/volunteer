import { collection, getDocs } from "firebase/firestore";
import { pick } from "lodash";

import { db } from "app/firebase";

import { ArticleDef } from "../article";

const collectionName = "articles";

const getArticleListApi = async (): Promise<ArticleDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: ArticleDef[] = [];

  querySnapshot.forEach(doc => {
    const item = pick(doc.data(), [
      "title",
      "thumbnail",
      "content",
      "maxDonate",
      "currentDonate",
      "status",
    ]);
    data.push({
      id: doc.id,
      ...item,
    });
  });

  return data;
};

export const articleApi = {
  getArticleListApi,
};

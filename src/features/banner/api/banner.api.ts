import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "app/firebase";

import { BannerDef } from "../banner";

const collectionName = "banners";

const getBannerListApi = async (): Promise<BannerDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: BannerDef[] = [];

  querySnapshot.forEach(snap => {
    const item = snap.data();
    data.push({
      ...item,
      id: snap.id,
    } as BannerDef);
  });

  return data;
};

const createBannerApi = async (thumbnail: string): Promise<null> => {
  await addDoc(collection(db, collectionName), { thumbnail });

  return null;
};

export const bannerApi = {
  getBannerListApi,
  createBannerApi,
};

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

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

const getBannerDetailApi = async (
  bannerId: string
): Promise<BannerDef | null> => {
  const docRef = doc(db, collectionName, bannerId);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data() as BannerDef;

  return {
    ...data,
    id: bannerId,
  };
};

const createBannerApi = async (thumbnail: string): Promise<null> => {
  await addDoc(collection(db, collectionName), { thumbnail });

  return null;
};

const updateBannerApi = async (
  bannerId: string,
  thumbnail: string
): Promise<null> => {
  const sfDocRef = doc(db, collectionName, bannerId);

  await runTransaction(db, async transaction => {
    const sfDoc = await transaction.get(sfDocRef);
    if (sfDoc.exists()) {
      transaction.update(sfDocRef, { thumbnail });
    }
  });

  return null;
};

export const bannerApi = {
  getBannerListApi,
  createBannerApi,
  getBannerDetailApi,
  updateBannerApi,
};

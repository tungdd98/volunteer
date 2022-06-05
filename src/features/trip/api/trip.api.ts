import { collection, getDocs } from "firebase/firestore";
import { omit } from "lodash";

import { db } from "app/firebase";

import { TripDef } from "../trip";

const collectionName = "trips";

const getTripListApi = async (): Promise<TripDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: TripDef[] = [];

  querySnapshot.forEach(doc => {
    const item = omit(doc.data(), "createdAt");
    data.push({
      ...item,
      id: doc.id,
    } as TripDef);
  });

  return data;
};

export const tripApi = {
  getTripListApi,
};

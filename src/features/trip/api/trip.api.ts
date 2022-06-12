import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { omit } from "lodash";

import { db } from "app/firebase";

import { TripDef } from "../trip";

const collectionName = "trips";

const getTripListApi = async (): Promise<TripDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: TripDef[] = [];

  querySnapshot.forEach(snap => {
    const item = omit(snap.data(), "createdAt");
    data.push({
      ...item,
      id: snap.id,
    } as TripDef);
  });

  return data;
};

const getTripDetailApi = async (tripId: string): Promise<TripDef | null> => {
  const docRef = doc(db, collectionName, tripId);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data() as TripDef;

  return {
    ...data,
    id: tripId,
  };
};

export const tripApi = {
  getTripListApi,
  getTripDetailApi,
};

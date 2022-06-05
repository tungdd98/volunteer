import { collection, getDocs } from "firebase/firestore";
import { pick } from "lodash";

import { db } from "app/firebase";

import { TripDef } from "../trip";

const collectionName = "trips";

const getTripListApi = async (): Promise<TripDef[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: TripDef[] = [];

  querySnapshot.forEach(doc => {
    const item = pick(doc.data(), [
      "title",
      "thumbnail",
      "content",
      "description",
      "startDate",
      "endDate",
    ]);
    data.push({
      id: doc.id,
      ...item,
    });
  });

  return data;
};

export const tripApi = {
  getTripListApi,
};

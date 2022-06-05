import React, { FC, useEffect, useState } from "react";

import { useAppDispatch } from "app/hooks";
import Loader from "components/Loader/Loader";
import { getArticleList } from "features/article/article";
import { getTripList } from "features/trip/trip";

import BannerSection from "./BannerSection/BannerSection";
import InviteSection from "./InviteSection/InviteSection";
import TripSection from "./TripSection/TripSection";

const HomeScreen: FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([dispatch(getArticleList()), dispatch(getTripList())]).finally(
      () => setIsLoading(false)
    );
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BannerSection />
      <TripSection />
      <InviteSection />
    </>
  );
};

export default HomeScreen;

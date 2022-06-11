import React, { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import { getArticleListByCategoryId } from "features/article/article";
import { getBannerList } from "features/banner/banner";
import { getCategoryList } from "features/category/category";
import { getTripList } from "features/trip/trip";

import BannerSection from "./BannerSection/BannerSection";
import InviteSection from "./InviteSection/InviteSection";
import TripSection from "./TripSection/TripSection";
import VolunteerSection from "./VolunteerSection/VolunteerSection";

const HomeScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dispatch(getTripList()),
      dispatch(getBannerList()),
      dispatch(getCategoryList()),
    ]).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      categories.forEach(category => {
        dispatch(
          getArticleListByCategoryId({
            category,
          })
        );
      });
    }
  }, [categories, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BannerSection />
      <VolunteerSection />
      <TripSection />
      <InviteSection />
    </>
  );
};

export default HomeScreen;

import React, { FC, useEffect, useState } from "react";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  BannerPathsEnum,
  getBannerDetail,
  updateBanner,
} from "features/banner/banner";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import FormEdit from "../../components/FormEdit/FormEdit";

const EditScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { bannerDetail } = useAppSelector(state => state.banner);

  const { bannerId } = useParams<{
    bannerId: string;
  }>();

  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateBanner = async (
    thumbnail: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    return dispatch(
      updateBanner({
        bannerId,
        thumbnail,
      })
    )
      .catch(error => handleShowSnackbar({ error, dispatch }))
      .then(() => {
        history.push(BannerPathsEnum.ADMIN_LIST);
      })
      .finally(() => setSubmitting(false));
  };

  const handleSubmit = (
    values: { thumbnail: string | File },
    { setSubmitting }: FormikHelpers<{ thumbnail: string | File }>
  ) => {
    const file = values.thumbnail;

    if (file instanceof File) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `/files/${file.name}-${new Date().getTime()}`
      );
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(url => {
          handleUpdateBanner(url, setSubmitting);
        });
      });
    } else {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (bannerId) {
      dispatch(getBannerDetail(bannerId)).finally(() => setIsLoading(false));
    }
  }, [bannerId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!bannerDetail) {
    return <div>Error...</div>;
  }

  const initialValues = {
    thumbnail: bannerDetail.thumbnail,
  };

  return <FormEdit initialValues={initialValues} handleSubmit={handleSubmit} />;
};

export default EditScreen;

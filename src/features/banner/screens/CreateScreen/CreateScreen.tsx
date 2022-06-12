import React, { FC } from "react";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { useAppDispatch } from "app/hooks";
import { BannerPathsEnum, createBanner } from "features/banner/banner";
import { handleShowSnackbar } from "helpers/form/display-snackbar";

import FormEdit from "../../components/FormEdit/FormEdit";

const CreateScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleCreateBanner = async (
    thumbnail: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    return dispatch(createBanner(thumbnail))
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
          handleCreateBanner(url, setSubmitting);
        });
      });
    } else {
      setSubmitting(false);
    }
  };

  return (
    <FormEdit initialValues={{ thumbnail: "" }} handleSubmit={handleSubmit} />
  );
};

export default CreateScreen;

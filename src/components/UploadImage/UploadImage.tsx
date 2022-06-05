/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, memo, useState, useCallback, useRef } from "react";

import { FileUploadRounded } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Slider,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { getOrientation } from "get-orientation/browser";
import { get } from "lodash";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";

import {
  ORIENTATION_TO_ANGLE,
  AspectRatioEnum,
} from "constants/common.constants";
import {
  readFile,
  getRotatedImage,
  getCroppedImg,
} from "helpers/convert/canvas-utils";
import { convertSrcToFile } from "helpers/convert/convert-src-to-file";

import PreviewImage from "../PreviewImage/PreviewImage";

interface UploadImageProps extends BoxProps {
  id?: string;
  name: string;
  cropAspectRatio?: AspectRatioEnum;
  label?: string;
}

const UploadImage: FC<UploadImageProps> = ({
  id,
  name,
  label,
  cropAspectRatio = AspectRatioEnum.ONE_TO_ONE,
  ...props
}) => {
  const { setFieldValue, values, errors } = useFormikContext<unknown>();

  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number | number[]>(0);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number | number[]>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const src = get(values, name);
  const error = get(errors, name);

  const onCropComplete = (croppedArea: Area, croppedAreaPixelsTemp: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsTemp);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotationTemp = get(ORIENTATION_TO_ANGLE, orientation);
      if (rotationTemp) {
        imageDataUrl = await getRotatedImage(
          imageDataUrl as string,
          rotationTemp
        );
      }

      setImageSrc(imageDataUrl as string);
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
    setCroppedImage(null);
    setRotation(0);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const showCroppedImage = useCallback(async () => {
    if (!imageSrc) return;
    try {
      const croppedImageTemp = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation as number
      );
      setCroppedImage(croppedImageTemp);

      const file = await convertSrcToFile(`${croppedImageTemp}`);

      setOpen(false);
      setRotation(0);
      setZoom(0);
      if (file) {
        setFieldValue(name, file);
      }
    } catch (err) {
      // TODO: Handle crop error
    }
  }, [imageSrc, croppedAreaPixels, rotation, setFieldValue, name]);

  return (
    <Box sx={{ mb: 3, maxWidth: 480 }} {...props}>
      <Dialog open={open} maxWidth="md" keepMounted fullWidth>
        <DialogTitle>Crop Image</DialogTitle>

        {imageSrc && (
          <DialogContent>
            <Box
              sx={theme => ({
                position: "relative",
                width: "100%",
                height: 200,
                background: "#333",
                [theme.breakpoints.up("sm")]: {
                  height: 400,
                },
              })}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation as number}
                zoom={zoom as number}
                aspect={cropAspectRatio}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              <Typography variant="overline">Zoom</Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="zoom"
                onChange={(e, zoomValue) => setZoom(zoomValue)}
                sx={{ ml: 1 }}
              />
            </Box>
            <Box>
              <Typography variant="overline">Rotation</Typography>
              <Slider
                value={rotation}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="rotation"
                onChange={(e, rotationValue) => setRotation(rotationValue)}
                sx={{ ml: 1 }}
              />
            </Box>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={onClose}>Đóng</Button>
          <Button autoFocus variant="contained" onClick={showCroppedImage}>
            Crop image
          </Button>
        </DialogActions>
      </Dialog>

      {label && (
        <Typography sx={{ mb: 1, fontWeight: 500 }}>
          <label htmlFor={id || name}>{label}</label>
        </Typography>
      )}

      <PreviewImage src={croppedImage || src} file={src} />

      {error && <FormHelperText error>{error}</FormHelperText>}

      <Box sx={{ mt: 2 }}>
        <label htmlFor={id || name}>
          <input
            accept="image/*"
            id={id || name}
            multiple
            type="file"
            hidden
            name={name}
            onChange={onFileChange}
            ref={inputRef}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<FileUploadRounded />}
          >
            Upload
          </Button>
        </label>
      </Box>
    </Box>
  );
};

export default memo(UploadImage);

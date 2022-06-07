import React, { FC, memo } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

interface KeplrExtensionDialogProps {
  open: boolean;
}

const KeplrExtensionDialog: FC<KeplrExtensionDialogProps> = ({ open }) => {
  const redirectExtension = () => {
    window.open(
      "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
      "_blank"
    );
  };

  const closeDialog = () => {
    window.location.reload();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth disableAutoFocus>
      <DialogContent>
        <Typography sx={{ mb: 3 }}>
          Bạn cần cài đặt{" "}
          <Typography color="primary" display="inline" component="span">
            Keplr extension
          </Typography>{" "}
          để tiếp tục quá trình
        </Typography>

        <Stack spacing={1}>
          <Button fullWidth variant="contained" onClick={redirectExtension}>
            Cài đặt
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={closeDialog}
          >
            Đóng lại
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default memo(KeplrExtensionDialog);

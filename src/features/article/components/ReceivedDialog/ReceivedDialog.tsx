/* eslint-disable react/no-array-index-key */
import React, { FC, memo, useCallback, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { get } from "lodash";

import { ReceivedOrai, SCORE_ORAI } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";

interface ReceivedDialogProps {
  open: boolean;
  onClose: () => void;
  recipient?: string;
}

const ReceivedDialog: FC<ReceivedDialogProps> = ({
  open,
  onClose,
  recipient,
}) => {
  const [orais, setOrais] = useState<ReceivedOrai[]>([]);

  const getTotalOrai = useCallback(async () => {
    if (!recipient) {
      return;
    }

    const response = await axios.get(
      `https://testnet-lcd.orai.io/cosmos/tx/v1beta1/txs?events=transfer.recipient%3D%27${recipient}%27`
    );

    const data = get(response.data, "txs") as unknown[];
    const oraisChain = data.reduce((total: ReceivedOrai[], item) => {
      const message = get(item, "body.messages[0]");
      const type = get(message, "@type");
      const amount = get(message, "amount[0].amount");
      const fromAddress = get(message, "from_address");
      const toAddress = get(message, "to_address");

      if (type === "/cosmos.bank.v1beta1.MsgSend") {
        return [
          ...total,
          {
            fromAddress,
            toAddress,
            amount,
          },
        ];
      }

      return total;
    }, []);

    setOrais(oraisChain);
  }, [recipient]);

  useEffect(() => {
    getTotalOrai();
  }, [getTotalOrai]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth disableAutoFocus>
      <DialogTitle gutterBottom>Thống kê lịch sử giao dịch</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} elevation={10}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Địa chỉ gửi</TableCell>
                <TableCell>Địa chỉ nhận</TableCell>
                <TableCell>Số Orai</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orais.map((item, index) => (
                <TableRow hover key={index}>
                  <TableCell sx={{ wordBreak: "break-all" }}>
                    {item.fromAddress}
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-all" }}>
                    {item.toAddress}
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-all" }}>
                    {toCurrency(Number(item.amount) / SCORE_ORAI, true)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Đóng lại
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ReceivedDialog);

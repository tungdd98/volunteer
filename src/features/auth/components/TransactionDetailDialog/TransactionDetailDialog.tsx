import React, { FC, memo } from "react";

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

import { useAppSelector } from "app/hooks";
import { SCORE_ORAI } from "features/article/article";
import { toCurrency } from "helpers/convert/currency";

interface TransactionDetailDialogProps {
  open: boolean;
  onClose: () => void;
}

const TransactionDetailDialog: FC<TransactionDetailDialogProps> = ({
  open,
  onClose,
}) => {
  const { transactions } = useAppSelector(state => state.transaction);

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle gutterBottom>Danh sách chi tiết</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} elevation={10}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Địa chỉ nhận</TableCell>
                <TableCell>Số Orai</TableCell>
                <TableCell>Ngày gửi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map(item => (
                <TableRow hover key={item.id}>
                  <TableCell sx={{ wordBreak: "break-all" }}>
                    {item.toAddress}
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-all" }}>
                    {toCurrency(Number(item.orai) / SCORE_ORAI, true)}
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-all" }}>
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
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

export default memo(TransactionDetailDialog);

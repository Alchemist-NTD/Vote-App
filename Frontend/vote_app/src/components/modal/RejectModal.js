import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useDataContext from "../../context/useDataContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RejectModal() {
  const handleClose = () => setRejectModal({ ...rejectModal, isOpen: false });
  const { rejectModal, setRejectModal } = useDataContext();
  return (
    <div>
      <Modal
        open={rejectModal.isOpen}
        onClose={handleClose}
        aria-labelledby="rejectModal-rejectModal-title"
        aria-describedby="rejectModal-rejectModal-description"
      >
        <Box sx={style}>
          <div className="border-b">{rejectModal.title}</div>
          <div>{rejectModal.content}</div>
          <div>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

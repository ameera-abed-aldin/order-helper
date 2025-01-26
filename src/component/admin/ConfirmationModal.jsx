import React from "react";
import { Modal, Button } from "@mui/material";

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h3>{message}</h3>
        <Button variant="contained" color="primary" onClick={onConfirm} style={{ marginRight: "10px" }}>
          Yes
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          No
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
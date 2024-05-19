// components/ConfirmModal.tsx
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  isLoading,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="confirm-modal-title" variant="h6" component="h2">
          Confirm Action
        </Typography>
        <Typography id="confirm-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} sx={{ ml: 2 }}>
            {isLoading ? <CircularProgress size={24} /> : "Confirm"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;

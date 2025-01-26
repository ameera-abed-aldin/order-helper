import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import { Modal, Button, Box } from "@mui/material";

const LogOut = () => {
  const { logout } = useAuth(); // Use the logout function from AuthContext
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  // Handle logout confirmation
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to the login page
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <Button
        variant="contained"
        color="error"
        onClick={() => setIsModalOpen(true)} // Open the modal
      >
        Log Out
      </Button>

      {/* Confirmation Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <h3>Are you sure you want to log out?</h3>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout} // Confirm logout
            sx={{ mr: 2 }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsModalOpen(false)} // Close the modal
          >
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default LogOut;
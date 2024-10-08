import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "20px",
};

export default function AuthModal({ open, handleClose, path }) {
  //   // Hàm để chuyển đổi giữa đăng ký và đăng nhập
  //   const handleTogglePath = () => {
  //     if (path === "/register") {
  //       navigatePath("/register");
  //     } else {
  //       navigatePath("/login");
  //     }
  //   };

  //   // Điều hướng giữa các đường dẫn
  //   const navigatePath = (newPath) => {
  //     handleClose(); // Đóng modal hiện tại
  //     setTimeout(() => {
  //     //   handleOpen(newPath); // Mở lại modal với đường dẫn mới
  //     }, 300); // Thêm độ trễ để có hiệu ứng chuyển đổi mượt hơn (nếu muốn)
  //   };

  console.log("path: ", path);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-bold text-3xl pb-20">
            {path === "register"
              ? "Create your account"
              : "Login to your account"}
          </h1>
          {path === "register" ? <SignupForm /> : <SigninForm />}
          <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
            {path === "register"
              ? "Already have an Account?"
              : "If you don't have an account"}
          </h1>
          <Button
            variant="outlined"
            // onClick={}
            sx={{ borderRadius: "29px", py: "15px" }}
            fullWidth
          >
            {path === "login" ? "Login" : "Create Account"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

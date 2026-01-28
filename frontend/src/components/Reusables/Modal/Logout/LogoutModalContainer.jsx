import LogoutModal from "./LogoutModal";
import { submitLogoutRequest } from "../../../../api/auth";
import { useContext, useState } from "react";
import { ModalContext } from "../ModalContext";
import { AuthContext } from "../../../../context/AuthContext";

export default function LogoutModalContainer() {
  const [error, setError] = useState("");
  const { closeModal } = useContext(ModalContext);
  const { logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await submitLogoutRequest(logout);
    if (response.success) {
      closeModal();
    } else {
      setError("Logout failed:", response.error);
    }
  };
  return (
    <LogoutModal
      handleLogout={handleLogout}
      error={error}
      closeModal={closeModal}
    />
  );
}

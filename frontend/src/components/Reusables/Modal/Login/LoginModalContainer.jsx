import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import { ModalContext } from "../ModalContext";
import { AuthContext } from "../../../../context/AuthContext";

export default function LoginModalContainer() {
  const { closeModal, openModal } = useContext(ModalContext);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    persistentLogin: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (
      formData.email === "streetleague@example.com" &&
      formData.password === "1234"
    ) {
      login("streetleague", "1234");
      setError("");
      closeModal();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <LoginModal
      closeModal={closeModal}
      openModal={openModal}
      formData={formData}
      handleChange={handleChange}
      error={error}
      setError={setError}
      handleLogin={handleLogin}
    />
  );
}

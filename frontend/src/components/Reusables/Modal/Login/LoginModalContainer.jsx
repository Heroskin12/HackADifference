import LoginModal from "./LoginModal";
import { useContext, useState } from "react";
import { ModalContext } from "../ModalContext";
import { AuthContext } from "../../../../context/AuthContext";
import { submitLoginRequest } from "../../../../api/auth";
import { fetchUserDetails } from "../../../../api/user";
import {
  checkEmailValidity,
  sanitizeInput,
  validatePassword,
} from "../../../../utilities/inputUtils";

export default function LoginModalContainer() {
  const { closeModal, openModal, data } = useContext(ModalContext);
  const { login, setUserInfo } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    persistentLogin: false,
  });
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value, name);
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });

    if (name === "email") {
      setIsValidEmail(checkEmailValidity(value));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValid = handleErrors();
    if (isValid) {
      const result = await submitLoginRequest(
        formData.email,
        formData.password,
        login
      );
      if (result.success) {
        const userDetails = await fetchUserDetails();
        if (userDetails && userDetails.name) {
          login();
          setUserInfo(userDetails);
          closeModal();
        } else {
          setError("Failed to fetch user data. Please try again.");
        }
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } else {
      return;
    }
  };

  const handleErrors = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return false;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email.");
      return false;
    }

    const validPassword = validatePassword(formData.password);
    if (validPassword == null) {
      setError(validPassword);
    }

    // If email not found.
    // If password does not match the email.
    setError("");
    return true;
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
      isPremiumContent={data?.isPremiumContent}
    />
  );
}

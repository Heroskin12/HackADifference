import SignupModal from "./SignupModal";
import { useState, useContext } from "react";
import { ModalContext } from "../ModalContext";
import { AuthContext } from "../../../../context/AuthContext";
import {
  sendVerificationEmail,
  submitSignupRequest,
  verifyOtpValid,
} from "../../../../api/auth";
import {
  checkEmailValidity,
  sanitizeInput,
  validatePassword,
} from "../../../../utilities/inputUtils";
export default function SignUpModalContainer() {
  const { closeModal, openModal } = useContext(ModalContext);
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "      ",
    otpVerified: false,
  });
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showOtpInputFormField, setShowOtpInputFormField] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false); // null, "success", "error"

  const handleFormDataChange = (e) => {
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

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    const isValid = handleErrors();
    if (isValid) {
      try {
        const response = await submitSignupRequest(
          formData.name,
          formData.email,
          formData.password,
          login
        );
        if (response.success) {
          closeModal();
        } else {
          setError(response.error || "Signup failed. Please try again.");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.", error);
      }
    } else {
      return;
    }
  };

  const sendVerificationEmailHandler = async () => {
    if (isValidEmail) {
      const status = await sendVerificationEmail(formData.email);
      if (status.success) {
        setShowOtpInputFormField(true);
      } else {
        console.error("Failed to send verification email:", status.error);
        setError(status.error || "Failed to send verification email.");
        return;
      }
    } else {
      setError("Email is not valid. Please enter a valid email address.");
    }
  };

  const checkOtpValid = async (otp) => {
    const result = await verifyOtpValid(formData.email, otp);
    if (result.success) {
      setIsVerifiedEmail(true);
    } else {
      setIsVerifiedEmail(false);
      setError(result.error || "Invalid OTP. Please try again.");
    }
  };

  const handleErrors = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return false;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email.");
      return false;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError); // Set the error message if the password is invalid
      return false; // Return false to indicate validation failure
    }

    if (!isVerifiedEmail) {
      setError("Please verify your email with the OTP.");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <SignupModal
      handleCloseModal={closeModal}
      handleOpenModal={openModal}
      handleSignup={handleSignup}
      handleFormDataChange={handleFormDataChange}
      checkOtpValid={checkOtpValid}
      isVerifiedEmail={isVerifiedEmail}
      sendVerificationEmailHandler={sendVerificationEmailHandler}
      error={error}
      formData={formData}
      isValidEmail={isValidEmail}
      showOtpInputFormField={showOtpInputFormField}
    />
  );
}

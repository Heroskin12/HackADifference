import ForgotPasswordModal from "./ForgotPasswordModal";
import { useState, useContext } from "react";
import { ModalContext } from "../ModalContext";
import {
  checkEmailValidity,
  sanitizeInput,
} from "../../../../utilities/inputUtils";
import {
  sendForgotPasswordRequest,
  verifyOtpValid,
} from "../../../../api/auth";
export default function ForgotPasswordModalContainer() {
  const { closeModal, openModal } = useContext(ModalContext);

  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    otp: "      ",
    otpVerified: false,
  });
  const [showOtpInputFormField, setShowOtpInputFormField] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const sendForgotPasswordOtpEmail = async (e) => {
    e.preventDefault();
    const isValid = handleErrors();
    if (isValid) {
      const response = await sendForgotPasswordRequest(formData.email);
      if (response.success) {
        setShowOtpInputFormField(true);
      } else {
        console.error("Failed to send verification email:", response.error);
        setError(response.error || "Failed to send verification email.");
        return;
      }
      setSuccessMessage(
        "If this email is registered, you will receive a password reset link shortly with an OTP code. Enter below and click submit to verify."
      );
    } else {
      setError("Please fix the errors before proceeding.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isVerifiedEmail) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        openModal("setNewPassword", {
          email: formData.email,
          otp: formData.otp,
        });
      }, 2000);
    } else {
      alert("Please verify your OTP before proceeding.");
    }
  };

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
    if (!formData.email) {
      setError("All fields are required.");
      return false;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email.");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <ForgotPasswordModal
      closeModal={closeModal}
      openModal={openModal}
      sendForgotPasswordOtpEmail={sendForgotPasswordOtpEmail}
      error={error}
      handleChange={handleChange}
      formData={formData}
      successMessage={successMessage}
      checkOtpValid={checkOtpValid}
      isVerifiedEmail={isVerifiedEmail}
      showOtpInputFormField={showOtpInputFormField}
      isValidEmail={isValidEmail}
      handleFormSubmit={handleFormSubmit}
      setFormData={setFormData}
      isLoading={isLoading}
    />
  );
}

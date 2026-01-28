import SetNewPasswordModal from "./SetNewPasswordModal";
import { useContext, useState } from "react";
import { ModalContext } from "../ModalContext";
import { setNewPasswordRequest } from "../../../../api/auth";
import {
  validatePassword,
  sanitizeInput,
} from "../../../../utilities/inputUtils";
export default function SetNewPasswordModalContainer({ data }) {
  const otp = data?.otp || "";
  const email = data?.email || "";
  const { closeModal, openModal } = useContext(ModalContext);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State for spinner
  const [showSuccessTick, setShowSuccessTick] = useState(false); // State for green tick

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    const isValid = handleErrors();
    if (isValid) {
      setIsLoading(true); // Show spinner
      const response = await setNewPasswordRequest(email, otp, formData.password);
      if (response.success) {
        setTimeout(() => {
          setIsLoading(false); // Hide spinner
          setShowSuccessTick(true); // Show green tick
        }, 2000); // Simulate spinner duration
      } else {
        setIsLoading(false); // Hide spinner
        setError(response.error || "Failed to send password reset request.");
      }
    } else {
      setError("Please fix the errors before proceeding.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value, name);
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleErrors = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    const validPassword = validatePassword(formData.password);
    if (validPassword == null) {
      setError(validPassword);
    }

    setError("");
    return true;
  };

  return (
    <SetNewPasswordModal
      closeModal={closeModal}
      handleSubmitNewPassword={handleSubmitNewPassword}
      error={error}
      formData={formData}
      handleChange={handleChange}
      successMessage={successMessage}
      isLoading={isLoading} // Pass loading state
      showSuccessTick={showSuccessTick} // Pass green tick state
      openLoginModal={() => openModal("login")} // Pass login modal handler
    />
  );
}

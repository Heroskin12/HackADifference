import ChangePasswordForm from "./ChangePasswordForm";
import { useState } from "react";
// TODO: Implement new API - import { changePassword } from "../../../../../api/changeSettings";
import {
  sanitizeInput,
  validatePassword,
} from "../../../../../utilities/inputUtils";
export default function ChangePasswordFormContainer() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value, name);

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isPasswordValid = handleErrors();
    if (isPasswordValid) {
      try {
        const response = await changePassword(
          formData.currentPassword,
          formData.confirmNewPassword,
        );
        if (response.success) {
          alert("Password changed successfully!");
        } else {
          setError(response.error || "Failed to change password.");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.", error);
      }
    }
  };

  const handleErrors = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmNewPassword
    ) {
      setError("All fields are required.");
      return false;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return false;
    }

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setError(passwordError); // Set the error message if the password is invalid
      return false; // Return false to indicate validation failure
    }

    setError("");
    return true;
  };

  return (
    <ChangePasswordForm
      handleChange={handleChange}
      formData={formData}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
}

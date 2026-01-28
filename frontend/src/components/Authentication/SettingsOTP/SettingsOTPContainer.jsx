import { useState } from "react";
import SettingsOTP from "./SettingsOTP";
export default function SettingsOTPContainer({
  checkOtpValid,
  isVerifiedEmail,
  setFormData,
  formData,
}) {
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize OTP as an array of 6 empty strings
  const [isSubmitting, setIsSubmitting] = useState("unsubmitted"); // Track request status
  const [error, setError] = useState(false); // Track verification failure

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Ensure only numeric input
    const updatedOtp = [...otp]; // Create a copy of the OTP array
    updatedOtp[index] = value; // Update the specific index
    setOtp(updatedOtp); // Update the state
    formData && setFormData({ ...formData, otp: updatedOtp });

    // Automatically focus the next input field
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // Reset error and submit the new OTP
    setError(false); // Clear the error state
    if (updatedOtp.every((digit) => digit)) {
      handleSubmit(updatedOtp.join(""));
    }
  };

  const handleSubmit = async (otpString) => {
    checkOtpValid(otpString); // Call the function to handle the OTP validation
  };

  return (
    <SettingsOTP
      otp={otp}
      handleChange={handleChange}
      isSubmitting={isSubmitting}
      isVerifiedEmail={isVerifiedEmail}
      error={error}
    />
  );
}

import ChangeEmailForm from "./ChangeEmailForm";
import { useEffect, useState } from "react";
// TODO: Implement new API - import { changeEmail, sendOtpToNewEmail } from "../../../../../api/changeSettings";
import {
  sanitizeInput,
  checkEmailValidity,
} from "../../../../../utilities/inputUtils";
import { useTranslation } from "react-i18next";
export default function ChangeEmailFormContainer({ email }) {
  const { t } = useTranslation("common");
  const [newEmail, setNewEmail] = useState(email || ""); // Initialize with an empty string if email is undefined
  const [otp, setOtp] = useState("      ");
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

  useEffect(() => {
    if (email) {
      setNewEmail(email); // Update newEmail when email becomes available
    }
  }, [email]);

  useEffect(() => {
    if (showOtpInput && otp.length === 6 && otp.split("").every((d) => d)) {
      setVerifyingOtp(true);
    } else {
      setVerifyingOtp(false);
    }
  }, [otp, showOtpInput]);

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value, name);

    setNewEmail(sanitizedValue);

    if (name === "email") {
      setIsValidEmail(checkEmailValidity(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = handleErrors();
    if (isEmailValid) {
      try {
        const response = await changeEmail(newEmail, otp);
        if (response.success) {
          alert("Email changed successfully!");
        } else {
          setError(response.error || "Failed to change email.");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.", error);
      }
    }
  };

  const handleErrors = () => {
    if (!newEmail) {
      setError("All fields are required.");
      return false;
    }

    setError("");
    return true;
  };

  const checkOtpValid = async (otp) => {
    setOtp(otp);
  };

  const sendVerificationEmailHandler = async () => {
    if (isValidEmail) {
      const status = await sendOtpToNewEmail(newEmail);
      if (status.success) {
        setShowOtpInput(true);
      } else {
        console.error("Failed to send verification email:", status.error);
        setError(status.error || "Failed to send verification email.");
        return;
      }
    } else {
      setError("Email is not valid. Please enter a valid email address.");
    }
  };

  if (!email) {
    // Show a loading state while email is being fetched
    return <p>{t("loading.userDetails")}</p>;
  }

  return (
    <ChangeEmailForm
      error={error}
      handleEmailChange={handleEmailChange}
      handleSubmit={handleSubmit}
      otp={otp}
      setOtp={setOtp}
      setShowOtpInput={setShowOtpInput}
      showOtpInput={showOtpInput}
      verifyingOtp={verifyingOtp}
      isValidEmail={isValidEmail}
      newEmail={newEmail}
      checkOtpValid={checkOtpValid}
      isVerifiedEmail={isVerifiedEmail}
      sendVerificationEmailHandler={sendVerificationEmailHandler}
    />
  );
}

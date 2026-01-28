import { useState } from "react";
import BaseModal from "../BaseModal";
import OTPContainer from "../../../Authentication/OTPContainer";
import { useTranslation } from "react-i18next";

export default function SignupModal({
  handleCloseModal,
  handleOpenModal,
  handleSignup,
  handleFormDataChange,
  checkOtpValid,
  isVerifiedEmail,
  sendVerificationEmailHandler,
  error,
  formData,
  isValidEmail,
  showOtpInputFormField,
}) {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { t } = useTranslation("auth");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <BaseModal onClose={handleCloseModal} type="signup">
      <div className="flex flex-col items-center justify-between">
        <div>
          <h2 className="text-[24px] font-heading font-semibold text-dark-primary text-center">
            {t("signup.title")}
          </h2>
          <div className="flex justify-center">
            <p className="text-[14px] font-primary font-normal text-[#A5A5A5]">
              {t("signup.subtitle")}
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-4 w-full max-w-sm p-4"
          onSubmit={handleSignup}
        >
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          {/* Full Name Input Field */}
          <input
            type="text"
            placeholder={t("signup.fullNamePlaceholder")}
            name="name"
            value={formData.name}
            className="rounded-[8px] bg-text-field px-4 py-2 w-full font-primary placeholder:font-fun"
            onChange={handleFormDataChange}
          />

          {/* Email Input Field with OTP Verification */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder={t("signup.emailPlaceholder")}
              className="rounded-[8px] bg-text-field px-4 py-2 w-full font-primary placeholder:font-fun"
              onChange={handleFormDataChange}
            />

            {/* Show "Verify Email" link if email is valid */}
            {isValidEmail && (
              <div className="flex justify-end p-1 cursor-pointer">
                {showOtpInputFormField ? (
                  <span className="text-green-500 font-primary text-sm px-2 mb-2">
                    {t("signup.otpSent")}
                  </span>
                ) : isVerifiedEmail ? (
                  <span className="font-primary text-sm text-green-500">
                    {t("signup.verified")}
                  </span>
                ) : (
                  <span
                    className="font-fun text-sm text-orange-accent hover:underline"
                    onClick={() => {
                      sendVerificationEmailHandler(formData.email);
                    }}
                  >
                    {t("signup.verifyEmail")}
                  </span>
                )}
              </div>
            )}

            {/* Show OTP input if email is valid and OTP has been sent successfully */}
            {showOtpInputFormField && (
              <div className="flex justify-end mt-1">
                <div className="flex flex-col w-full">
                  <OTPContainer
                    checkOtpValid={checkOtpValid}
                    isVerifiedEmail={isVerifiedEmail}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Password Input Field with "Show/Hide" Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
              name="password"
              value={formData.password}
              placeholder={t("signup.passwordPlaceholder")}
              className="rounded-[8px] bg-text-field px-4 py-2 w-full font-primary placeholder:font-fun"
              onChange={handleFormDataChange}
            />
            <span
              className="absolute right-3 top-3 text-sm text-orange-accent cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword
                ? t("signup.hidePassword")
                : t("signup.showPassword")}
            </span>
          </div>

          <p className="text-text-secondary text-sm font-primary whitespace-pre-line">
            {t("signup.passwordRequirements")}
          </p>
          <div className="flex justify-end px-1">
            <p className="font-primary text-dark-primary text-[14px]">
              {t("signup.alreadyMember")}
              <span
                className="underline pl-1 cursor-pointer"
                onClick={() => handleOpenModal("login")}
              >
                {t("signup.login")}
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <button
              type="submit"
              className="bg-orange-accent text-light-primary rounded-[10px] cursor-pointer px-4 py-2 font-fun text-[16px] font-normal w-full"
            >
              {t("signup.signupButton")}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}

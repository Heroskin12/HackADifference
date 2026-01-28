import { useState } from "react";
import BaseModal from "../BaseModal";
import ModalButton from "../../Buttons/ModalButton";
import { useTranslation } from "react-i18next";

export default function SetNewPasswordModal({
  closeModal,
  handleSubmitNewPassword,
  error,
  formData,
  handleChange,
  successMessage,
  isLoading,
  showSuccessTick,
  openLoginModal,
}) {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState(false); // State to toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <BaseModal onClose={closeModal}>
      <div className="flex flex-col items-center justify-center h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-16 w-16 border-4 border-t-orange-accent border-gray-300 rounded-full mb-4"></div>
          </div>
        ) : showSuccessTick ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-green-500 text-6xl mb-4">✔</div>
            <ModalButton type="login" onClick={openLoginModal}>
              {t("setNewPassword.loginButton")}
            </ModalButton>
          </div>
        ) : (
          <>
            {/* Title and Subtitle */}
            <div className="text-center">
              <h2 className="text-[24px] font-fun font-semibold text-dark-primary">
                {t("setNewPassword.title")}
              </h2>
              <p className="text-[14px] font-primary font-normal text-[#A5A5A5]">
                {t("setNewPassword.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-4 w-full max-w-sm p-4"
              onSubmit={handleSubmitNewPassword}
            >
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                  name="password"
                  value={formData.password}
                  placeholder={t("setNewPassword.newPasswordPlaceholder")}
                  className="rounded-[8px] bg-text-field px-4 py-2 w-full"
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 text-sm text-orange-accent cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword
                    ? t("setNewPassword.hide")
                    : t("setNewPassword.show")}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle between "text" and "password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder={t("setNewPassword.confirmPasswordPlaceholder")}
                  className="rounded-[8px] bg-text-field px-4 py-2 w-full"
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 text-sm text-orange-accent cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword
                    ? t("setNewPassword.hide")
                    : t("setNewPassword.show")}
                </span>
              </div>
              <button
                type="submit"
                className="bg-orange-accent text-light-primary rounded-[10px] cursor-pointer px-4 py-2 font-primary text-[16px] font-normal w-full"
              >
                {t("setNewPassword.submitButton")}
              </button>
              {successMessage && (
                <p className="text-text-secondary text-[14px]">
                  {successMessage}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </BaseModal>
  );
}

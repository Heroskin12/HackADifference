import BaseModal from "../BaseModal";
import OTPContainer from "../../../Authentication/OTPContainer";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordModal({
  closeModal,
  sendForgotPasswordOtpEmail,
  error,
  handleChange,
  formData,
  successMessage,
  checkOtpValid,
  isVerifiedEmail,
  showOtpInputFormField,
  isValidEmail,
  handleFormSubmit,
  setFormData,
  isLoading, // Receive loading state
}) {
  const { t } = useTranslation("auth");

  return (
    <BaseModal onClose={closeModal}>
      <div className="flex flex-col items-center justify-center h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-16 w-16 border-4 border-t-orange-accent border-gray-300 rounded-full mb-4"></div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-[24px] font-fun font-semibold text-dark-primary text-center">
                {t("forgotPassword.title")}
              </h2>
              <div className="flex justify-center">
                <p className="text-[14px] font-primary font-normal text-[#A5A5A5] text-center">
                  {t("forgotPassword.subtitle")}
                </p>
              </div>
            </div>

            <form
              className="flex flex-col gap-4 w-full max-w-sm p-4"
              onSubmit={handleFormSubmit}
            >
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  className="rounded-[8px] bg-text-field px-4 py-2 w-full"
                  onChange={handleChange}
                />

                {/* Show "Verify Email" link if email is valid */}
                {isValidEmail && (
                  <div className="flex justify-end p-1 cursor-pointer">
                    {showOtpInputFormField ? (
                      <hr />
                    ) : isVerifiedEmail ? (
                      <span className="font-primary text-sm text-green-500">
                        {t("forgotPassword.verified")}
                      </span>
                    ) : (
                      <span
                        className="font-primary text-sm text-orange-accent hover:underline"
                        onClick={sendForgotPasswordOtpEmail}
                      >
                        {t("forgotPassword.verifyEmail")}
                      </span>
                    )}
                  </div>
                )}

                {/* Show OTP input and button if email is valid and OTP has been sent successfully */}
                {showOtpInputFormField && (
                  <div className="flex flex-col gap-4 mt-1">
                    <div className="flex flex-col w-full">
                      <OTPContainer
                        checkOtpValid={checkOtpValid}
                        isVerifiedEmail={isVerifiedEmail}
                        setFormData={setFormData}
                        formData={formData}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-orange-accent text-light-primary rounded-[10px] cursor-pointer px-4 py-2 font-primary text-[16px] font-normal w-full"
                    >
                      {t("forgotPassword.verifyButton")}
                    </button>
                  </div>
                )}
              </div>
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

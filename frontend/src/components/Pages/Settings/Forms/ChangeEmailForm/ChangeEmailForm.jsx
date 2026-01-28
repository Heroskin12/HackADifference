import SettingsOTPContainer from "../../../../Authentication/SettingsOTP/SettingsOTPContainer";
import { useTranslation } from "react-i18next";
export default function ChangeEmailForm({
  error,
  handleEmailChange,
  handleSubmit,
  isValidEmail,
  showOtpInput,
  newEmail,
  checkOtpValid,
  isVerifiedEmail,
  sendVerificationEmailHandler,
}) {
  const { t } = useTranslation("settings");
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-2 w-[100%] md:w-[50%] pb-4">
        {error && <span className="text-red-500 text-xs">{error}</span>}
        <div className="flex flex-col">
          <label className="text-secondary">
            {t("forms.changeEmail.label")}
          </label>
          <input
            type="email"
            name="email"
            value={newEmail}
            onChange={handleEmailChange}
            className="rounded-[8px] bg-text-field px-4 py-2 border-1"
          />
          {isValidEmail && (
            <div className="flex  p-1 cursor-pointer">
              {showOtpInput ? (
                <span className="text-green-500 font-primary text-sm px-2 mb-2">
                  {t("forms.changeEmail.otpSent")}
                </span>
              ) : isVerifiedEmail ? (
                <span className="font-primary text-sm text-green-500">
                  {t("forms.changeEmail.verified")}
                </span>
              ) : (
                <span
                  className="font-primary text-sm text-orange-accent hover:underline"
                  onClick={sendVerificationEmailHandler}
                >
                  {t("forms.changeEmail.verifyEmail")}
                </span>
              )}
            </div>
          )}
          {/* Show OTP input if email is valid and OTP has been sent successfully */}
          {showOtpInput && (
            <div className="flex mt-1">
              <div className="flex flex-col w-full">
                <SettingsOTPContainer
                  checkOtpValid={checkOtpValid}
                  isVerifiedEmail={isVerifiedEmail}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="p-2 bg-orange-accent text-light-primary rounded-md text-[16px] font-fun font-semibold w-50 cursor-pointer"
          >
            {t("forms.confirmChanges")}
          </button>
        </div>
      </div>
    </form>
  );
}

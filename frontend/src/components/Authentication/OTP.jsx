import { useTranslation } from "react-i18next";

export default function OTP({
  otp,
  handleChange,
  isSubmitting,
  isVerifiedEmail,
  error,
}) {
  const { t } = useTranslation("auth");

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 py-2 justify-center items-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-8 h-10 text-center border border-dark-primary rounded"
            value={otp[index] || ""} // Bind to the corresponding index in the OTP array
            onChange={(e) => handleChange(e, index)}
            id={`otp-${index}`}
          />
        ))}
        {isSubmitting === "submitting" && isVerifiedEmail === false && (
          <div className="ml-3">
            <div className="spinner border-t-2 border-b-2 border-gray-500 rounded-full w-6 h-6 animate-spin"></div>
          </div>
        )}
        {isSubmitting === "submitted" && isVerifiedEmail === false && (
          <div className="ml-3">
            <span className="text-red-500 text-2xl">✖</span>
          </div>
        )}
        {isSubmitting === "submitted" && isVerifiedEmail === true && (
          <div className="ml-3">
            <span className="text-green-500 text-2xl">✔</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {t("otp.verificationFailed")}
        </p>
      )}
    </div>
  );
}

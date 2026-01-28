import { usePaymentError } from "../../context/PaymentErrorContext";
import CloseIcon from "../../assets/CloseIcon";
import { useTranslation } from "react-i18next";

export default function PaymentErrorBanner() {
  const { paymentError, showBanner, dismissBanner } = usePaymentError();
  const { t } = useTranslation("payment");

  if (!showBanner) return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{t("issueDetected")}</p>
            <p className="text-xs opacity-90">
              {paymentError || t("defaultMessage")}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => (window.location.href = "/settings")}
            className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            {t("fixPayment")}
          </button>
          <button
            onClick={dismissBanner}
            className="text-white hover:text-red-200 p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

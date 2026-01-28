import BaseModal from "../../BaseModal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PaymentFailModal({ closeModal }) {
  const { t } = useTranslation("common");
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setShowAnimation(true);
  }, []);

  const handleCancel = () => {
    // Remove the hash from URL
    window.location.hash = "";
    // Close the modal
    closeModal();
  };

  return (
    <BaseModal onClose={handleCancel} type="paymentFail">
      <div className="flex flex-col items-center justify-center p-6">
        {/* Animated Error Icon */}
        <div className={`mb-4 ${showAnimation ? "animate-shake" : ""}`}>
          <div className="relative">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="text-4xl text-red-500">❌</div>
            </div>
            {/* Error ripple effect */}
            <div className="absolute inset-0 w-16 h-16 bg-red-200 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        <h2
          className={`text-[24px] font-heading font-semibold text-dark-primary text-center mb-4 ${
            showAnimation ? "animate-fade-in-up" : ""
          }`}
        >
          {t("paymentFail.title")}
        </h2>
        <p
          className={`text-[14px] font-primary text-gray-600 text-center mb-6 ${
            showAnimation ? "animate-fade-in-up-delayed" : ""
          }`}
        >
          {t("paymentFail.description")}
        </p>
        <div
          className={`flex gap-4 ${
            showAnimation ? "animate-fade-in-up-delayed-2" : ""
          }`}
        >
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md cursor-pointer font-primary"
            onClick={handleCancel}
          >
            {t("paymentFail.cancel")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

import { useEffect, useState } from "react";
import BaseModal from "../../BaseModal";
import { useTranslation } from "react-i18next";

export default function SubscribeModal({ closeModal, handleSubscribe }) {
  const { t } = useTranslation("common");
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentPath = () => {
    return (
      window.location.pathname + window.location.search + window.location.hash
    );
  };

  useEffect(() => {
    const getCheckoutUrl = async () => {
      try {
        setIsLoading(true);
        const currentPath = getCurrentPath();
        const url = await handleSubscribe(currentPath);
        setCheckoutUrl(url);
        setError(null);
      } catch (error) {
        console.error("Error getting checkout URL:", error);
        setError("Failed to prepare checkout. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getCheckoutUrl();
  }, [handleSubscribe]);

  return (
    <BaseModal onClose={closeModal} type="subscribe">
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-[24px] font-fun font-semibold text-dark-primary text-center mb-4">
          {t("subscribeModal.title")}
        </h2>
        <p className="text-[14px] font-primary text-gray-600 text-center mb-6">
          {t("subscribeModal.description")}
        </p>
        <div className="flex gap-4">
          {isLoading ? (
            <button
              className="bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
              disabled
            >
              {t("subscribeModal.loading")}
            </button>
          ) : error ? (
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-md cursor-not-allowed"
              disabled
            >
              {t("subscribeModal.error")}
            </button>
          ) : (
            <a
              href={checkoutUrl}
              className="bg-orange-accent text-white px-6 py-2 rounded-md cursor-pointer text-center no-underline inline-block"
            >
              {t("subscribeModal.subscribeNow")}
            </a>
          )}
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md cursor-pointer"
            onClick={closeModal}
          >
            {t("subscribeModal.cancel")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

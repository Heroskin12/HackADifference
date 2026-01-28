import { useState, useContext, useEffect } from "react";
import { ModalContext } from "../../../../Reusables/Modal/ModalContext";
import {
  fetchManageSubscriptionLink,
  getPaymentInfo,
} from "../../../../../api/membership";
import { useTranslation } from "react-i18next";

export default function ManageMembership({ membership }) {
  const { t } = useTranslation("settings");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isLoadingPaymentInfo, setIsLoadingPaymentInfo] = useState(false);
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (membership == 2) {
        setIsLoadingPaymentInfo(true);
        try {
          const info = await getPaymentInfo();
          // For now, use hardcoded value since backend isn't ready
          setPaymentInfo(info);
        } catch (error) {
          console.error("Error fetching payment info:", error);
          // Fallback to hardcoded value if API fails
        } finally {
          setIsLoadingPaymentInfo(false);
        }
      }
    };

    fetchPaymentInfo();
  }, [membership]);

  const handleUpgradeToPremium = () => {
    openModal("subscribe");
  };

  const handleManageMembership = async () => {
    setIsLoading(true);
    try {
      const response = await fetchManageSubscriptionLink();
      if (response && response.sessionUrl) {
        window.location.href = response.sessionUrl;
      } else {
        console.error("Failed to get subscription management URL");
      }
    } catch (error) {
      console.error("Error getting subscription management URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="text-text-secondary pb-2">{t("membership.description")}</p>
      {membership == 2 && (
        <p className="text-text-secondary mb-4 text-[14px]">
          {t("membership.stripeNote")}
        </p>
      )}
      <div className="space-y-4 pb-4">
        <div className="border p-4 rounded-md">
          <h3 className="font-semibold">
            {t("membership.currentPlan", {
              plan:
                membership == 1
                  ? t("membership.free")
                  : t("membership.premium"),
            })}
          </h3>
          {membership == 1 && (
            <>
              <p className="text-text-secondary">
                {t("membership.freeDescription")}
              </p>
              <button
                className="p-2 mt-4 bg-orange-accent text-light-primary rounded-md text-[16px] font-fun font-semibold w-50 cursor-pointer"
                onClick={handleUpgradeToPremium}
              >
                {t("membership.upgradeToPremium")}
              </button>
            </>
          )}
          {membership == 2 && (
            <>
              <p className="text-text-secondary">
                {t("membership.premiumDescription")}
              </p>
              {paymentInfo && (
                <p className="text-red-400 text-[12px] mt-2">{paymentInfo}</p>
              )}
              <button
                className="p-2 mt-4 bg-orange-accent text-light-primary rounded-md text-[16px] font-fun font-semibold w-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleManageMembership}
                disabled={isLoading}
              >
                {isLoading ? t("loading") : t("membership.manageMembership")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

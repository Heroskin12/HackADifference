import { useState, useContext, useEffect } from "react";
import { ModalContext } from "../../../../Reusables/Modal/ModalContext";
// TODO: Implement new API - import { fetchManageSubscriptionLink, getPaymentInfo } from "../../../../../api/membership";
import { useTranslation } from "react-i18next";

export default function ManageMembership({ membership }) {
  const { t } = useTranslation("settings");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  // Hardcoded payment info for UI only
  useEffect(() => {
    if (membership === 2) {
      setPaymentInfo("Premium Plan: Active");
    } else {
      setPaymentInfo("Free Plan: Upgrade to Premium");
    }
  }, [membership]);

  // UI-only dummy actions
  const handleUpgradeToPremium = () => {
    alert("Upgrade to Premium (UI only, no backend)");
  };
  const handleManageMembership = async () => {
    alert("Manage Membership (UI only, no backend)");
  };

  return (
    <div>
      <p className="text-text-secondary pb-2">{t("membership.description")}</p>
      {membership == 2 && (
        <p className="text-text-secondary mb-4 text-[14px]">
          {/* Stripe note removed, UI only */}
          Premium plan active (UI only)
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
              <p className="text-text-secondary">Free plan (UI only)</p>
              <button
                className="p-2 mt-4 bg-orange-accent text-light-primary rounded-md text-[16px] font-fun font-semibold w-50 cursor-pointer"
                onClick={handleUpgradeToPremium}
              >
                Upgrade to Premium
              </button>
            </>
          )}
          {membership == 2 && (
            <>
              <p className="text-text-secondary">Premium plan (UI only)</p>
              {paymentInfo && (
                <p className="text-red-400 text-[12px] mt-2">{paymentInfo}</p>
              )}
              <button
                className="p-2 mt-4 bg-orange-accent text-light-primary rounded-md text-[16px] font-fun font-semibold w-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleManageMembership}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Manage Membership"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

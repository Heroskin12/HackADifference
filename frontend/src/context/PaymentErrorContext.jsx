import { createContext, useContext, useState, useEffect } from "react";
// TODO: Implement new API - import { getPaymentInfo } from "../api/membership";
import { AuthContext } from "./AuthContext";

export const PaymentErrorContext = createContext();

export default function PaymentErrorProvider({ children }) {
  const [paymentError, setPaymentError] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const { isAuthenticated, userInfo } = useContext(AuthContext);

  useEffect(() => {
    const checkPaymentInfo = async () => {
      // Only check for premium users (subscription tier 2)
      if (isAuthenticated && userInfo?.subscriptionTier === 2) {
        try {
          const response = await getPaymentInfo();

          // If the API returns anything, show the error banner
          if (response) {
            setPaymentError(response);
            setShowBanner(true);
          }
        } catch (error) {
          // If the API call fails, also show an error
          console.error("Payment info error:", error);
          setPaymentError(
            "There was an issue checking your payment information. Please contact support.",
          );
          setShowBanner(true);
        }
      }
    };

    checkPaymentInfo();
  }, [isAuthenticated, userInfo]);

  const dismissBanner = () => {
    setShowBanner(false);
  };

  return (
    <PaymentErrorContext.Provider
      value={{
        paymentError,
        showBanner,
        dismissBanner,
      }}
    >
      {children}
    </PaymentErrorContext.Provider>
  );
}

export const usePaymentError = () => {
  const context = useContext(PaymentErrorContext);
  if (!context) {
    throw new Error(
      "usePaymentError must be used within a PaymentErrorProvider",
    );
  }
  return context;
};

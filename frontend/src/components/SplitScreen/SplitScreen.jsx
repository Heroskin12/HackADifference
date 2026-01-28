import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import NavManager from "../Navbar/NavManager";
import GoalProvider from "../../context/GoalContext";
import { usePaymentError } from "../../context/PaymentErrorContext";
import PaymentErrorBanner from "../PaymentErrorBanner/PaymentErrorBanner";

export default function SplitScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showBanner } = usePaymentError();

  return (
    <div className="md:flex h-screen">
      <NavManager isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className="bg-dark-primary flex-1">
        <div
          className={`
            bg-light-primary
            md:rounded-tl-[15px] rounded-bl-[15px]
            p-4 
            transition-all duration-300
            ${isExpanded ? "md:ml-56" : "md:ml-20"}
          `}
        >
          <div className="relative">
            <PaymentErrorBanner />
            <div
              className={`bg-light-primary min-h-screen mb-[73px] ${
                showBanner ? "pt-16" : ""
              }`}
            >
              <GoalProvider>
                <Outlet />
              </GoalProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

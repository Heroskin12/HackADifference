import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { StrictMode, useState, useEffect } from "react";
import router from "./router.js";
import "./index.css";
import "./i18n";
import ModalProvider from "./components/Reusables/Modal/ModalContext";
import ModalManager from "./components/Reusables/Modal/ModalManager";
import AuthProvider from "./context/AuthContext.jsx";
import PaymentErrorProvider from "./context/PaymentErrorContext.jsx";
import PaymentErrorBanner from "./components/PaymentErrorBanner/PaymentErrorBanner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PaymentErrorProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <ModalManager />
        </ModalProvider>
      </PaymentErrorProvider>
    </AuthProvider>
  </StrictMode>
);

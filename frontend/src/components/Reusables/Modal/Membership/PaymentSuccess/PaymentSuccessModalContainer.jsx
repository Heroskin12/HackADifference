import PaymentSuccessModal from "./PaymentSuccessModal.jsx";
import { ModalContext } from "../../ModalContext";
import { useContext, useEffect } from "react";

export default function PaymentSuccessModalContainer() {
  const { closeModal, openModal, isOpen, type } = useContext(ModalContext);

  // Check if URL contains #paymentsuccess
  const shouldShowModal = window.location.hash === "#paymentsuccess";

  useEffect(() => {
    // Auto-open the modal if URL contains #paymentsuccess
    if (shouldShowModal && (!isOpen || type !== "paymentSuccess")) {
      openModal("paymentSuccess");
    }
  }, [shouldShowModal, isOpen, type, openModal]);

  // Only render if the modal should be shown
  if (!shouldShowModal || !isOpen || type !== "paymentSuccess") {
    return null;
  }

  return (
    <div>
      <PaymentSuccessModal closeModal={closeModal} openModal={openModal} />
    </div>
  );
}

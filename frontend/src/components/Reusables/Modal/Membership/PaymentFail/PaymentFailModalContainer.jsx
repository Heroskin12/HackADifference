import PaymentFailModal from "./PaymentFailModal.jsx";
import { ModalContext } from "../../ModalContext";
import { useContext, useEffect } from "react";

export default function PaymentFailModalContainer() {
  const { closeModal, openModal, isOpen, type } = useContext(ModalContext);

  // Check if URL contains #paymentfail
  const shouldShowModal = window.location.hash === "#paymentfail";

  useEffect(() => {
    // Auto-open the modal if URL contains #paymentfail
    if (shouldShowModal && (!isOpen || type !== "paymentFail")) {
      openModal("paymentFail");
    }
  }, [shouldShowModal, isOpen, type, openModal]);

  // Only render if the modal should be shown
  if (!shouldShowModal || !isOpen || type !== "paymentFail") {
    return null;
  }

  return (
    <div>
      <PaymentFailModal closeModal={closeModal} openModal={openModal} />
    </div>
  );
}

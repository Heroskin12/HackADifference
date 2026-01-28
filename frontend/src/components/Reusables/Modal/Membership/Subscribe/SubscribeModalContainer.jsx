import SubscribeModal from "./SubscribeModal";
import { ModalContext } from "../../ModalContext";
import { useContext } from "react";
// TODO: Implement new API - import { createCheckoutSession } from "../../../../../api/membership";

export default function SubscribeModalContainer() {
  const { closeModal, openModal, isOpen, type } = useContext(ModalContext);

  const handleSubscribe = async (currentPath) => {
    try {
      const response = await createCheckoutSession(currentPath);
      if (response && response.sessionUrl) {
        return response.sessionUrl;
      } else {
        console.error("Invalid response from server:", response);
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  // Only render if the modal is open and it's the subscribe type
  if (!isOpen || type !== "subscribe") {
    return null;
  }

  return (
    <div>
      <SubscribeModal
        closeModal={closeModal}
        openModal={openModal}
        handleSubscribe={handleSubscribe}
      />
    </div>
  );
}

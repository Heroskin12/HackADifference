import { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    data: null, // Add a `data` field for optional modal data
  });

  const openModal = (type, data = null) => {
    setModalState({ isOpen: true, type, data });
  };

  const closeModal = () =>
    setModalState({ isOpen: false, type: null, data: null });

  return (
    <ModalContext.Provider value={{ ...modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

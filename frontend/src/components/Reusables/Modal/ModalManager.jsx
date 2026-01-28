import { useContext } from "react";
import { ModalContext } from "./ModalContext.jsx";
import LoginModalContainer from "./Login/LoginModalContainer.jsx";
import SignUpModalContainer from "./Signup/SignUpModalContainer.jsx";
import LogoutModalContainer from "./Logout/LogoutModalContainer.jsx";
import DeleteAccountModal from "./DeleteAccountModal.jsx";
import ForgotPasswordModalContainer from "./ForgotPassword/ForgotPasswordModalContainer.jsx";
import SetNewPasswordModalContainer from "./SetNewPassword/SetNewPasswordModalContainer.jsx";
import LevelModalContainer from "./LevelModal/LevelModalContainer.jsx";
// Payment modals removed

const MODAL_COMPONENTS = {
  login: LoginModalContainer,
  signup: SignUpModalContainer,
  logout: LogoutModalContainer,
  deleteAccount: DeleteAccountModal,
  forgotPassword: ForgotPasswordModalContainer,
  setNewPassword: SetNewPasswordModalContainer,
  level: LevelModalContainer,
  // subscribe, paymentSuccess, paymentFail modals removed
};

export default function ModalManager() {
  const { isOpen, type, data } = useContext(ModalContext);

  if (!isOpen || !type) return null;

  const ModalComponent = MODAL_COMPONENTS[type];
  return ModalComponent ? <ModalComponent data={data} /> : null;
}

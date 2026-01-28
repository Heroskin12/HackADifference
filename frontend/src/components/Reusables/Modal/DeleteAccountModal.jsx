import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import BaseModal from "./BaseModal";
import StopIcon from "../../../assets/StopIcon";
// TODO: Implement new API - import { deleteAccount } from "../../../api/changeSettings";
import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

export default function DeleteAccountModal() {
  const { t } = useTranslation("settings");
  const [error, setError] = useState("");
  const { closeModal } = useContext(ModalContext);
  const { logout } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await deleteAccount(logout);
    if (response.success) {
      closeModal();
    } else {
      setError(response.error || "Failed to send password reset request.");
    }
  };

  return (
    <BaseModal onClose={closeModal}>
      <div className="flex flex-col items-center justify-between">
        <div className="py-2">
          <StopIcon />
        </div>
        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded-md mb-4">
            <p className="text-sm font-primary">{error}</p>
          </div>
        )}
        <div>
          <h2 className="text-[24px] font-fun font-semibold text-dark-primary text-center">
            {t("deleteAccountModal.title")}
          </h2>
          <div className="flex justify-center">
            <p className="text-[14px] font-primary font-normal text-[#A5A5A5] py-3 text-center">
              {t("deleteAccountModal.warning")}
            </p>
          </div>
        </div>
        <form action="" onSubmit={submitHandler}>
          <button
            type="submit"
            className="bg-orange-accent text-light-primary rounded-[10px] cursor-pointer px-4 py-2 font-primary text-[16px] font-normal w-full"
          >
            {t("deleteAccountModal.confirmButton")}
          </button>
        </form>
      </div>
    </BaseModal>
  );
}

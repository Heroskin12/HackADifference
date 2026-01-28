import BaseModal from "../BaseModal";
import { useTranslation } from "react-i18next";
export default function LogoutModal({ handleLogout, error, closeModal }) {
  const { t } = useTranslation("auth");
  return (
    <BaseModal onClose={closeModal}>
      <div className="flex flex-col items-center justify-between">
        <div>
          <h2 className="text-[24px] font-heading font-semibold text-dark-primary text-center">
            {t("logout.title")}
          </h2>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="flex justify-between gap-4 p-4">
          <button
            className="flex justify-center bg-white rounded-[10px] cursor-pointer px-4 py-2 w-full border-dark-primary border-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] font-fun"
            onClick={handleLogout}
          >
            {t("logout.confirm")}
          </button>
          <button
            className="bg-orange-accent text-light-primary rounded-[10px] cursor-pointer px-4 py-2 font-fun text-[16px] font-normal w-full"
            onClick={closeModal}
          >
            {t("logout.cancel")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

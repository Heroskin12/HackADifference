import Header from "../components/Reusables/Headers/AltHeader/AltHeader";
import ModalButton from "../components/Reusables/Buttons/ModalButton";
import SettingsFormContainer from "../components/Pages/Settings/SettingsFormContainer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotLoggedInScreen from "../components/Authentication/NotLoggedInScreen/NotLoggedInScreen";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { loading } = useContext(AuthContext);
  const { t } = useTranslation("settings");

  if (loading) {
    // Show a loading state while user details are being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen-bg-white">
      <Header />
      <div className="p-4">
        <h1 className="text-[18px] font-heading font-semibold">{t("title")}</h1>
        <p className="text-text-secondary text-[14px] font-primary">
          {t("subtitle")}
        </p>
        <hr className="border-[#A5A5A5] my-2" />
        <div className="flex flex-col">
          <SettingsFormContainer />
          <div>
            <ModalButton type="deleteAccount">{t("deleteAccount")}</ModalButton>
          </div>
        </div>
      </div>
    </div>
  );
}

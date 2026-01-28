import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

export default function Logout() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { t } = useTranslation("common");

  return (
    <>
      <h1>{t("logout.title")}</h1>
      <p>{t("logout.message")}</p>
    </>
  );
}

import { useContext, useState } from "react";
import ChangeEmailFormContainer from "./Forms/ChangeEmailForm/ChangeEmailFormContainer";
import ChangeNameFormContainer from "./Forms/ChangeNameForm/ChangeNameFormContainer";
import ChangePasswordFormContainer from "./Forms/ChangePasswordForm/ChangePasswordFormContainer";
import ChevronDown from "../../../assets/ChevronDown.jsx"; // Update the path to your chevron icon
import { AuthContext } from "../../../context/AuthContext.jsx";
// import ManageMembershipContainer from "./Forms/ManageMembershipContainer/ManageMembershipContainer.jsx";
import { useTranslation } from "react-i18next";
export default function SettingsFormContainer() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const { t } = useTranslation("settings");

  const toggleAccordion = (accordionName) => {
    setActiveAccordion((prev) =>
      prev === accordionName ? null : accordionName,
    );
  };

  return (
    <div className="space-y-4">
      {/* Change Name Accordion */}
      <div className="border rounded-md">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleAccordion("changeName")}
        >
          <h2 className="text-lg font-semibold">{t("accordion.changeName")}</h2>
          <ChevronDown
            alt="Toggle"
            className={`w-4 h-4 transform ${
              activeAccordion === "changeName" ? "rotate-180" : ""
            }`}
          />
        </div>
        {activeAccordion === "changeName" && (
          <div className="px-4">
            <ChangeNameFormContainer name={userInfo.name} />
          </div>
        )}
      </div>
      {/* Change Password Accordion */}
      <div className="border rounded-md">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleAccordion("changePassword")}
        >
          <h2 className="text-lg font-semibold">
            {t("accordion.changePassword")}
          </h2>
          <ChevronDown
            alt="Toggle"
            className={`w-4 h-4 transform ${
              activeAccordion === "changePassword" ? "rotate-180" : ""
            }`}
          />
        </div>
        {activeAccordion === "changePassword" && (
          <div className="px-4">
            <ChangePasswordFormContainer />
          </div>
        )}
      </div>
      {/* Change Email Accordion */}
      <div className="border rounded-md">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleAccordion("changeEmail")}
        >
          <h2 className="text-lg font-semibold">
            {t("accordion.changeEmail")}
          </h2>
          <ChevronDown
            alt="Toggle"
            className={`w-4 h-4 transform ${
              activeAccordion === "changeEmail" ? "rotate-180" : ""
            }`}
          />
        </div>
        {activeAccordion === "changeEmail" && (
          <div className="px-4">
            <ChangeEmailFormContainer email={userInfo.email} />
          </div>
        )}
      </div>
    </div>
  );
}

import ChangeNameForm from "./ChangeNameForm";
import { useState } from "react";
// TODO: Implement new API - import { changeName } from "../../../../../api/changeSettings";
import { sanitizeInput } from "../../../../../utilities/inputUtils";
import { useTranslation } from "react-i18next";

export default function ChangeNameFormContainer({ name }) {
  const { t } = useTranslation("settings");
  const [formData, setFormData] = useState({
    name: name || "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value, name);

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNameValid = handleErrors();
    if (isNameValid) {
      try {
        const response = await changeName(formData.name.trim());
        if (response.success) {
          setError("");
          setSuccessMessage(t("forms.changeName.success"));
        } else {
          setError(response.error || t("forms.changeName.failed"));
        }
      } catch (error) {
        setError(t("forms.changeName.unexpected"), error);
      }
    }
  };

  const handleErrors = () => {
    if (!formData.name) {
      setError(t("forms.changeName.allFieldsRequired"));
      setSuccessMessage("");
      return false;
    }

    if (formData.name === name) {
      setError(t("forms.changeName.differentName"));
      setSuccessMessage("");
      return false;
    }

    // if (nameFormData.name === currentName) {
    //   setNameError("Please enter a different name than your current one.");
    //   return false;
    // }

    setError("");
    return true;
  };
  return (
    <ChangeNameForm
      handleSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      error={error}
      successMessage={successMessage}
    />
  );
}

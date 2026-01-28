import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChangePasswordForm({
  handleChange,
  formData,
  error,
  handleSubmit,
}) {
  const { t } = useTranslation("settings");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 w-[100%] md:w-[50%] pb-4">
        {error && <span className="text-red-500 text-xs">{error}</span>}
        <div className="flex flex-col">
          <label className="text-secondary">
            {t("forms.changePassword.currentPassword")}
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="rounded-[8px] bg-text-field px-4 py-2 border-1 w-full"
            />
            <span
              className="absolute right-3 top-3 text-sm text-orange-accent cursor-pointer"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
            >
              {showCurrentPassword
                ? t("forms.changePassword.hide")
                : t("forms.changePassword.show")}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-secondary">
            {t("forms.changePassword.newPassword")}
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="rounded-[8px] bg-text-field px-4 py-2 border-1 w-full"
            />
            <span
              className="absolute right-3 top-3 text-sm text-orange-accent cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword
                ? t("forms.changePassword.hide")
                : t("forms.changePassword.show")}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-secondary">
            {t("forms.changePassword.confirmPassword")}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="rounded-[8px] bg-text-field px-4 py-2 border-1 w-full"
            />
            <span
              className="absolute right-3 top-3 text-sm text-orange-accent cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword
                ? t("forms.changePassword.hide")
                : t("forms.changePassword.show")}
            </span>
          </div>
        </div>
        <p className="text-text-secondary text-sm">
          {t("forms.changePassword.requirements")}
        </p>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="p-2 bg-orange-accent text-light-primary rounded-md text-[16px] font-fun font-semibold w-50 cursor-pointer"
          >
            {t("forms.confirmChanges")}
          </button>
        </div>
      </div>
    </form>
  );
}

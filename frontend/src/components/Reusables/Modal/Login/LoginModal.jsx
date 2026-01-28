import { useState } from "react";
import Google from "../../../../assets/google.png";
import BaseModal from "../BaseModal";
import { useTranslation } from "react-i18next";

export default function LoginModal({
  closeModal,
  openModal,
  formData,
  error,
  handleChange,
  handleLogin,
}) {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { t } = useTranslation("auth");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <BaseModal onClose={closeModal} type="login">
      <div className="flex flex-col items-center justify-between">
        <div>
          <h2 className="text-[24px] font-heading font-semibold text-dark-primary text-center">
            {t("login.title")}
          </h2>
          <div className="flex justify-center">
            <p className="text-[14px] font-fun font-normal text-[#A5A5A5]">
              {t("login.newHere")}
              <span className="pl-1">
                <span
                  className="text-[14px] font-fun font-normal text-[#A5A5A5] underline cursor-pointer"
                  onClick={() => {
                    openModal("signup");
                  }}
                >
                  {t("login.signup")}
                </span>
              </span>
            </p>
          </div>
        </div>
        <form
          className="flex flex-col gap-4 w-full max-w-sm p-4"
          onSubmit={handleLogin}
        >
          {error && (
            <div className="text-red-500 text-sm text-center font-fun">
              {error}
            </div>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("login.emailPlaceholder")}
            className="rounded-[8px] bg-text-field px-4 py-2 w-full font-primary placeholder:font-fun"
            required
            aria-required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("login.passwordPlaceholder")}
              className="rounded-[8px] bg-text-field px-4 py-2 w-full font-primary placeholder:font-fun"
              required
              aria-required
            />
            <span
              className="absolute right-3 top-3 text-sm text-orange-accent cursor-pointer font-fun"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? t("login.hidePassword") : t("login.showPassword")}
            </span>
          </div>
          <div className="flex justify-between px-1 items-center gap-2">
            <label className="flex items-center font-fun text-dark-primary text-[14px] whitespace-nowrap flex-shrink-0">
              <input
                type="checkbox"
                className="mr-2"
                name="persistentLogin"
                value={formData.persistentLogin}
                onChange={handleChange}
              />
              {t("login.staySignedIn")}
            </label>
            <p
              className="font-fun text-dark-primary text-[14px] underline cursor-pointer text-right"
              onClick={() => {
                openModal("forgotPassword");
              }}
            >
              {t("login.forgotPassword")}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <button
              type="submit"
              className="bg-orange-accent text-light-primary rounded-[10px] cursor-pointer px-4 py-2 font-fun text-[16px] font-normal w-full"
            >
              {t("login.loginButton")}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}

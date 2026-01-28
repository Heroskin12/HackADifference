import { useTranslation } from "react-i18next";

export default function ChangeNameForm({
  handleSubmit,
  formData,
  handleChange,
  error,
  successMessage,
}) {
  const { t } = useTranslation("settings");
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-[100%] md:w-[50%]">
        <div className="flex flex-col">
          <label className="text-secondary">
            {t("forms.changeName.label")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-[8px] bg-text-field px-4 py-2 border-1 mt-2 mb-2"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm pb-2 pt-1 pl-1">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm pl-1">{successMessage}</p>
        )}
        <div className="flex justify-between items-center mt-1">
          <button
            type="submit"
            className="p-2 mb-4 bg-orange-accent text-light-primary rounded-md text-[16px] font-fun font-semibold w-50 cursor-pointer"
          >
            {t("forms.confirmChanges")}
          </button>
        </div>
      </div>
    </form>
  );
}

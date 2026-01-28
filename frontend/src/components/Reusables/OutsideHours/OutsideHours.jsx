import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function OutsideHours({
  handleSave,
  currentOutsideHours,
  currentTotalMinutes,
  error,
  isLoading,
  showSuccess,
  lastAddedTime,
}) {
  const [minutes, setMinutes] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [validationError, setValidationError] = useState("");
  const { t } = useTranslation("user");

  const MAX_TOTAL_MINUTES = 3000 * 60;

  // Define levels with their corresponding hours
  const levels = [
    { value: "", label: t("outsideHours.levels.select"), minutes: 0 },
    { value: "A0", label: t("outsideHours.levels.a0"), minutes: 0 },
    { value: "A1", label: t("outsideHours.levels.a1"), minutes: 5 * 60 },
    { value: "A2", label: t("outsideHours.levels.a2"), minutes: 50 * 60 },
    { value: "B1", label: t("outsideHours.levels.b1"), minutes: 400 * 60 },
    { value: "B2", label: t("outsideHours.levels.b2"), minutes: 800 * 60 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "minutes") {
      setValidationError("");

      if (value === "") {
        setMinutes("");
      } else {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
          const newTotal = currentTotalMinutes + parsedValue;
          if (newTotal > MAX_TOTAL_MINUTES) {
            const remainingMinutes = MAX_TOTAL_MINUTES - currentTotalMinutes;
            const remainingHours = Math.floor(remainingMinutes / 60);
            const remainingMins = remainingMinutes % 60;
            setValidationError(
              `Cannot exceed 3,000 total hours. You can only add ${remainingHours} hours and ${remainingMins} minutes more.`
            );
          } else {
            setMinutes(parsedValue);
          }
        }
      }
    } else if (name === "level") {
      setValidationError("");
      setSelectedLevel(value);

      // Clear minutes when a level is selected
      if (value) {
        setMinutes("");
      }

      if (value) {
        const levelMinutes =
          levels.find((l) => l.value === value)?.minutes || 0;
        const newTotal = currentTotalMinutes + levelMinutes;
        if (currentTotalMinutes + parsedValue > MAX_TOTAL_MINUTES) {
          const remainingMinutes = MAX_TOTAL_MINUTES - currentTotalMinutes;
          const remainingHours = Math.floor(remainingMinutes / 60);
          const remainingMins = remainingMinutes % 60;
          setValidationError(
            t("outsideHours.cannotExceed", {
              hours: remainingHours,
              minutes: remainingMins,
            })
          );
        }
      }
    } else if (name === "description") {
      setActivityDescription(value);
    }
  };

  const getTotalMinutesToAdd = () => {
    if (selectedLevel) {
      return levels.find((l) => l.value === selectedLevel)?.minutes || 0;
    } else {
      return parseInt(minutes) || 0;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const totalMinutesToAdd = getTotalMinutesToAdd();

    if (currentTotalMinutes + totalMinutesToAdd > MAX_TOTAL_MINUTES) {
      const remainingMinutes = MAX_TOTAL_MINUTES - currentTotalMinutes;
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingMins = remainingMinutes % 60;
      setValidationError(
        t("outsideHours.cannotExceed", {
          hours: remainingHours,
          minutes: remainingMins,
        })
      );
      return;
    }

    handleSave({
      minutes: totalMinutesToAdd,
      description: activityDescription,
      level: selectedLevel,
    });

    // Clear form after submission
    setMinutes("");
    setSelectedLevel("");
    setActivityDescription("");
    setValidationError("");
  };

  // Success overlay
  if (showSuccess) {
    return (
      <div className="py-2 mt-5 border-t-1 border-[#A5A5A5]">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            {t("outsideHours.successTitle")}
          </h3>
          <p
            className="text-gray-600 mb-1"
            dangerouslySetInnerHTML={{
              __html: t("outsideHours.successMessage", { time: lastAddedTime }),
            }}
          />
          <p
            className="text-sm text-gray-500"
            dangerouslySetInnerHTML={{
              __html: t("outsideHours.newTotal", {
                total: currentOutsideHours,
              }),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 mt-5 border-t-1 border-[#A5A5A5]">
      <div className="my-5">
        <h2 className="font-fun font-semibold">{t("outsideHours.title")}</h2>
        <p className="text-text-secondary font-fun">
          {t("outsideHours.description1")}
        </p>
        <p className="text-text-secondary font-fun">
          {t("outsideHours.description2")}
        </p>
        <p
          className="font-fun"
          dangerouslySetInnerHTML={{
            __html: t("outsideHours.currentTotal", {
              hours: error ? error : currentOutsideHours,
            }),
          }}
        />
      </div>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="level" className="block mb-2 font-bold font-fun">
          {t("outsideHours.levelLabel")}
        </label>
        <select
          id="level"
          name="level"
          value={selectedLevel}
          onChange={handleInputChange}
          disabled={isLoading}
          className="w-full p-2 mb-4 border-1 border-text-secondary rounded-sm disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none pr-10 bg-no-repeat bg-right font-primary"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "1.5em 1.5em",
          }}
        >
          {levels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>

        <label htmlFor="minutes" className="block mb-2 font-bold font-fun">
          {t("outsideHours.minutesLabel")}{" "}
          {!selectedLevel && <span className="text-orange-accent">*</span>}
        </label>
        <input
          id="minutes"
          name="minutes"
          type="number"
          required={!selectedLevel}
          min="0"
          placeholder={
            selectedLevel
              ? t("outsideHours.minutesDisabledPlaceholder")
              : t("outsideHours.minutesPlaceholder")
          }
          value={minutes}
          onChange={handleInputChange}
          disabled={isLoading || selectedLevel}
          className="w-full p-2 mb-2 border-1 border-text-secondary rounded-sm disabled:bg-gray-100 disabled:cursor-not-allowed font-primary placeholder:font-fun"
        />

        {selectedLevel && (
          <p
            className="text-sm text-orange-accent mb-2 font-fun"
            dangerouslySetInnerHTML={{
              __html: t("outsideHours.selectedLevelAdds", {
                hours:
                  levels.find((l) => l.value === selectedLevel)?.minutes / 60,
              }),
            }}
          />
        )}

        {getTotalMinutesToAdd() > 0 && (
          <p
            className="text-sm text-gray-600 mb-2 font-fun"
            dangerouslySetInnerHTML={{
              __html: t("outsideHours.totalToAdd", {
                hours: Math.floor(getTotalMinutesToAdd() / 60),
                minutes: getTotalMinutesToAdd() % 60,
              }),
            }}
          />
        )}

        {validationError && (
          <p className="text-red-500 text-sm mb-4 font-fun">
            {validationError}
          </p>
        )}

        <label htmlFor="description" className="block mb-2 font-bold font-fun">
          {t("outsideHours.descriptionLabel")}{" "}
          <span className="text-orange-accent">*</span>
        </label>
        <input
          id="description"
          name="description"
          type="text"
          required
          placeholder={
            selectedLevel
              ? t("outsideHours.descriptionLevelPlaceholder")
              : t("outsideHours.descriptionPlaceholder")
          }
          value={activityDescription}
          onChange={handleInputChange}
          disabled={isLoading}
          className="w-full p-2 mb-4 border-1 border-text-secondary rounded-sm disabled:bg-gray-100 disabled:cursor-not-allowed font-primary placeholder:font-fun"
        />

        <p className="text-sm text-gray-600 mb-4 font-fun">
          <span className="text-red-500">*</span>{" "}
          {t("outsideHours.requiredFields")}
        </p>

        <button
          type="submit"
          disabled={
            isLoading || validationError || (!minutes && !selectedLevel)
          }
          className="bg-orange-accent p-3 rounded-sm cursor-pointer text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px] font-fun"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("outsideHours.adding")}
            </>
          ) : (
            t("outsideHours.addButton")
          )}
        </button>
      </form>
    </div>
  );
}

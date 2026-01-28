import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ProgressGoal({ goal, handleSave, dailyWatchTime }) {
  const [newGoal, setNewGoal] = useState(goal);
  const { t } = useTranslation("user");

  // Update newGoal whenever the goal prop changes
  useEffect(() => {
    setNewGoal(goal);
  }, [goal]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setNewGoal(""); // Allow the input to be cleared
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setNewGoal(parsedValue);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleSave(newGoal); // Call handleSave with the updated goal
  };

  return (
    <div className="py-2">
      <div className="my-5">
        <h2 className="font-fun font-semibold">{t("progressGoal.title")}</h2>
        <p
          className="font-fun"
          dangerouslySetInnerHTML={{
            __html: t("progressGoal.watchedToday", { minutes: dailyWatchTime }),
          }}
        />
        <p
          className="font-fun"
          dangerouslySetInnerHTML={{
            __html: t("progressGoal.currentGoal", { goal: goal }),
          }}
        />
      </div>
      <h2 className="font-fun font-semibold">
        {t("progressGoal.setGoalTitle")}
      </h2>
      <p className="text-text-secondary font-fun">
        {t("progressGoal.setGoalDescription")}
      </p>
      <form onSubmit={handleFormSubmit}>
        <input
          name="dailyGoal"
          type="number"
          value={newGoal}
          onChange={handleInputChange}
          className="mt-1 w-full p-2 mb-4 border-1 border-text-secondary rounded-sm font-primary"
        />
        <button
          type="submit"
          className="bg-orange-accent p-3 rounded-sm cursor-pointer text-white font-fun"
        >
          {t("progressGoal.saveGoal")}
        </button>
      </form>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import ProgressGoal from "./ProgressGoal";
import { AuthContext } from "../../../context/AuthContext";
import { GoalContext } from "../../../context/GoalContext";
// TODO: Implement new API - import { fetchUserActivity } from "../../../api/userActivity";
import { useTranslation } from "react-i18next";

export default function ProgressGoalContainer() {
  const [currentGoal, setCurrentGoal] = useState(15); // Default goal
  const [dailyWatchTime, setDailyWatchTime] = useState(0); // Default daily watch time
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const { goal, updateGoal, progress, updateAuthenticatedGoal } =
    useContext(GoalContext);
  const { t } = useTranslation("user");

  // Determine where to get the goal data from (authenticated user or guest)
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentGoal(userInfo?.dailyGoal); // Use user's daily goal or default
    } else {
      setCurrentGoal(goal || 15); // Use guest's goal or default
    }
  }, [goal, isAuthenticated, userInfo?.dailyGoal]);

  // Function to save the goal
  const handleSave = async (newGoal) => {
    if (isAuthenticated) {
      updateAuthenticatedGoal(newGoal);
    } else {
      updateGoal(newGoal); // Save goal for guest users
      alert(t("progressGoal.guestAlert"));
      setCurrentGoal(newGoal); // Update currentGoal for guest users
    }
  };

  // Function to fetch daily watch time
  const getDailyWatchTime = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetchUserActivity();
        if (response && response.dailyWatchTime) {
          setDailyWatchTime(response.dailyWatchTime[0]?.minutes || 0); // Set daily watch time
        }
      } catch (error) {
        console.error("Error fetching user activity:", error);
      }
    } else {
      setDailyWatchTime(progress);
    }
  };

  return (
    <ProgressGoal
      goal={currentGoal} // Pass the current goal
      handleSave={handleSave} // Pass the save function
      dailyWatchTime={dailyWatchTime} // Pass the daily watch time
      getDailyWatchTime={getDailyWatchTime} // Pass the fetch function
    />
  );
}

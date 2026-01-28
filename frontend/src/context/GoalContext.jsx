import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
// TODO: Implement new API - import { updateWatchTime } from "../api/video";
// TODO: Implement new API - import { changeGoal } from "../api/changeSettings";

export const GoalContext = createContext();

export default function GoalProvider({ children }) {
  const { userInfo, isAuthenticated } = useContext(AuthContext);
  const [goal, setGoal] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("guestDailyGoal"));
    if (savedData) {
      const currentTime = new Date().getTime();
      const midnight = new Date();
      midnight.setDate(midnight.getDate() + 1); // Move to the next day
      midnight.setHours(0, 0, 0, 0); // Set time to midnight
      if (currentTime > savedData.expirationTime || currentTime > midnight) {
        localStorage.removeItem("guestDailyGoal"); // Remove expired data
        return 15; // Default goal
      }
      return savedData.value;
    }
    return 15; // Default goal if no data found
  });

  const [progress, setProgress] = useState(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("guestDailyProgress"),
    );
    const currentTime = new Date().getTime();
    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 1); // Move to the next day
    midnight.setHours(0, 0, 0, 0); // Set time to midnight

    if (savedProgress) {
      if (
        currentTime > savedProgress.expirationTime ||
        currentTime > midnight
      ) {
        // Data expired, reset progress
        localStorage.setItem(
          "guestDailyProgress",
          JSON.stringify({
            value: 0,
            expirationTime: midnight.getTime(),
          }),
        );
        return 0; // Default progress is 0
      }
      return parseInt(savedProgress.value, 10); // Use saved progress
    }
    // No saved progress, initialize with 0
    localStorage.setItem(
      "guestDailyProgress",
      JSON.stringify({
        value: 0,
        expirationTime: midnight.getTime(),
      }),
    );
    return 0;
  });

  const [authProgress, setAuthProgress] = useState(0); // Default to 0
  const [authGoal, setAuthGoal] = useState(15);
  const [progressInitialized, setProgressInitialized] = useState(false);

  // Only initialize authProgress once when userInfo becomes available
  useEffect(() => {
    if (userInfo && !progressInitialized) {
      setAuthProgress(userInfo.dailyGoalCompleted || 0);
      setProgressInitialized(true);
    }
  }, [userInfo, progressInitialized]);

  useEffect(() => {
    if (userInfo) {
      setAuthGoal(userInfo.dailyGoal || 15);
    }
  }, [userInfo]);

  const updateAuthenticatedProgress = async (vidId, tabId) => {
    if (isAuthenticated && userInfo) {
      // Use functional update to avoid stale closure
      setAuthProgress((prevProgress) => {
        const newProgress = prevProgress + 2;
        return newProgress;
      });

      try {
        await updateWatchTime(vidId, tabId);
      } catch (error) {
        console.error("Error updating watch time:", error);
      }
    }
  };

  const updateAuthenticatedGoal = async (newGoal) => {
    if (isAuthenticated && userInfo) {
      try {
        const response = await changeGoal(newGoal); // Save goal for authenticated users
        alert("Goal saved successfully!");
        setAuthGoal(newGoal); // Update currentGoal after successful save
      } catch (error) {
        console.error("Error saving goal:", error);
        alert("Failed to save goal. Please try again.");
      }
    }
  };

  const updateInauthenticatedProgress = () => {
    const savedData = JSON.parse(localStorage.getItem("guestDailyProgress"));
    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 1); // Move to the next day
    midnight.setHours(0, 0, 0, 0); // Set time to midnight

    if (savedData) {
      const updatedProgress = Math.min(savedData.value + 2, goal); // Increment progress but cap it at the goal
      setProgress(updatedProgress);
      localStorage.setItem(
        "guestDailyProgress",
        JSON.stringify({
          value: updatedProgress,
          expirationTime: midnight.getTime(),
        }),
      );
    } else {
      const initialProgress = Math.min(2, goal); // Initialize progress but cap it at the goal

      localStorage.setItem(
        "guestDailyProgress",
        JSON.stringify({
          value: initialProgress,
          expirationTime: midnight.getTime(),
        }),
      );
      setProgress(initialProgress);
    }
  };

  const updateGoal = (newGoal) => {
    if (!isAuthenticated) {
      const midnight = new Date();
      midnight.setDate(midnight.getDate() + 1); // Move to the next day
      midnight.setHours(0, 0, 0, 0); // Set time to midnight

      localStorage.setItem(
        "guestDailyGoal",
        JSON.stringify({
          value: newGoal,
          expirationTime: midnight.getTime(),
        }),
      );
    }

    setGoal(newGoal); // Update state
  };

  return (
    <GoalContext.Provider
      value={{
        goal,
        updateGoal,
        progress,
        updateInauthenticatedProgress,
        authProgress,
        updateAuthenticatedProgress,
        updateAuthenticatedGoal,
        authGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

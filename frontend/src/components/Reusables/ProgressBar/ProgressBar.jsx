import { useContext, useEffect, useState } from "react";
import { GoalContext } from "../../../context/GoalContext";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function ProgressBar() {
  const { t } = useTranslation("home");
  const {
    goal,
    progress: localProgress,
    authProgress,
    authGoal,
  } = useContext(GoalContext);
  const { isAuthenticated, userInfo } = useContext(AuthContext);

  const [currentGoal, setCurrentGoal] = useState(15);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAuthenticated && userInfo) {
      setCurrentGoal(authGoal);
      setProgress(authProgress);
    } else if (!isAuthenticated) {
      setCurrentGoal(goal);
      setProgress(localProgress);
    }
  }, [isAuthenticated, userInfo, goal, localProgress, authProgress, authGoal]);

  return (
    <div className="flex space-x-4 items-center mb-4">
      <div className="flex items-center">
        <p className="font-fun text-[14px] font-normal whitespace-nowrap">
          {t("progress.todaysScore")}
        </p>
        <p className="font-fun text-[14px] font-normal ml-2 whitespace-nowrap">
          {progress}/{currentGoal} {t("progress.mins")}
        </p>
      </div>
      <div
        className="w-full h-[7px] bg-[#D9D9D9] rounded-full relative"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax={currentGoal}
      >
        <div
          className={`h-full rounded-full ${
            (progress / currentGoal) * 100 >= 100
              ? "bg-green-500"
              : "bg-orange-accent"
          }`}
          style={{
            width: `${Math.min((progress / currentGoal) * 100, 100)}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

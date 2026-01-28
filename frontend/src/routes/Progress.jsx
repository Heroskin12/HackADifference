import AltHeader from "../components/Reusables/Headers/AltHeader/AltHeader.jsx";
import Card from "../components/Pages/Progress/Card/Card";
import DonutChartContainer from "../components/Reusables/Charts/DonutChart/DonutChartContainer.jsx";
import LineChartContainer from "../components/Reusables/Charts/LineChart/LineChartContainer.jsx";
import TrophyIcon from "../assets/TrophyIcon.jsx";
import ClockIcon from "../assets/ClockIcon.jsx";
import PlayIcon from "../assets/PlayIcon.jsx";
import StatIcon from "../assets/StatIcon.jsx";
import NotLoggedInScreen from "../components/Authentication/NotLoggedInScreen/NotLoggedInScreen.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
// TODO: Implement new API - import { fetchUserActivity } from "../api/userActivity.js";
// TODO: Implement new API - import { getOutsideHours } from "../api/changeSettings.js";
import RecentActivityContainer from "../components/Pages/Progress/RecentActivity/RecentActivityContainer.jsx";
import TimelineContainer from "../components/Pages/Progress/Timeline/TimelineContainer.jsx";
import { useTranslation } from "react-i18next";

export default function Progress() {
  const [userProgressData, setUserProgressData] = useState(null);
  const { isAuthenticated, loading } = useContext(AuthContext);
  const { t } = useTranslation("progress");

  const [currentTotalMinutes, setCurrentTotalMinutes] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOutsideHours = async () => {
      try {
        const time = await getOutsideHours();
        if (time) {
          // Get the date one week ago
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

          // Filter items to only include those from the last week
          const recentTime = time.filter((item) => {
            const createdAt = new Date(item.createdAt);
            return createdAt >= oneWeekAgo;
          });

          const totalMinutes = recentTime.reduce((total, item) => {
            return total + Math.abs(item.minutes || 0);
          }, 0);
          setCurrentTotalMinutes(totalMinutes);
        } else {
          setError("No data returned");
        }
      } catch (err) {
        setError(t("errors.fetchOutsideHours") + " " + err.message);
      }
    };

    fetchOutsideHours();
  }, []);

  const getUserProgressData = async () => {
    try {
      const data = await fetchUserActivity();
      if (data) {
        setUserProgressData(data);
      } else {
        console.error(data.error || "No data available");
      }
    } catch (error) {
      console.error("Error fetching user activity:", error);
    }
  };

  useEffect(() => {
    isAuthenticated && getUserProgressData();
  }, [isAuthenticated]);

  if (loading) {
    // Show a loading state while user details are being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{t("loading")}</p>
      </div>
    );
  }

  // Helper function to format time
  const formatTime = (minutes) => {
    // Ensure minutes is a number and round to avoid decimal issues
    const totalMinutes = Math.round(Number(minutes) || 0);

    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      const minuteLabel =
        remainingMinutes === 1 ? t("timeLabels.min") : t("timeLabels.mins");
      return `${hours} ${t(
        "timeLabels.hrs",
      )} ${remainingMinutes} ${minuteLabel}`;
    }
    const minuteLabel =
      totalMinutes === 1 ? t("timeLabels.min") : t("timeLabels.mins");
    return `${totalMinutes} ${minuteLabel}`;
  };

  const calculateAverageMinutes = (dailyWatchTime) => {
    if (!dailyWatchTime || dailyWatchTime.length === 0) {
      return 0; // Return 0 if the array is empty or undefined
    }

    const totalMinutes = dailyWatchTime.reduce(
      (sum, item) => sum + item.minutes,
      0,
    );
    const averageMinutes = totalMinutes / dailyWatchTime.length;

    return Math.ceil(averageMinutes); // Round up to the nearest whole number
  };

  return (
    <div className="z-1">
      <div>
        <AltHeader />
      </div>
      <h1 className="flex font-fun font-bold text-[clamp(34px,5vw,48px)] whitespace-nowrap p-4">
        {t("title")}
      </h1>

      {isAuthenticated ? (
        <>
          {/* Card Section */}
          <div>
            <div className="card-bar flex flex-nowrap md:flex-wrap gap-4 overflow-x-auto scrollbar-hide px-4">
              <div className="flex-shrink-0 w-64 bg-yellow-accent rounded-md">
                <Card
                  title={t("cards.currentLevel.title")}
                  icon={TrophyIcon}
                  stat={`${
                    userProgressData?.currentLevel?.name?.split(" ")[0] || "A0"
                  }`}
                  subText={`${t("cards.currentLevel.nextLevel")} ${
                    (userProgressData?.currentLevel?.minutesToNextLevel &&
                      formatTime(
                        userProgressData?.currentLevel?.minutesToNextLevel,
                      )) ||
                    t("cards.currentLevel.maxLevel")
                  }`}
                />
              </div>
              <div className="flex-shrink-0 w-64 bg-[#D9BCFF] rounded-md">
                <Card
                  title={t("cards.totalWatchTime.title")}
                  icon={ClockIcon}
                  stat={formatTime(
                    userProgressData?.totalTimeVideo?.totalWatchTime || 0,
                  )}
                  subText={
                    <>
                      +{" "}
                      {formatTime(
                        userProgressData?.totalTimeVideo?.watchTimeThisWeek,
                      )}{" "}
                      {t("cards.totalWatchTime.thisWeek")}
                      <br />
                      {t("cards.totalWatchTime.outsideHours")}{" "}
                      {Math.floor(currentTotalMinutes / 60)}{" "}
                      {t("timeLabels.hrs")} {currentTotalMinutes % 60}{" "}
                      {t("timeLabels.mins")}
                    </>
                  }
                />
              </div>
              <div className="flex-shrink-0 w-64 bg-[#BEE6FF] rounded-md">
                <Card
                  title={t("cards.videosWatched.title")}
                  icon={PlayIcon}
                  stat={`${
                    userProgressData?.totalTimeVideo?.totalVideosWatched || 0
                  }`}
                  subText={`+ ${
                    userProgressData?.totalTimeVideo?.videosWatchedThisWeek
                  } ${t("cards.videosWatched.thisWeek")}`}
                />
              </div>
              <div className="flex-shrink-0 w-64 bg-dark-primary rounded-md">
                <Card
                  title={t("cards.avgDailyTime.title")}
                  icon={StatIcon}
                  stat={
                    userProgressData?.dailyWatchTime?.length > 0
                      ? formatTime(
                          calculateAverageMinutes(
                            userProgressData.dailyWatchTime,
                          ),
                        )
                      : `0 ${t("timeLabels.hrs")}`
                  }
                  subText={`${t("cards.avgDailyTime.inLast")} 30 ${t(
                    "cards.avgDailyTime.days",
                  )}`}
                  textColor="text-light-primary"
                />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="flex lg:flex-row flex-col transition-all duration-300 md:p-4 p-1 gap-x-1 chart-container">
            <div className="flex-1">
              <DonutChartContainer
                categoryData={userProgressData?.watchTimeByCategory || []}
              />
            </div>
            <div className="flex-1">
              <LineChartContainer
                dailyWatchTimeData={userProgressData?.dailyWatchTime || []}
              />
            </div>
          </div>
          <TimelineContainer currentLevel={userProgressData?.currentLevel} />
          <RecentActivityContainer
            recentActivityData={userProgressData?.recentActivity || []}
          />
        </>
      ) : (
        <NotLoggedInScreen />
      )}
    </div>
  );
}

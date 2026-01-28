import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Card from "../components/Pages/Progress/Card/Card";
import DonutChartContainer from "../components/Reusables/Charts/DonutChart/DonutChartContainer.jsx";
import LineChartContainer from "../components/Reusables/Charts/LineChart/LineChartContainer.jsx";
import TimelineContainer from "../components/Pages/Progress/Timeline/TimelineContainer.jsx";
import RecentActivityContainer from "../components/Pages/Progress/RecentActivity/RecentActivityContainer.jsx";
import TrophyIcon from "../assets/TrophyIcon.jsx";
import ClockIcon from "../assets/ClockIcon.jsx";
import PlayIcon from "../assets/PlayIcon.jsx";
import StatIcon from "../assets/StatIcon.jsx";

export default function Progress() {
  const { t } = useTranslation("progress");
  const { isAuthenticated, userInfo } = useContext(AuthContext);

  // Dummy data for demo
  const userProgressData = {
    currentLevel: { name: "B1 Intermediate", minutesToNextLevel: 120 },
    totalTimeVideo: {
      totalWatchTime: 540,
      watchTimeThisWeek: 120,
      totalVideosWatched: 42,
      videosWatchedThisWeek: 5,
    },
    dailyWatchTime: [
      { date: "2026-01-21", minutes: 30 },
      { date: "2026-01-22", minutes: 20 },
      { date: "2026-01-23", minutes: 40 },
      { date: "2026-01-24", minutes: 10 },
      { date: "2026-01-25", minutes: 60 },
      { date: "2026-01-26", minutes: 15 },
      { date: "2026-01-27", minutes: 25 },
    ],
    watchTimeByCategory: [
      { topic: "Speaking", minutes: 120 },
      { topic: "Listening", minutes: 180 },
      { topic: "Pronunciation", minutes: 90 },
      { topic: "Grammar", minutes: 150 },
    ],
    recentActivity: [
      {
        id: 1,
        title: "Watched 'How to Learn English Fast!'",
        createdAt: "2026-01-27T10:00:00Z",
      },
      {
        id: 2,
        title: "Completed 'Business English Series'",
        createdAt: "2026-01-26T15:30:00Z",
      },
      {
        id: 3,
        title: "Watched 'Mastering English Pronunciation'",
        createdAt: "2026-01-25T09:20:00Z",
      },
    ],
  };

  const formatTime = (minutes) => {
    const totalMinutes = Math.round(Number(minutes) || 0);
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${totalMinutes}m`;
  };

  const calculateAverageMinutes = (dailyWatchTime) => {
    if (!dailyWatchTime || dailyWatchTime.length === 0) return 0;
    const totalMinutes = dailyWatchTime.reduce(
      (sum, item) => sum + item.minutes,
      0,
    );
    return Math.ceil(totalMinutes / dailyWatchTime.length);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <h1 className="text-2xl font-fun font-bold mt-10">
          {t("progressRemoved", "Progress tracking is disabled in this demo.")}
        </h1>
      </div>
    );
  }

  return (
    <div className="z-1">
      <h1 className="flex font-fun font-bold text-[clamp(34px,5vw,48px)] whitespace-nowrap p-4">
        {t("title", "Your Progress")}
      </h1>
      {/* Card Section */}
      <div>
        <div className="card-bar flex flex-nowrap md:flex-wrap gap-4 overflow-x-auto scrollbar-hide px-4">
          <div className="flex-shrink-0 w-64 bg-yellow-accent rounded-md">
            <Card
              title={t("cards.currentLevel.title", "Current Level")}
              icon={TrophyIcon}
              stat={`${userProgressData.currentLevel.name.split(" ")[0]}`}
              subText={`${t("cards.currentLevel.nextLevel", "To next level")}: ${formatTime(userProgressData.currentLevel.minutesToNextLevel)}`}
            />
          </div>
          <div className="flex-shrink-0 w-64 bg-[#D9BCFF] rounded-md">
            <Card
              title={t("cards.totalWatchTime.title", "Total Watch Time")}
              icon={ClockIcon}
              stat={formatTime(userProgressData.totalTimeVideo.totalWatchTime)}
              subText={`+${formatTime(userProgressData.totalTimeVideo.watchTimeThisWeek)} ${t("cards.totalWatchTime.thisWeek", "this week")}`}
            />
          </div>
          <div className="flex-shrink-0 w-64 bg-[#BEE6FF] rounded-md">
            <Card
              title={t("cards.videosWatched.title", "Videos Watched")}
              icon={PlayIcon}
              stat={`${userProgressData.totalTimeVideo.totalVideosWatched}`}
              subText={`+${userProgressData.totalTimeVideo.videosWatchedThisWeek} ${t("cards.videosWatched.thisWeek", "this week")}`}
            />
          </div>
          <div className="flex-shrink-0 w-64 bg-dark-primary rounded-md">
            <Card
              title={t("cards.avgDailyTime.title", "Avg Daily Time")}
              icon={StatIcon}
              stat={formatTime(
                calculateAverageMinutes(userProgressData.dailyWatchTime),
              )}
              subText={`${t("cards.avgDailyTime.inLast", "in last")} 7 ${t("cards.avgDailyTime.days", "days")}`}
              textColor="text-light-primary"
            />
          </div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="flex lg:flex-row flex-col transition-all duration-300 md:p-4 p-1 gap-x-1 chart-container">
        <div className="flex-1">
          <DonutChartContainer
            categoryData={userProgressData.watchTimeByCategory}
          />
        </div>
        <div className="flex-1">
          <LineChartContainer
            dailyWatchTimeData={userProgressData.dailyWatchTime}
          />
        </div>
      </div>
      <TimelineContainer currentLevel={userProgressData.currentLevel} />
      <RecentActivityContainer
        recentActivityData={userProgressData.recentActivity}
      />
    </div>
  );
}

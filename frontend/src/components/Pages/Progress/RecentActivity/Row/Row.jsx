import { act } from "react";
import CameraIcon from "../../../../../assets/CameraIcon";
import TrophyIcon from "../../../../../assets/TrophyIcon";
import BookIcon from "../../../../../assets/BookIcon";
import { useTranslation } from "react-i18next";

function getRelativeTime(createdAt, t, i18n) {
  const now = new Date();
  const activityDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - activityDate) / 1000);

  const timeUnits = [
    { unit: "year", seconds: 60 * 60 * 24 * 365 },
    { unit: "month", seconds: 60 * 60 * 24 * 30 },
    { unit: "week", seconds: 60 * 60 * 24 * 7 },
    { unit: "day", seconds: 60 * 60 * 24 },
    { unit: "hour", seconds: 60 * 60 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of timeUnits) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return new Intl.RelativeTimeFormat(i18n.language, {
        numeric: "auto",
      }).format(-value, unit);
    }
  }

  return t("activity.justNow");
}

const convertMinutesToHoursAndMinutes = (totalMinutes, t) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  if (hours === 0) {
    return `${minutes} ${
      minutes !== 1
        ? t("activity.timeUnits.minutes")
        : t("activity.timeUnits.minute")
    }`;
  } else if (minutes === 0) {
    return `${hours} ${
      hours !== 1 ? t("activity.timeUnits.hours") : t("activity.timeUnits.hour")
    }`;
  } else {
    return `${hours} ${
      hours !== 1 ? t("activity.timeUnits.hours") : t("activity.timeUnits.hour")
    } ${minutes} ${
      minutes !== 1
        ? t("activity.timeUnits.minutes")
        : t("activity.timeUnits.minute")
    }`;
  }
};

export default function Row({ activity }) {
  const { t, i18n } = useTranslation("progress");
  return (
    <>
      {activity.eventType === "video_watched" && (
        <div className="flex flex-col gap-y-3 mb-3">
          <div className="flex flex-row w-full items-center">
            <div className="bg-[#E5E7EB] w-[60px] h-[60px] items-center rounded-md justify-center flex">
              <CameraIcon />
            </div>
            <div className="flex flex-col w-full px-2">
              <h2 className="text-[16px] font-semibold">
                {activity.videoTitle
                  ? activity.videoTitle
                  : t("activity.videoRemoved")}
              </h2>
              <div className="flex flex-row justify-between items-center w-full">
                <p className="text-text-secondary text-[14px]">
                  {t("activity.watched")} • {activity.timeSpent} min
                </p>
                <p className="text-text-secondary text-[14px]">
                  {getRelativeTime(activity.createdAt, t, i18n)}
                </p>
              </div>
            </div>
          </div>
          <hr className="flex-grow border-[#E5E7EB]" />
        </div>
      )}
      {activity.eventType === "level_up" && (
        <div className="flex flex-col gap-y-3 mb-3">
          <div className="flex flex-row w-full items-center">
            <div className="bg-[#E5E7EB] w-[60px] h-[60px] items-center rounded-md justify-center flex">
              <TrophyIcon />
            </div>
            <div className="flex flex-col w-full px-2">
              <h2 className="text-[16px] font-semibold">
                {activity.levelName
                  ? t("activity.promotedTo", { level: activity.levelName })
                  : t("activity.levelRemoved")}
                !
              </h2>
              <div className="flex flex-row justify-between items-center w-full">
                <p className="text-text-secondary text-[14px]">
                  {t("activity.levelUp")}
                </p>
                <p className="text-text-secondary text-[14px]">
                  {getRelativeTime(activity.createdAt, t, i18n)}
                </p>
              </div>
            </div>
          </div>
          <hr className="flex-grow border-[#E5E7EB]" />
        </div>
      )}
      {activity.eventType === "manual_activity" && (
        <div className="flex flex-col gap-y-3 mb-3">
          <div className="flex flex-row w-full items-center">
            <div className="bg-[#E5E7EB] w-[60px] h-[60px] items-center rounded-md justify-center flex">
              <BookIcon />
            </div>
            <div className="flex flex-col w-full px-2">
              <h2 className="text-[16px] font-semibold">
                {activity.manualDescription
                  ? activity.manualDescription
                  : t("activity.outsideHoursAdded")}
              </h2>
              <div className="flex flex-row justify-between items-center w-full">
                <p className="text-text-secondary text-[14px]">
                  {t("activity.loggedOutsideHours")} •{" "}
                  {convertMinutesToHoursAndMinutes(activity.minutes, t)}
                </p>
                <p className="text-text-secondary text-[14px]">
                  {getRelativeTime(activity.createdAt, t, i18n)}
                </p>
              </div>
            </div>
          </div>
          <hr className="flex-grow border-[#E5E7EB]" />
        </div>
      )}
    </>
  );
}

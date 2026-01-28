import { useEffect, useState } from "react";
import OutsideHours from "./OutsideHours";
// TODO: Implement new API - import { getOutsideHours, updateOutsideHours } from "../../../api/changeSettings";

export default function OutsideHoursContainer() {
  const [currentOutsideHours, setCurrentOutsideHours] =
    useState("0 hours 0 minutes");
  const [currentTotalMinutes, setCurrentTotalMinutes] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedTime, setLastAddedTime] = useState(null);

  const convertMinutesToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    if (hours === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else if (minutes === 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
        minutes !== 1 ? "s" : ""
      }`;
    }
  };

  useEffect(() => {
    const fetchOutsideHours = async () => {
      try {
        const time = await getOutsideHours();
        if (time) {
          // Sum up all the minutes from each array item
          const totalMinutes = time.reduce((total, item) => {
            return total + Math.abs(item.minutes || 0);
          }, 0);

          setCurrentTotalMinutes(totalMinutes);

          const displayString = convertMinutesToHoursAndMinutes(totalMinutes);

          setCurrentOutsideHours(displayString);
        } else {
          setError("No data returned");
        }
      } catch (err) {
        setError("Failed to fetch outside hours: " + err.message);
      }
    };

    fetchOutsideHours();
  }, []);

  const handleSave = async (outsideHoursData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateOutsideHours(outsideHoursData);

      if (result.success) {
        // Refetch the actual current total from the server
        const updatedTime = await getOutsideHours();
        if (updatedTime) {
          // Sum up all the minutes from each array item
          const newTotalMinutes = updatedTime.reduce((total, item) => {
            return total + Math.abs(item.minutes || 0);
          }, 0);

          setCurrentTotalMinutes(newTotalMinutes);
          setCurrentOutsideHours(
            convertMinutesToHoursAndMinutes(newTotalMinutes),
          );
        }

        setLastAddedTime(
          convertMinutesToHoursAndMinutes(outsideHoursData.minutes),
        );
        setShowSuccess(true);
        setError(null);

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to update outside hours: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OutsideHours
      handleSave={handleSave}
      currentOutsideHours={currentOutsideHours}
      currentTotalMinutes={currentTotalMinutes}
      error={error}
      isLoading={isLoading}
      showSuccess={showSuccess}
      lastAddedTime={lastAddedTime}
    />
  );
}

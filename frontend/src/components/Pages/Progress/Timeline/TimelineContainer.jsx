import Timeline from "./Timeline";
// TODO: Implement new API - import { fetchTimelineData } from "../../../../api/timeline.js";
import { useEffect, useState } from "react";

export default function TimelineContainer({ currentLevel }) {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    getTimelineData();
  }, []);

  const getTimelineData = async () => {
    try {
      const data = await fetchTimelineData();
      if (data) {
        // TEMPORARY FIX: Add B1.5 and C1 levels until backend is updated
        const enhancedData = [...data];

        // Find the highest existing ID to avoid conflicts
        const maxId = Math.max(...data.map((item) => item.id || 0));

        // Check if B1.5 already exists in backend data
        const hasB15 = data.some(
          (item) => item.name === "B1.5 Upper-Intermediate",
        );
        if (!hasB15) {
          enhancedData.splice(4, 0, {
            id: maxId + 1,
            name: "B1.5 Upper-Intermediate",
            description:
              "Bridging the gap between intermediate and advanced English.",
          });
        }

        // Check if C1 already exists in backend data
        const hasC1 = data.some((item) => item.name === "C1 Advanced");
        if (!hasC1) {
          enhancedData.push({
            id: maxId + 2,
            name: "C1 Advanced",
            description: "Achieving near-native proficiency in English.",
          });
        }

        setTimelineData(enhancedData);
      } else {
        console.error(data.error || "No data available");
      }
    } catch (error) {
      console.error("Error fetching user activity:", error);
    }
  };
  return (
    <>
      {timelineData && (
        <Timeline data={timelineData} currentLevel={currentLevel} />
      )}
    </>
  );
}

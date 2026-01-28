import RecentActivity from "./RecentActivity";

export default function RecentActivityContainer({ recentActivityData }) {
  // Sort the data in descending order based on createdAt
  const sortedActivityData = [...recentActivityData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return <RecentActivity recentActivityData={sortedActivityData} />;
}

import ManageMembership from "./ManageMembership";
// TODO: Implement new API - import { fetchManageSubscriptionLink } from "../../../../../api/membership";
export default function ManageMembershipContainer({ membership }) {
  const cancelMembership = async () => {
    try {
      const data = await fetchManageSubscriptionLink();
      return data.sessionUrl;
    } catch (error) {
      console.error("Failed to fetch manage subscription link:", error);
      return null;
    }
  };
  return (
    <div>
      <ManageMembership
        membership={membership}
        cancelMembership={cancelMembership}
      />
    </div>
  );
}

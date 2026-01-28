import ManageMembership from "./ManageMembership";
// TODO: Implement new API - import { fetchManageSubscriptionLink } from "../../../../../api/membership";
export default function ManageMembershipContainer({ membership }) {
  // All payment actions are now dummy
  const cancelMembership = async () => {
    alert("Cancel Membership (UI only, no backend)");
    return null;
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

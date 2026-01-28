export default function LogoutIcon({ active }) {
  const classes = active ? "stroke-dark-primary" : "stroke-light-primary";
  return (
    <div className="group">
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 18.3333H35.3333M35.3333 18.3333L29.0833 12.0833M35.3333 18.3333L29.0833 24.5833"
          className={`stroke-[3.125px] ${classes} group-hover:stroke-text-secondary`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 18.3333C2 13.913 3.75595 9.67379 6.88155 6.54818C10.0072 3.42257 14.2464 1.66663 18.6667 1.66663M18.6667 35C16.168 35.0015 13.7011 34.4404 11.4488 33.3585C9.19653 32.2765 7.21674 30.7014 5.65625 28.75"
          className={`stroke-[3.125px] ${classes} group-hover:stroke-text-secondary`}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function UserIcon({ active }) {
  const classes = active ? "stroke-dark-primary" : "stroke-light-primary";
  return (
    <div className="group">
      <svg
        width="31"
        height="30"
        viewBox="0 0 31 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 25.2915C2 23.5013 2.71116 21.7844 3.97703 20.5185C5.24289 19.2527 6.95978 18.5415 8.74999 18.5415H22.25C24.0402 18.5415 25.7571 19.2527 27.0229 20.5185C28.2888 21.7844 29 23.5013 29 25.2915C29 26.1866 28.6444 27.045 28.0114 27.678C27.3785 28.3109 26.5201 28.6665 25.625 28.6665H5.37499C4.47989 28.6665 3.62145 28.3109 2.98851 27.678C2.35558 27.045 2 26.1866 2 25.2915Z"
          className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
          strokeLinejoin="round"
        />
        <path
          d="M15.5 11.7916C18.2959 11.7916 20.5625 9.52506 20.5625 6.72912C20.5625 3.93318 18.2959 1.66663 15.5 1.66663C12.7041 1.66663 10.4375 3.93318 10.4375 6.72912C10.4375 9.52506 12.7041 11.7916 15.5 11.7916Z"
          className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
        />
      </svg>
    </div>
  );
}

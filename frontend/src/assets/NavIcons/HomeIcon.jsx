export default function HomeIcon({ active }) {
  const classes = active ? "stroke-dark-primary" : "stroke-light-primary";
  return (
    <div className="group">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18.925V22.975M28.5 15.1504V17.2038C28.5 22.4688 28.5 25.1026 26.9178 26.7388C25.3356 28.375 22.7909 28.375 17.7 28.375H12.3C7.20915 28.375 4.66305 28.375 3.0822 26.7388C1.50135 25.1026 1.5 22.4701 1.5 17.2038V15.1504C1.5 12.0603 1.5 10.5159 2.202 9.23605C2.9013 7.9549 4.18245 7.1611 6.7434 5.5708L9.4434 3.89545C12.1502 2.2147 13.5042 1.375 15 1.375C16.4958 1.375 17.8485 2.2147 20.5566 3.89545L23.2566 5.5708C25.8175 7.1611 27.0987 7.9549 27.7994 9.23605"
          strokeLinecap="round"
          className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
        />
      </svg>
    </div>
  );
}

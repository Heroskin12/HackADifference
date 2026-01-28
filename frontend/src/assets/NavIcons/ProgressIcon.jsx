export default function ProgressIcon({ active }) {
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
        <g filter="url(#filter0_d_27_959)">
          <path
            d="M8.75 17.5751L11.176 14.6645C12.1372 13.5102 12.6178 12.9338 13.2496 12.9338C13.8827 12.9338 14.3633 13.5102 15.3245 14.6645L15.6755 15.0857C16.6367 16.2399 17.1173 16.8164 17.7505 16.8164C18.3836 16.8164 18.8629 16.2399 19.8241 15.0857L22.25 12.175"
            strokeLinecap="round"
            shapeRendering="crispEdges"
            className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
          />
        </g>
        <path
          d="M29 14.875C29 21.2389 29 24.4209 27.0223 26.3973C25.0472 28.375 21.8639 28.375 15.5 28.375C9.13611 28.375 5.95416 28.375 3.9764 26.3973C2 24.4222 2 21.2389 2 14.875C2 8.51111 2 5.32916 3.9764 3.3514C5.95551 1.375 9.13611 1.375 15.5 1.375C21.8639 1.375 25.0459 1.375 27.0223 3.3514C28.3372 4.6663 28.7773 6.51446 28.9258 9.47501"
          strokeLinecap="round"
          className={`stroke-[2.5px] ${classes} group-hover:stroke-text-secondary`}
        />
        <defs>
          <filter
            id="filter0_d_27_959"
            x="3.5"
            y="10.925"
            width="24"
            height="15.9001"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_27_959"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_27_959"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import SearchIcon from "../../../assets/SearchIcon";
import CloseIcon from "../../../assets/CloseIcon";
import { useTranslation } from "react-i18next";

export default function MobileSearch({
  active,
  onSearchChange,
  closeSearchHandler,
}) {
  const { t } = useTranslation("home");
  const inputRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (active) {
      setAnimate(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setTimeout(() => setAnimate(false), 400); // Match the CSS transition duration
    }
  }, [active]);

  const handleInputChange = (event) => {
    onSearchChange(event.target.value); // Update the search query in context
  };

  return (
    <div
      className={` pl-4 flex items-center justify-start overflow-hidden relative transition-all duration-400 ease-in-out`}
    >
      <div
        className={` transition-all duration-400 ease-in-out ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <input
          type="text"
          onChange={handleInputChange}
          placeholder={t("search.placeholder")}
          className="h-[42px] p-[10px] pr-12 rounded-md bg-light-primary text-dark-primary placeholder-gray-500 focus:outline-none border border-dark-primary transition-all duration-400 ease-in-out font-primary placeholder:font-fun"
          style={{
            width: "calc(100vw - 48px)", // Adjust width to account for padding
            maxWidth: "100vw",

            margin: 0,
          }}
        />
        <div
          className="absolute w-[30px] h-[30px] rounded-[7px] right-3 top-1/2 -translate-y-1/2 bg-orange-accent flex items-center justify-center cursor-pointer"
          onClick={closeSearchHandler}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

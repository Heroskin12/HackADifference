import MobileSearchContainer from "../../Search/MobileSearchContainer";
import LogoBar from "../../Logo/LogoBar";
import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../../../../context/AuthContext.jsx";
export default function MobileHeader() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const searchClickHandler = () => {
    setActive((prev) => !prev);
  };

  return (
    <>
      {/* Top row of header. */}
      <div className="flex items-center justify-between px-4">
        <LogoBar />
      </div>

      <div className="px-4">
        <div
          className={` mb-2 flex ${
            active ? "flex-col" : "justify-between items-center"
          }`}
        >
          {location.pathname == "/" && (
            <>
              <h1 className="font-fun font-bold text-[28px] whitespace-nowrap">
                Latest Videos
              </h1>

              <MobileSearchContainer
                clickHandler={searchClickHandler}
                setActive={setActive}
                active={active}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

import UserIconSmall from "../../../../assets/UserIconSmall";
import GridButton from "../../../Reusables/Buttons/GridButton";
import LockIcon from "../../../../assets/LockIcon";
import { memo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ModalContext } from "../../../Reusables/Modal/ModalContext";
import { AuthContext } from "../../../../context/AuthContext";

const GridItem = memo(({ item }) => {
  const { id, title, guide, link, level, accent, topics, locked } = item;
  const [src, setSrc] = useState("");
  const { openModal } = useContext(ModalContext);
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const { t } = useTranslation("home");

  const navigate = useNavigate();

  const handleClick = () => {
    // Always go to dummy post page with dummy data
    navigate("/post/dummy");
  };

  useEffect(() => {
    const testImage = new Image();
    const maxRes = `https://i.ytimg.com/vi/${link}/maxresdefault.jpg`;
    const fallback = `https://i.ytimg.com/vi/${link}/hqdefault.jpg`;

    testImage.onload = () => {
      // YouTube's placeholder maxres images are usually very small (like 120x90)
      if (testImage.naturalWidth <= 120) {
        setSrc(fallback);
      } else {
        setSrc(maxRes);
      }
    };

    testImage.onerror = (e) => {
      // If it truly errors (rare), fallback
      e.preventDefault();
      setSrc(fallback);
    };

    testImage.src = maxRes;
  }, [link]);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
    >
      <div
        className="bg-blue relative"
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
      >
        {src ? ( // Only render the <img> tag if src is not null
          <img
            className="w-full h-full object-cover"
            src={src}
            alt={`Thumbnail for the video called ${title}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" /> // Placeholder while loading
        )}
        {locked && (
          <>
            <div
              className="absolute inset-0 z-20"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            ></div>
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <LockIcon className="w-16 h-16 text-white" />
            </div>
          </>
        )}
      </div>
      <h1 className="font-fun font-bold text-[18px]">{title}</h1>
      <div className="flex items-center space-x-1">
        <UserIconSmall className="align-bottom" />
        <p className="text-secondary font-fun text-sm">
          {guide || "Unknown Creator"}
        </p>
      </div>
      <div className="space-x-[8px] mt-1">
        {level && <GridButton color="green">{level}</GridButton>}
        {accent && <GridButton color="red">{accent}</GridButton>}
        {topics && <GridButton color="yellow">{topics.join(", ")}</GridButton>}
      </div>
    </div>
  );
});

export default GridItem;

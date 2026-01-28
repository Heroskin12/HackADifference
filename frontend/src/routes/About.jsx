import AltHeader from "../components/Reusables/Headers/AltHeader/AltHeader.jsx";
import MethodArticle from "../components/Pages/About/MethodArticle.jsx";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation("about");
  return (
    <>
      <AltHeader />
      <div className="p-4">
        <h1 className="font-fun font-semibold text-[36px]">
          {t("video.title")}
        </h1>
        <p className="font-primary text-text-secondary pb-4">
          {t("video.subtitle")}
        </p>
        <div
          className="relative w-full"
          style={{
            maxHeight: "70vh", // Cap the height to 60% of the viewport height
            aspectRatio: "16 / 9", // Maintain 16:9 aspect ratio
          }}
        >
          <iframe
            id="method-player-youtube"
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/PpGlq3QOgE0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="How To Learn English: Don't Memorise Vocabulary! (Use This Method Instead)"
          ></iframe>
        </div>
        <div className="py-2">
          <MethodArticle />
        </div>
      </div>
    </>
  );
}

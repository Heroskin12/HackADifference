import { useParams, useNavigate } from "react-router";
import Header from "../components/Reusables/Headers/AltHeader/AltHeader";
import { useEffect, useState, useContext } from "react";
import { mockSeries, mockVideos } from "../api/mockData";
import GridButton from "../components/Reusables/Buttons/GridButton";
import UserIconSmall from "../assets/UserIconSmall";
import LockIcon from "../assets/LockIcon";
import { AuthContext } from "../context/AuthContext";
import { ModalContext } from "../components/Reusables/Modal/ModalContext";
import { useTranslation } from "react-i18next";
export default function Series() {
  const { id } = useParams(); // Get the series id from the URL
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation("series");
  const [loading, setLoading] = useState(true);
  const [seriesVideos, setSeriesVideos] = useState(null);
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [thumbnailSrcs, setThumbnailSrcs] = useState({}); // Store thumbnail sources by video ID

  // Handle video click
  const handleVideoClick = (video, e) => {
    e.preventDefault();
    // Always go to dummy post page with dummy data
    navigate("/post/dummy");
  };

  // Function to get the best available YouTube thumbnail
  const getThumbnail = (videoLink, videoId) => {
    if (!videoLink) return "";

    // Handle YouTube thumbnails
    const maxRes = `https://img.youtube.com/vi/${videoLink}/maxresdefault.jpg`;
    const fallback = `https://img.youtube.com/vi/${videoLink}/hqdefault.jpg`;

    const testImage = new Image();

    testImage.onload = () => {
      // YouTube's placeholder maxres images are usually very small (like 120x90)
      if (testImage.naturalWidth <= 120) {
        setThumbnailSrcs((prev) => ({ ...prev, [videoId]: fallback }));
      } else {
        setThumbnailSrcs((prev) => ({ ...prev, [videoId]: maxRes }));
      }
    };

    testImage.onerror = (e) => {
      // If it truly errors (rare), fallback
      e.preventDefault();
      setThumbnailSrcs((prev) => ({ ...prev, [videoId]: fallback }));
    };

    testImage.src = maxRes;

    // Return fallback as default while testing
    return fallback;
  };

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    // Find the series details by id
    const foundSeries = mockSeries.find((s) => String(s.id) === String(id));
    setSeriesDetails(foundSeries || null);
    // For demo, use mockVideos that match the series guide or just all videos
    // (You can adjust this logic as needed)
    const videos = mockVideos.filter((v) =>
      foundSeries ? v.guide === foundSeries.guide : true,
    );
    setSeriesVideos(videos);
    setLoading(false);
  }, [id]);

  // Test thumbnails when series videos are available
  useEffect(() => {
    if (seriesVideos) {
      seriesVideos.forEach((video) => {
        getThumbnail(video.link, video.id);
      });
    }
  }, [seriesVideos]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen-bg-white">
        <Header />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>
        <div className="pt-4 px-4 pb-12 max-w-7xl mx-auto">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold p-2 pb-0 text-center">
              {seriesDetails?.name || t("fallbackTitle")}
            </h1>
            {seriesDetails?.description && (
              <p className="p-2 text-center max-w-3xl font-primary">
                {seriesDetails.description}
              </p>
            )}
            <ul className="p-2 flex gap-2">
              <li className="font-primary">
                {t("videoCount", { count: seriesVideos?.length || 0 })}
              </li>
            </ul>
          </div>
          <div className="mt-4 p-2 rounded-sm">
            <h1 className="font-heading text-xl sm:text-2xl font-bold mb-3 p-2 text-center sm:text-left">
              {t("allVideosTitle")}
            </h1>
            <div className="space-y-2">
              {seriesVideos?.map((video, index) => (
                <div
                  key={video.id}
                  onClick={(e) => handleVideoClick(video, e)}
                  className={`group flex flex-col sm:flex-row gap-3 p-3 rounded mb-4 cursor-pointer ${
                    index % 2 === 0 ? "bg-white shadow-sm" : "bg-gray-100"
                  } hover:bg-text-field`}
                >
                  <div className="w-full sm:w-72 h-48 sm:h-40 bg-gray-300 rounded-2xl flex-shrink-0 overflow-hidden relative">
                    <img
                      src={
                        thumbnailSrcs[video.id] ||
                        `https://img.youtube.com/vi/${video.link}/hqdefault.jpg`
                      }
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {video.locked && (
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
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-fun font-bold line-clamp-2 break-words">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <UserIconSmall className="align-bottom" />
                      <p className="font-primary text-secondary">
                        {video.guide || t("unknownCreator")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {video.level && (
                        <GridButton color="green">{video.level}</GridButton>
                      )}
                      {video.accent && (
                        <GridButton color="red">{video.accent}</GridButton>
                      )}
                      {video.topics && (
                        <GridButton color="yellow">
                          {video.topics.join(", ")}
                        </GridButton>
                      )}
                    </div>
                    <div>
                      {video.description && (
                        <p className="break-words text-sm sm:text-base font-primary">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

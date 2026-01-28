import { useParams, Link, useNavigate } from "react-router";
import Header from "../components/Reusables/Headers/AltHeader/AltHeader";
import UserIconSmall from "../assets/UserIconSmall";
import GridButton from "../components/Reusables/Buttons/GridButton";
import LockIcon from "../assets/LockIcon";
// TODO: Implement new API - import { fetchVideoDetails } from "../api/video";
import { useEffect, useState, useContext } from "react";
// Dummy data for the post page
const DUMMY_VIDEO = {
  id: "dummy",
  title: "How to Learn English Fast! (Demo)",
  guide: "Jane Doe",
  link: "dQw4w9WgXcQ",
  level: "Beginner",
  accent: "US",
  topics: ["Speaking", "Listening"],
  locked: false,
  description:
    "This is a demo video page using a real YouTube video. All data is hardcoded for demonstration purposes.",
};
import YoutubeVideo from "../components/YoutubeVideo";
// TODO: Implement new API - import { fetchSeriesVideosById } from "../api/series";
import { AuthContext } from "../context/AuthContext";
import { ModalContext } from "../components/Reusables/Modal/ModalContext";
import { useTranslation } from "react-i18next";

export default function Post() {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation("video");
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [isSeries, setIsSeries] = useState(true); // Default to true for testing
  const [seriesData, setSeriesData] = useState(null);
  const [thumbnailSrcs, setThumbnailSrcs] = useState({}); // Store thumbnail sources by video ID

  // Handle video click
  const handleSeriesVideoClick = (video, e) => {
    e.preventDefault();

    // Check if video is locked
    if (video.locked) {
      if (!isAuthenticated) {
        // Show login modal for unauthenticated users
        openModal("login", { isPremiumContent: true });
        return;
      } else {
        // Show subscribe modal for authenticated users
        openModal("subscribe");
        return;
      }
    }

    // Navigate to the video
    navigate(`/post/${video.id}`);
  };

  // Function to get the best available YouTube thumbnail
  const getThumbnail = (videoLink, videoId) => {
    if (!videoLink) return "";

    // Handle YouTube thumbnails
    const maxRes = `https://i.ytimg.com/vi/${videoLink}/maxresdefault.jpg`;
    const fallback = `https://i.ytimg.com/vi/${videoLink}/hqdefault.jpg`;

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

  // Fetches the video data once.
  useEffect(() => {
    if (id === "dummy") {
      setVideoDetails(DUMMY_VIDEO);
      setIsSeries(false);
      setLoading(false);
    } else {
      // fallback: show loading or error for non-dummy
      setVideoDetails(null);
      setIsSeries(false);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const fetchSeries = async () => {
      if (videoDetails?.series) {
        try {
          const series = await fetchSeriesVideosById(videoDetails.series);
          setSeriesData(series);
        } catch (error) {
          console.error("Error fetching series data:", error);
        }
      }
    };
    fetchSeries();
  }, [videoDetails, isAuthenticated, userInfo]);

  // Test thumbnails when series data is available
  useEffect(() => {
    if (seriesData) {
      seriesData
        .filter((video) => video.id !== parseInt(id))
        .slice(0, 3)
        .forEach((video) => {
          getThumbnail(video.link, video.id);
        });
    }
  }, [seriesData, id]);

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

        {/* Main content area with responsive layout */}
        <div className="flex flex-col lg:flex-row lg:gap-6 lg:px-6">
          {/* Video and content section */}
          <div className="flex-1 lg:min-w-0">
            <YoutubeVideo
              vidId={id}
              link={videoDetails.link}
              tabId={videoDetails.tabId}
            />

            <div className="md:pt-4 md:pe-4 pb-12 md:pl-6 pe-2 pl-2 lg:pl-0 lg:pe-0">
              <h1 className="text-[18px] md:text-[24px] font-heading font-bold p-2 pb-0">
                {videoDetails.title}
              </h1>
              <div className="flex items-center space-x-1 pl-2">
                <UserIconSmall className="align-bottom" />
                <p className="font-primary text-secondary">
                  {videoDetails.guide}
                </p>
              </div>
              <div className="space-x-[8px] mt-1 pl-2">
                {videoDetails?.level && (
                  <GridButton color="green">{videoDetails.level}</GridButton>
                )}
                {videoDetails?.accent && (
                  <GridButton color="red">{videoDetails.accent}</GridButton>
                )}
                {videoDetails?.topics && (
                  <GridButton color="yellow">
                    {videoDetails.topics.join(", ")}
                  </GridButton>
                )}
              </div>
              {videoDetails.description && (
                <div className="mt-4 bg-white p-2 rounded-sm">
                  <h1 className="font-heading text-[18px] font-bold">
                    {t("description")}
                  </h1>
                  <p className="font-primary text-secondary">
                    {videoDetails.description}
                  </p>
                </div>
              )}

              {/* Series section for mobile - show below content */}
              {isSeries && seriesData && (
                <div className="mt-4 bg-white p-2 rounded-sm lg:hidden">
                  <div className="flex justify-between items-center mb-3 p-2">
                    <h1 className="font-heading text-[18px] font-bold">
                      {t("series.otherVideos")}
                    </h1>
                    <Link
                      to={`/series/${videoDetails.series}`}
                      className="text-orange-accent font-fun text-sm hover:underline"
                    >
                      {t("series.viewAll")}
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 p-2">
                    {seriesData
                      .filter((video) => video.id !== parseInt(id))
                      .slice(0, 3)
                      .map((video) => (
                        <div
                          key={video.id}
                          className="flex flex-col p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={(e) => handleSeriesVideoClick(video, e)}
                        >
                          <div
                            className="w-full max-w-64 mx-auto aspect-video bg-gray-300 rounded flex-shrink-0 hover:opacity-80 overflow-hidden mb-3 relative"
                            style={{
                              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
                            }}
                          >
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
                                  style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                  }}
                                ></div>
                                <div className="absolute inset-0 z-30 flex items-center justify-center">
                                  <LockIcon className="w-16 h-16 text-white" />
                                </div>
                              </>
                            )}
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg md:text-xl font-fun font-bold text-wrap hover:text-orange-accent line-clamp-2">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar for series on desktop */}
          {isSeries && seriesData && (
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 lg:pt-2 lg:pr-6">
              <div className="bg-white p-4 rounded-sm sticky top-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-fun text-[16px] font-bold">
                    {t("series.otherVideos")}
                  </h2>
                  <Link
                    to={`/series/${videoDetails.series}`}
                    className="text-orange-accent font-fun text-sm hover:underline"
                  >
                    {t("series.viewAll")}
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {seriesData
                    .filter((video) => video.id !== parseInt(id))
                    .slice(0, 3)
                    .map((video) => (
                      <div
                        key={video.id}
                        className="flex flex-col p-2 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={(e) => handleSeriesVideoClick(video, e)}
                      >
                        <div
                          className="w-full max-w-52 mx-auto aspect-video bg-gray-300 rounded flex-shrink-0 hover:opacity-80 overflow-hidden mb-2 relative"
                          style={{ boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)" }}
                        >
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
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                                }}
                              ></div>
                              <div className="absolute inset-0 z-30 flex items-center justify-center">
                                <LockIcon className="w-12 h-12 text-white" />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="text-base font-fun font-bold text-wrap hover:text-orange-accent line-clamp-2">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom padding */}
        <div className="pb-12"></div>
      </div>
    </>
  );
}

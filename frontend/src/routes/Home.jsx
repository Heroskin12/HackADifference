import { useState, useEffect, useContext } from "react";
import HomeHeader from "../components/Reusables/Headers/HomeHeader/HomeHeader";
import SearchProvider from "../context/SearchContext";
import MobileHomeHeader from "../components/Reusables/Headers/HomeHeader/MobileHomeHeader";
import { AuthContext } from "../context/AuthContext.jsx";
import HomeGrid from "../components/Pages/Home/Grid/HomeGrid.jsx";
import SeriesGrid from "../components/Pages/Home/SeriesGrid/SeriesGrid.jsx";
import { useTranslation } from "react-i18next";
import { mockVideos, mockSeries } from "../api/mockData";

export default function Home() {
  const { t } = useTranslation("home");
  const { userInfo } = useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(true);
  const [activeTab, setActiveTab] = useState("videos");

  // Dummy filter lists for NewFilters (must have a 'filters' array)
  const filterLists = {
    filters: [
      { key: "level", values: ["Beginner", "Intermediate", "Advanced"] },
      { key: "accent", values: ["US", "UK", "AU"] },
      {
        key: "topic",
        values: [
          "Speaking",
          "Listening",
          "Pronunciation",
          "Idioms",
          "Vocabulary",
          "Business",
          "Travel",
          "Culture",
        ],
      },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 500); // Shorter delay for demo
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <SearchProvider>
        {/* Header is always rendered */}
        <div className="hidden md:block">
          <HomeHeader userInfo={userInfo} />
        </div>
        <div className="block md:hidden">
          <MobileHomeHeader userInfo={userInfo} />
        </div>

        {/* Spinner for main content */}
        {showSpinner ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
          </div>
        ) : (
          <>
            {/* Fun & Sleek Tab Navigation */}
            <div className="px-4 py-6">
              <div className="flex items-center justify-start">
                <div className="relative flex bg-gradient-to-r from-gray-100 to-gray-50 rounded-full p-1.5 shadow-inner border border-gray-200 backdrop-blur-sm">
                  <button
                    onClick={() => setActiveTab("videos")}
                    className={`relative px-6 py-3 text-base font-fun font-semibold rounded-full transition-all duration-300 ease-in-out transform cursor-pointer ${
                      activeTab === "videos"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105 -translate-y-0.5"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:shadow-md hover:scale-102"
                    }`}
                  >
                    <span className="relative z-10">🎬 {t("tabs.videos")}</span>
                    {activeTab === "videos" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("series")}
                    className={`relative px-6 py-3 text-base font-fun font-semibold rounded-full transition-all duration-300 ease-in-out transform cursor-pointer ${
                      activeTab === "series"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105 -translate-y-0.5"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:shadow-md hover:scale-102"
                    }`}
                  >
                    <span className="relative z-10">📚 {t("tabs.series")}</span>
                    {activeTab === "series" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {activeTab === "videos" ? (
              <HomeGrid
                filterLists={filterLists}
                data={mockVideos}
                hasMoreVideos={false}
                fetchNextVideos={() => {}}
                loadingMore={false}
              />
            ) : (
              <SeriesGrid data={mockSeries} />
            )}
          </>
        )}
      </SearchProvider>
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { mockVideos, mockSeries } from "../api/mockData";
import { AuthContext } from "../context/AuthContext";

export const useHomeData = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [latestVideos, setLatestVideos] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [filterLists, setFilterLists] = useState({
    levels: ["Beginner", "Intermediate", "Advanced"],
    accents: ["US", "UK", "AU"],
    topics: [
      "Speaking",
      "Listening",
      "Pronunciation",
      "Idioms",
      "Vocabulary",
      "Business",
      "Travel",
      "Culture",
    ],
  });
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Don't fetch if auth is still loading
    if (loading) {
      return;
    }
    setLoadingInitial(true);
    setError(null);
    // Simulate async fetch with setTimeout
    setTimeout(() => {
      setLatestVideos(mockVideos);
      setAllSeries(mockSeries);
      setPageIndex(1);
      setHasMoreVideos(false); // No more videos in mock
      setLoadingInitial(false);
    }, 300);
  }, [isAuthenticated, loading]);

  // No-op for language change in mock mode

  // No-op for fetchNextVideos in mock mode
  const fetchNextVideos = async () => {
    setLoadingMore(false);
    setHasMoreVideos(false);
  };

  return {
    latestVideos,
    allSeries,
    filterLists,
    loadingInitial,
    loadingMore,
    hasMoreVideos,
    fetchNextVideos,
    error, // Return the error state
  };
};

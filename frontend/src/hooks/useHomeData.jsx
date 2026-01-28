import { useState, useEffect, useContext } from "react";
import { fetchLatestVideos, fetchFilterLists } from "../api/home";
import { fetchAllSeries } from "../api/series";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export const useHomeData = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const [latestVideos, setLatestVideos] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [filterLists, setFilterLists] = useState([]);
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

    const fetchData = async () => {
      setLoadingInitial(true);
      setError(null); // Reset error state
      try {
        const [videos, series, filters] = await Promise.all([
          fetchLatestVideos(1),
          fetchAllSeries(),
          fetchFilterLists(i18n.language),
        ]);
        if (videos.length === 0) {
          setError("No videos could be found. Please try again later.");
        } else {
          setLatestVideos(videos);
          setFilterLists(filters);
        }

        if (series.length === 0) {
          setError("No series could be found. Please try again later.");
        } else {
          setAllSeries(series);
        }

        // Reset pagination when refetching
        setPageIndex(1);
        setHasMoreVideos(true);
      } catch (error) {
        setError(
          "Failed to load video or series data. Please try again later."
        );
        console.error("Error fetching data:", error);
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchData();
  }, [isAuthenticated, loading]); // Refetch when authentication status changes

  // Separate effect to refetch filters when language changes
  useEffect(() => {
    if (loading || loadingInitial) {
      return;
    }

    const refetchFilters = async () => {
      try {
        const filters = await fetchFilterLists(i18n.language);
        setFilterLists(filters);
      } catch (error) {
        console.error("Error refetching filters for language change:", error);
      }
    };

    refetchFilters();
  }, [i18n.language, loading, loadingInitial]);

  const fetchNextVideos = async () => {
    setLoadingMore(true);
    setError(null); // Reset error state
    try {
      const newVideos = await fetchLatestVideos(pageIndex + 1); // Fetch the next page of videos
      if (newVideos.length === 0) {
        setHasMoreVideos(false); // Set to false only if no new videos are returned
      } else {
        setLatestVideos((prevVideos) => [...prevVideos, ...newVideos]); // Append new videos to the existing list
        setPageIndex((prevPage) => prevPage + 1); // Increment the page index
      }
    } catch (error) {
      setError("Failed to load more videos. Please try again later.");
      console.error("Error fetching next videos:", error);
    } finally {
      setLoadingMore(false);
    }
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

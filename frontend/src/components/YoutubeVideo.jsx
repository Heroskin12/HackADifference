import YouTube from "react-youtube";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoalContext } from "../context/GoalContext";

export default function YoutubeVideo({ vidId, link, tabId }) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const { isAuthenticated } = useContext(AuthContext);
  const { updateInauthenticatedProgress, updateAuthenticatedProgress } =
    useContext(GoalContext); // Get progress context
  const watchTimeAccumulatorRef = useRef(0); // Tracks actual time watched in seconds
  const INTERVAL_SECONDS = 120;

  const onPlayerStateChange = (event) => {
    const YT = window.YT;

    if (event.data === YT.PlayerState.PLAYING && !intervalRef.current) {
      // Start polling every second to track actual watch time
      intervalRef.current = setInterval(() => {
        // Increment actual watch time by 1 second
        watchTimeAccumulatorRef.current += 1;

        // Check if we've accumulated enough watch time to trigger progress update
        if (watchTimeAccumulatorRef.current >= INTERVAL_SECONDS) {
          watchTimeAccumulatorRef.current = 0; // Reset accumulator
          checkInterval();
        }
      }, 1000);
    } else if (
      (event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED) &&
      intervalRef.current
    ) {
      // Pause polling when video is paused or ended
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const checkInterval = () => {
    if (isAuthenticated) {
      updateAuthenticatedProgress(vidId, tabId);
    } else {
      updateInauthenticatedProgress();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const opts = {
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
    position: "absolute",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <>
      <div className="flex justify-center p-2">
        <div
          className="relative w-full"
          style={{
            maxHeight: "70vh", // Cap the height to 60% of the viewport height
            aspectRatio: "16 / 9", // Maintain 16:9 aspect ratio
          }}
        >
          <YouTube
            videoId={link}
            opts={opts}
            className="absolute top-0 left-0 w-full h-full"
            onStateChange={onPlayerStateChange}
            onReady={onPlayerReady}
          />
        </div>
      </div>
    </>
  );
}

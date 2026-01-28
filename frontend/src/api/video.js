const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function fetchVideoDetails(videoId) {
  const response = await fetch(`${API_BASE}/video/watch?v=${videoId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch video details");
  }
  return response.json();
}

export async function updateWatchTime(videoId, tabId) {
  const response = await fetch(
    `${API_BASE}/video/time?v=${videoId}&tabId=${tabId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    console.error("Error updating watch time:", response.statusText);
    throw new Error("Failed to update watch time");
  }
  return response;
}

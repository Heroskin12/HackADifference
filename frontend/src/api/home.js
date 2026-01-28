const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function fetchLatestVideos(i) {
  const response = await fetch(`${API_BASE}/home/videos?page=${i}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch latest videos");
  }
  const data = await response.json();
  return data;
}

export async function fetchFilterLists(language = "en") {
  const response = await fetch(`${API_BASE}/home/filters?lang=${language}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch filter lists");
  }
  return response.json();
}

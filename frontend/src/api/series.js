const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function fetchAllSeries() {
  const response = await fetch(`${API_BASE}/series/list`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all series");
  }
  return response.json();
}

export async function fetchSeriesVideosById(seriesId) {
  const response = await fetch(`${API_BASE}/home/videos?series=${seriesId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch series with ID: ${seriesId}`);
  }
  return response.json();
}

export async function fetchSeriesDetailsById(seriesId) {
  const response = await fetch(`${API_BASE}/series/${seriesId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch series details with ID: ${seriesId}`);
  }
  return response.json();
}

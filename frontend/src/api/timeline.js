const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function fetchTimelineData() {
  const response = await fetch(`${API_BASE}/levels`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch timeline details");
  }

  return response.json();
}

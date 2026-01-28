const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function fetchUserActivity() {
  const response = await fetch(`${API_BASE}/tracker/main`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user activity details");
  }

  return response.json();
}

export async function updateTimeWatched(tabId) {
  const response = await fetch(`${API_BASE}/video/time?v=1&tabId=${tabId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to update time watched");
  }

  return response;
}

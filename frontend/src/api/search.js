const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function fetchFilterResults(query, filters) {
  // Convert filters object into query string
  const filterParams = new URLSearchParams(filters).toString();

  const response = await fetch(
    `${API_BASE}/home/videos?${query && `search=${query}&`}${
      filterParams && `${filterParams}`
    }`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }
  return response.json();
}

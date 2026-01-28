const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

// Safari detection utility
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export async function fetchUserDetails() {
  const safari = isSafari();

  try {
    const response = await fetch(`${API_BASE}/user`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Authentication failed - return null instead of throwing
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // For network errors or other issues, return null
    return null;
  }
}

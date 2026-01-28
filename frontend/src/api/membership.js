const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function fetchManageSubscriptionLink() {
  const response = await fetch(`${API_BASE}/payment/manage`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

export async function createCheckoutSession(url) {
  const response = await fetch(
    `${API_BASE}/payment/ccs?priceId=2&cbu=https://englishsponge.com${url}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response.json();
}

export async function getPaymentInfo() {
  const response = await fetch(`${API_BASE}/payment/info`, {
    method: "GET",
    credentials: "include",
  });
  return response.text();
}

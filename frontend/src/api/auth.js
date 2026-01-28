const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function sendVerificationEmail(email) {
  const response = await fetch(`${API_BASE}/auth/verify`, {
    method: "POST",
    body: email,
  });
  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return { success: false, error: "Invalid email." };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function verifyOtpValid(email, otp) {
  const response = await fetch(`${API_BASE}/auth/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return { success: false, error: "Invalid OTP or email." };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function setNewPasswordRequest(email, otp, newPassword) {
  otp = otp.join("");
  const response = await fetch(`${API_BASE}/auth/forgot/password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return { success: false, error: "Invalid OTP or email." };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function sendForgotPasswordRequest(email) {
  const response = await fetch(`${API_BASE}/auth/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: email,
  });
  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return { success: false, error: "Invalid email." };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function submitSignupRequest(name, email, password, login) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.status === 200) {
    submitLoginRequest(email, password, login);
    return { success: true };
  } else if (response.status === 400) {
    return { success: false, error: "Invalid input data." };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function submitLoginRequest(email, password, login) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({ email: email, password: password }),
  });

  if (response.status === 200) {
    // Small delay to ensure cookie is set before proceeding
    setTimeout(() => {
      login();
    }, 100);

    return { success: true };
  } else if (response.status === 401) {
    return { success: false, error: "Invalid email or password." };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function submitLogoutRequest(logout) {
  const response = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (response.status === 200) {
    logout();
    return { success: true };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

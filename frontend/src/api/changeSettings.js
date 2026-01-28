const API_BASE = import.meta.env.VITE_API_BASE_URL_PROD;

export async function changeName(name) {
  const response = await fetch(`${API_BASE}/user/settings/name`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: name,
    credentials: "include",
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return {
      success: false,
      error: "Your name could not be accepted.",
    };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

// Email - Step 1 - Send the OTP to the new email address.
export async function sendOtpToNewEmail(email) {
  const response = await fetch(`${API_BASE}/user/settings/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: email,
    credentials: "include",
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    const errorData = await response.json();
    return {
      success: false,
      error: errorData.error || "Your email could not be accepted.",
    };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function changeEmail(email, otp) {
  const response = await fetch(`${API_BASE}/user/settings/email`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
    credentials: "include",
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    const errorData = await response.json();
    return {
      success: false,
      error: errorData.error || "Your email could not be accepted.",
    };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function changePassword(currentPassword, newPassword) {
  const response = await fetch(`${API_BASE}/user/settings/password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
    credentials: "include",
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return {
      success: false,
      error:
        "Your password could not be accepted. Does it meet our requirements?",
    };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function deleteAccount(logout) {
  const response = await fetch(`${API_BASE}/user/settings/delete`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status === 200) {
    logout();
    return { success: true };
  } else if (response.status === 400) {
    return {
      success: false,
      error: "Your account could not be deleted.",
    };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function changeGoal(goal) {
  const response = await fetch(`${API_BASE}/user/settings/dailygoal`, {
    method: "PATCH",
    body: goal,
    credentials: "include",
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return {
      success: false,
      error: "Your goal could not be updated.",
    };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function updateOutsideHours(outsideHours) {
  const response = await fetch(`${API_BASE}/user/settings/manual`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      minutes: outsideHours.minutes,
      description: outsideHours.description,
    }),
  });

  if (response.status === 200) {
    return { success: true };
  } else if (response.status === 400) {
    return {
      success: false,
      error: "Your outside hours could not be updated.",
    };
  } else {
    return { success: false, error: `Unexpected error: ${response.status}` };
  }
}

export async function getOutsideHours() {
  const response = await fetch(`${API_BASE}/user/settings/manual`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch outside hours");
  }
  return response.json();
}

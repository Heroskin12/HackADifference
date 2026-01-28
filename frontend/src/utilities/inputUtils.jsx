export const checkEmailValidity = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const sanitizeInput = (input, type) => {
  switch (type) {
    case "name":
      // Allow only letters, spaces, and hyphens, and ensure spaces between words are preserved
      return input
        .replace(/[^a-zA-Z\s-]/g, "") // Remove invalid characters
        .replace(/\s{2,}/g, " ");

    case "email":
      // Remove spaces and ensure valid email characters
      return input.replace(/\s+/g, "").replace(/[^a-zA-Z0-9@._-]/g, "");

    case "password":
      // Remove leading/trailing spaces (passwords can contain special characters)
      return input.trim();

    case "otp":
      // Allow only numeric characters
      return input.replace(/[^0-9]/g, "");

    default:
      // Default sanitization: remove leading/trailing spaces
      return input.trim();
  }
};

export const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 12;
  const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
  const hasNumber = /\d/.test(password); // At least one number
  const hasSpecialChar = /[@$!%*?&]/.test(password); // At least one special character
  const isValidLength =
    password.length >= minLength && password.length <= maxLength; // Length between 8-12

  if (!isValidLength) {
    return "Password must be between 8 and 12 characters.";
  }
  if (!hasUppercase) {
    return "Password must include at least one uppercase letter.";
  }
  if (!hasNumber) {
    return "Password must include at least one number.";
  }
  if (!hasSpecialChar) {
    return "Password must include at least one special character (@, $, !, %, *, ?, &).";
  }

  return null; // Password is valid
};

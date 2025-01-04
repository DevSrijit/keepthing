export const getAuthError = (error: any) => {
  const code = error?.code;
  switch (code) {
    case 401:
      return "Invalid email or password";
    case 429:
      return "Too many attempts. Please try again later";
    case 400:
      return "Invalid credentials";
    case 409:
      return "Email already exists";
    default:
      return "Something went wrong. Please try again";
  }
}; 
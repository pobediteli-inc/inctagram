import { UseFormSetError } from "react-hook-form";
import { LoginRequest, LoginServerError } from "store/services/auth";

export const handleAuthFieldError = (error: unknown, setError: UseFormSetError<LoginRequest>) => {
  if (!error) {
    setError("password", { message: "Something went wrong. Please try again." });
    return;
  }

  const authServerError = error as LoginServerError;

  if (authServerError?.data) {
    const { statusCode, messages: serverErrorMessage, error: serverError } = authServerError.data;

    switch (statusCode) {
      case 400:
      case 401:
      case 404:
      case 429:
        setError("password", { message: serverErrorMessage });
        break;
      default:
        setError("password", { message: serverError });
    }
    return;
  }

  setError("password", { message: "An unknown error occurred. Please try again later." });
};

import { LoginArgs, LoginServerError } from "store/services/auth";
import { UseFormSetError } from "react-hook-form";

export const handleServerError = (error: LoginServerError, setError: UseFormSetError<LoginArgs>) => {
  if (!error?.data) return;
  const { statusCode, messages: serverErrorMessage, error: serverError } = error.data;
  switch (statusCode) {
    case 400:
      setError("password", { message: serverErrorMessage });
      break;
    case 401:
      setError("password", { message: serverErrorMessage });
      break;
    case 429:
      setError("password", { message: serverErrorMessage });
      break;
    default:
      setError("password", { message: serverError || "An unexpected error occurred." });
      break;
  }
};

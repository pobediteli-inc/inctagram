import { UseFormSetError } from "react-hook-form";
import { LoginArgs } from "store/services/auth";

export const handleClientError = (error: unknown, setError: UseFormSetError<LoginArgs>) => {
  if (!error) return;
  if (!navigator.onLine) {
    setError("password", { message: "No internet connection. Please check your network." });
  } else if (error instanceof Error) setError("password", { message: error.message });
  else setError("password", { message: "Something went wrong. Please try again." });
};

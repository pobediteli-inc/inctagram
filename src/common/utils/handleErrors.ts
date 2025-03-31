import { AppDispatch } from "store/store";
import { BaseServerError, LoginRequest, LoginServerError } from "store/services/api/auth";
import { UseFormSetError } from "react-hook-form";
import { setStatus } from "store/services/slices/statusSlice";

/**
 * Notes: Not all server errors processed by the handleError function
 **/
export const handleErrors = (error: unknown, dispatch: AppDispatch, setError?: UseFormSetError<LoginRequest>) => {
  if (!navigator.onLine) {
    dispatch(
      setStatus({ status: "error", message: "No internet connection. Please check your connection and try again." })
    );
    return;
  }
  if (!error) {
    dispatch(setStatus({ status: "error", message: "Something went wrong. Please try again." }));
    return;
  }
  if (error instanceof Error) {
    dispatch(setStatus({ status: "error", message: error.message }));
    return;
  }
  if (error as BaseServerError) {
    const { statusCode, messages } = (error as BaseServerError).data;
    if (statusCode && messages?.length) dispatch(setStatus({ status: "error", message: messages[0].message }));
    else dispatch(setStatus({ status: "error", message: "An unknown error occurred." }));
  }
  if (error as LoginServerError) {
    const { statusCode, messages: serverErrorMessage, error: serverError } = (error as LoginServerError).data;

    switch (statusCode) {
      case 400:
      case 401:
      case 404:
      case 429:
        setError?.("password", { message: serverErrorMessage });
        break;
      default:
        setError?.("password", { message: serverError });
    }
    return;
  }

  dispatch(setStatus({ status: "error", message: "An unknown error occurred. Please try again later." }));
};

import { AppDispatch } from "store/store";
import { LoginRequest } from "store/services/api/auth";
import { BaseServerError } from "store/services/api/baseApi/baseApi.types";
import { UseFormSetError } from "react-hook-form";
import { setStatus } from "store/services/slices/statusSlice";

/**
 * Handles various error scenarios and updates the application state or form state accordingly.
 *
 * @param {unknown} error - The error object to be handled. It can be an instance of Error, a server error, or undefined.
 * @param {AppDispatch} dispatch - Function to dispatch actions to update the application state.
 * @param {UseFormSetError<LoginRequest>} [setError] - An optional function used to set validation errors in a form.
 *
 * The method performs the following operations:
 * 1. Checks if the device is offline and dispatches an error status with a corresponding message.
 * 2. Handles cases when the error is undefined and dispatches a generic error message.
 * 3. Processes known Error instances and dispatches the error message accordingly.
 * 4. Handles server error responses by updating form error states and dispatching messages based on the error's content.
 */
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
    if (statusCode && !Array.isArray(messages)) setError?.("password", { message: messages });
    if (statusCode && messages?.length) dispatch(setStatus({ status: "error", message: messages[0].message }));
    else dispatch(setStatus({ status: "error", message: "An unknown error occurred." }));
  }
};

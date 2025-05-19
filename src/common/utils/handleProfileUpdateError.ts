import { UpdateProfileErrorResponse } from "store/services/api/profile";
import { useRouter } from "next/navigation";

type SetAlert = (message: string | null) => void;
type SetVariant = (variant: "success" | "danger") => void;

type HandleErrorParams = {
  err: unknown;
  setAlertMessage: SetAlert;
  setAlertVariant: SetVariant;
  router: ReturnType<typeof useRouter>;
};

const isUpdateProfileError = (error: unknown): error is { status: number; data?: UpdateProfileErrorResponse } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status: unknown }).status === "number"
  );
};

export function handleProfileError({ err, setAlertMessage, setAlertVariant, router }: HandleErrorParams) {
  if (isUpdateProfileError(err)) {
    const { status, data } = err;

    if (status === 401) {
      setAlertMessage("Your session has expired. Please log in again.");
      setAlertVariant("danger");
      router.push("/login");
    } else if (status === 400) {
      const messages = data?.messages?.map((m: { message: string }) => m.message).join(" ");
      const fallback = data?.error || "Invalid data. Please check your inputs.";
      setAlertMessage(messages || fallback);
      setAlertVariant("danger");
    } else {
      setAlertMessage("Unexpected error. Please try again later.");
      setAlertVariant("danger");
    }
  } else {
    setAlertMessage("Network error. Server might be unreachable.");
    setAlertVariant("danger");
  }
}

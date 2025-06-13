import { Suspense } from "react";
import NewPasswordClient from "app/login/newPassword/newPasswordClient";

export default function NewPassword() {
  return (
    <Suspense fallback={null}>
      <NewPasswordClient />
    </Suspense>
  );
}

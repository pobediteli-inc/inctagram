import { Suspense } from "react";
import NewPasswordContent from "./NewPasswordContent";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  );
}

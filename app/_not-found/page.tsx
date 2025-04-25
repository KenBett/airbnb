// app/_not-found.tsx
import { Suspense } from "react";

function NotFoundContent() {
  return <h1>404 - Page Not Found</h1>;
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}

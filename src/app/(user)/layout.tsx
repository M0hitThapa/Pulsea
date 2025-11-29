import { Suspense } from "react";
import PageLoader from "./loading";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </div>
  );
};

export default UserLayout;

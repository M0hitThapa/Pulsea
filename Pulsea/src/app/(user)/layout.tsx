import { Suspense } from "react";
import Loading from "./loading";
const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default UserLayout;

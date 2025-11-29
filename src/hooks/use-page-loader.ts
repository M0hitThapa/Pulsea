"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function usePageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return isLoading;
}

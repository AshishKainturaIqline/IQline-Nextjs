"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react";
;
import { trackPageView } from "@/lib/analytics";
function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  useEffect(() => {
    const timeout = setTimeout(() => {
      trackPageView(pathname + searchParams.toString() ? `?${searchParams.toString()}` : '', document.title);
    }, 100);
    return () => clearTimeout(timeout);
  }, [location]);
}
export {
  usePageTracking
};

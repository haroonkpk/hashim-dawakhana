"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideFooter = pathname.startsWith("/admin"); 

  return (
    <>
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

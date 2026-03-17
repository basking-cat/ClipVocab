"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const showSearch = ["/", "/search", "/clip", "/signup"].includes(pathname);

  return <Header showSearch={showSearch} />;
}

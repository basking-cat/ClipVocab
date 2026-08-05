"use client";

import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import Header from "./Header";

type HeaderWrapperProps = {
  user: User | null;
};

export default function HeaderWrapper({ user }: HeaderWrapperProps) {
  const pathname = usePathname();

  const showSearch = ["/", "/search", "/clip", "/signup"].includes(pathname);
  const showHeader = pathname !== "/";

  if (!showHeader) {
    return null;
  }

  return <Header showSearch={showSearch} user={user} />;
}

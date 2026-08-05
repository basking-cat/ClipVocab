import { createClient } from "@/lib/supabase/server";
import HeaderWrapper from "@/components/HeaderWrapper";

export default async function AuthHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <HeaderWrapper user={user} />;
}

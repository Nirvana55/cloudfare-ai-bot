import { supabaseClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useGetUserData = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabaseClient.auth.getUser();
      setUser(data.user || null);
    }
    getUser();
  }, []);

  return user;
};

export default useGetUserData;

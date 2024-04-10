import { useToast } from "@/components/ui/use-toast";
import { supabaseClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { AuthError } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

const userLogin = async (payload: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    throw Error(error.message);
  }
  return data;
};

const userLogOut = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
};

export const useUserLogin = (handleSuccess: () => void) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      handleSuccess();
      toast({
        title: "Account status.",
        description: "Login Successfully.",
      });
    },
    onError: (error: AuthError) =>
      toast({
        title: "ERROR",
        description: `${error.message}`,
      }),
  });
};

export const useUserLogOut = (handleSuccess: () => void) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogOut,
    onSuccess: () => {
      queryClient.clear();
      handleSuccess();
      toast({
        title: "Account status.",
        description: "Logout Successfully.",
      });
    },

    onError: (error: AuthError) =>
      toast({
        title: "ERROR",
        description: `${error.message}`,
        variant: "destructive",
      }),
  });
};

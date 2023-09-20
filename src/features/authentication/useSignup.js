import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: mutateSignup, isLoading: signupLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("sign up successfully");
    },
  });

  console.log(mutateSignup);

  return { mutateSignup, signupLoading };
}

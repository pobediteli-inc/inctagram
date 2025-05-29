import { LoginRequest, useLoginMutation, useMeQuery } from "store/services/api/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "common/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setLoggedIn, setStatus } from "store/services/slices";
import { handleErrors } from "common/utils";

export const useLogin = () => {
  const [login] = useLoginMutation();
  const { refetch } = useMeQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Props>({
    resolver: zodResolver(LoginScheme),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data).unwrap();
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        const me = await refetch().unwrap();
        dispatch(setLoggedIn({ isLoggedIn: true }));
        router.push(`/my-profile/${me.userId}`);
        dispatch(setStatus({ status: "success", message: "Successfully logged in." }));
      }
    } catch (error: unknown) {
      handleErrors(error, dispatch, setError);
      dispatch(setLoggedIn({ isLoggedIn: false }));
    }
  };

  return { handleSubmit, control, errors, handleFormSubmit };
};

const LoginScheme = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address, like example@example.com." }),
  password: z.string().min(1, { message: "Password is required" }),
});

type Props = z.infer<typeof LoginScheme>;

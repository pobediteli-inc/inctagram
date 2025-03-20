"use client";

import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation, useRegisterUserMutation, useUpdateProvidersMutation } from "../../../store/services/auth";
import { useRouter } from "next/navigation";

type UserGoogleType = {
  email: string;
  name: string;
  picture: string;
  sub: string;
};

export default function GoogleAuth() {
  const [userGoogle, setUserGoogle] = useState<UserGoogleType | null>(null);
  const [registerUser] = useRegisterUserMutation();
  const [login] = useLoginMutation();
  const [updateProvidersMutation] = useUpdateProvidersMutation();
  const router = useRouter();

  console.log("user", userGoogle);

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const decoded: UserGoogleType = jwtDecode<UserGoogleType>(credentialResponse.credential);
      setUserGoogle(decoded);

      // Пытаемся зарегистрировать пользователя
      await registerUser({
        email: decoded.email,
        password: decoded.sub, // Можно заменить на сгенерированный пароль
        userName: decoded.name,
        providers: ["google"],
      }).unwrap();
      console.log("Пользователь зарегистрирован:", decoded.email);

      // После регистрации сразу логинимся
      await handleLogin(decoded.email, decoded.sub);
    } catch (error: any) {
      console.error("Ошибка регистрации через Google:", error);

      // Если email уже занят, добавляем Google в список providers и логинимся
      // if (error?.status === 400 && error?.data?.message?.includes("User with this email already exists")) {
      if (error?.status === 400 && error?.data?.messages?.includes("User with this email already exists")) {
        console.log("Пользователь уже зарегистрирован, добавляем Google в providers...");
        await updateProviders(error.data.email, "google");
        await handleLogin(error.data.email, error.data.password);
      }
      // Ошибка входа через Google
      // {
      //   "status": 400,
      //   "data": {
      //   "statusCode": 400,
      //     "messages": [
      //     {
      //       "message": {
      //         "isEmail": "email must be an email"
      //       },
      //       "field": "email"
      //     },
      //     {
      //       "message": {
      //         "isString": "password must be a string"
      //       },
      //       "field": "password"
      //     }
      //   ],
      //     "error": "Bad Request"
      // }
      // }

      // Обработка ошибок проверки электронной почты и пароля
      if (error?.status === 400 && error?.data?.messages) {
        const emailError = error?.data?.messages.find((msg: any) => msg.field === "email");
        const passwordError = error?.data?.messages.find((msg: any) => msg.field === "password");

        if (emailError) {
          console.error("Ошибка валидации email:", emailError.message);
        }

        if (passwordError) {
          console.error("Ошибка валидации пароля:", passwordError.message);
        }
      }
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password }).unwrap();
      localStorage.setItem("accessToken", response.accessToken);
      console.log("Успешный вход:", response);
      router.push("/home");
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  const updateProviders = async (email: string, provider: string) => {
    try {
      console.log(`Добавляем ${provider} в список providers для ${email}`);
      // Убкдиться в корректности запроса API для обновления providers
      await updateProvidersMutation({ email, provider }).unwrap();
      console.log(`Provider ${provider} успешно добавлен для пользователя ${email}`);
    } catch (error) {
      console.error("Ошибка обновления providers:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div>
        {userGoogle ? (
          <>
            <img src={userGoogle.picture} alt="User Avatar" className="w-12 h-12 rounded-full" />
            <p className="text-lg">{userGoogle.name}</p>
            <p className="text-lg">{userGoogle.email}</p>
            <button
              onClick={() => {
                googleLogout();
                setUserGoogle(null);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Выйти
            </button>
          </>
        ) : (
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Ошибка входа")} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

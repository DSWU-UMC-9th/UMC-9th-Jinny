import { useState, type ReactNode } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignout } from "../apis/auth";
import { AuthContext } from "./AuthContext";
import usePostSignin from "../hooks/mutations/usePostSignin";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    getRefreshTokenFromStorage()
  );

  const { mutateAsync: mutateSignin } = usePostSignin();

  const login = async (signInData: RequestSigninDto) => {
    try {
      const { data } = await mutateSignin(signInData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setAccessToken(newAccessToken);

        setRefreshTokenInStorage(newRefreshToken);
        setRefreshToken(newRefreshToken);

        alert("로그인 성공");

        window.location.href = "/";
      }
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postSignout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
    } catch (error) {
      console.error("로그아웃 실패", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

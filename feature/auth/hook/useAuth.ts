import { PrismaClient, User } from "@prisma/client";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { validateToken } from "../../jwt/libs/jose";
import { reset, setUser } from "../authSlicer";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const auth = async (token: string) => {
    try {
      const payload = await validateToken(token);
      const response = await axios.post("/api/validateUser", {
        username: `${payload.username}`,
        password: `${payload.password}`,
      });

      const user: User = response.data;
      const admin = {
        username: user.username,
      };
      dispatch(setUser(admin));
    } catch (error) {
      deleteCookie("tokenAuth");
      dispatch(reset());
      router.push("/auth");
    }
  };

  const logout = () => {
    dispatch(reset);
    deleteCookie("tokenAuth");
    dispatch(reset());
    router.push("/auth");
  };

  return { auth, logout } as const;
};

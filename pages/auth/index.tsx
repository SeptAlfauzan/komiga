import { User } from "@prisma/client";
import axios from "axios";
import { setCookie } from "cookies-next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

const Auth: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();
  const [failed, setFailed] = React.useState<boolean>(true);

  const router = useRouter();
  const onSubmit = async (data: User) => {
    try {
      const response = await axios.post("/api/auth", data);
      setCookie("tokenAuth", response.data);
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
      setFailed(false);
    }
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 bg-yellow-400 flex items-center justify-center px-40 relative">
        <h3 className="text-3xl font-bold relative">
          <Boxes
            boxNumber={5}
            className="bg-white"
            position={"-top-[100px] -right-[80px]"}
          />
          Masuk ke akunmu, dan mulai belajar dengan{" "}
          <span className="text-blue-700">KOMIGA</span>
          <Boxes
            boxNumber={5}
            className="bg-black"
            position={"-bottom-[100px] -left-[80px]"}
          />
        </h3>
      </div>
      <div className="bg-white w-1/2 flex flex-col items-center justify-center px-40">
        <div>
          <h3 className="text-black font-bold text-xl">
            Selamat datang kembali
          </h3>
          <h5 className="text-zinc-400">
            Silahkan masukkan username dan password dari akunmu
          </h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-10"
          >
            <div className="flex flex-col">
              <label className="font-bold">Username</label>
              <input
                {...register("username")}
                type="text"
                className="bg-yellow-50 border border-orange-400 rounded-full py-1 px-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold">Password</label>
              <input
                {...register("password")}
                type="password"
                className="bg-yellow-50 border border-orange-400 rounded-full py-1 px-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-8 py-1 w-fit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface BoxesProps extends HTMLAttributes<HTMLDivElement> {
  classsName?: string;
  boxNumber: number;
  position?: string | null;
}
const Boxes: React.FC<BoxesProps> = (props) => {
  const { className, boxNumber, position, ...rest } = props;
  return (
    <div className={`absolute flex gap-2 ${position ? position : ""}`}>
      {new Array(boxNumber).fill(null).map((_, key) => (
        <div key={key} className={`w-5 h-5 ${className}`} />
      ))}
    </div>
  );
};

export default Auth;

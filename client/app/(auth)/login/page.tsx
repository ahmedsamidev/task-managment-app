"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { login } from "@/src/redux/slices/authSlice";

import { Button } from "@/components/ui/button";
import InputRow from "@/components/custom/InputRow";
import { useAppDispatch } from "@/src/redux/hooks";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await dispatch(login({ email, password }));
      console.log("response", response);
      
      if (response.payload?.user) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(String(response.payload) || "Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login failed", error?.response?.data?.message);
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-6">
            <InputRow
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
          </div>

          <div className="mb-6">
            <InputRow
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account?
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

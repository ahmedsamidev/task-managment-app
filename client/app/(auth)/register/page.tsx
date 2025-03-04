"use client";

import axiosInstance from "@/src/utils/axiosInstance";
import Link from "next/link";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import InputRow from "@/components/custom/InputRow";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [linkedInLink, setLinkedInLink] = useState("");
  const router = useRouter();
  const handleSignUp = async () => {
    try {
      const response = await axiosInstance.post("/auth/signUp", {
        email,
        password,
      });
      const { isLoading } = response.data;
      setIsLoading(isLoading);
      toast.success("Registered successful!");
      router.push("/login");
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      console.error("Registration failed", error);
      toast.error(
        err.response?.data?.message ?? err.message ?? "An error occurred",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Register</h1>
        <div className="space-y-4">
          <InputRow
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <InputRow
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <InputRow
            label="Linked In Profile Link"
            type="text"
            value={linkedInLink}
            onChange={setLinkedInLink}
          />

          <Button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

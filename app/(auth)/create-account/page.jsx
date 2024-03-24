"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = () => {
    setLoading(true);
    GlobalApi.registerUser(username, email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Your account has been created.");
        router.push("/");
        setLoading(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-12">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200 rounded-lg">
        <Image src={"/logo.png"} width={120} height={100} alt="logo" />
        <h2 className="font-bold text-3xl">Create an Account</h2>
        <h2 className="text-gray-500">
          Enter your email and password to create an account
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="@username"
            name="username"
            onChange={(ev) => setUsername(ev.target.value)}
            value={username}
          />
          <Input
            placeholder="name@example.com"
            name="email"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
          />
          <Button
            onClick={() => onCreateAccount()}
            disabled={!(username || email || password) || loading}
          >
            {loading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create an Account"
            )}
          </Button>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

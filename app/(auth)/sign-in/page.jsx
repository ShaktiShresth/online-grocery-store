"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    GlobalApi.signIn(email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Login successful!");
        router.push("/");
      },
      (e) => {
        toast("Login Error!");
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-12">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200 rounded-lg">
        <Image src={"/logo.png"} width={120} height={100} alt="logo" />
        <h2 className="font-bold text-3xl">Sign In</h2>
        <h2 className="text-gray-500">
          Enter your email and password to sign in your account
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
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
          <Button onClick={() => onSignIn()} disabled={!(email || password)}>
            Sign In
          </Button>
          <p className="text-center">
            Do not have an account yet?{" "}
            <Link href="/create-account" className="text-blue-500">
              Create new Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "password is required" }),
});

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const URL = import.meta.env.VITE_BASE_URL;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const response = await axios.post(`${URL}login`, data);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("auth", data.auth);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
        <div className="w-full">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Welcome Back!</h1>
                <p className="text-balance text-muted-foreground">
                  login to your account
                </p>
              </div>
              {error && <div className="bg-red-500 text-white p-4 rounded-md">{error}</div>}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="Password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
              <div className="mt-4 text-center text-sm">
                <Link to="/" className="link">
                  Don't have an account? Create one{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden bg-muted lg:block"></div>
        </div>
      </form>
    </Form>
  );
}

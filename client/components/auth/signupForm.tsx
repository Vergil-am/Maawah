"use client";

import * as React from "react";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
const formSchema = z.object({
  name: z.string().min(3, {
    message: "please enter a valid name",
  }),
  email: z.string().email({
    message: "invalid email adress",
  }),

  phone: z.string().min(10, {
    message: "please enter a valid phone number",
  }),
  password: z.string().min(8, {
    message: "passoword must be at least 8 characters",
  }),

  confirmPassword: z.string().min(8, {
    message: "passoword must be at least 8 characters",
  }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [Step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (values.password == values.confirmPassword) {
      try {
        const res = await axios.post("http://localhost:5000/auth/signin", values, {
          withCredentials: true,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {Step == 1 && (
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                onClick={(value) => {
                  console.log(value);
                  setStep(Step + 1);
                }}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In with Email
              </Button>
            </div>
          )}

          {Step == 2 && (
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="******"
                        type="password"
                        disabled={isLoading}
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>confirm password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="******"
                        type="password"
                        disabled={isLoading}
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} onClick={() => setStep(Step + 1)}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Next
              </Button>
            </div>
          )}
          {Step == 3 && (
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>full name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="test user"
                        type="text"
                        disabled={isLoading}
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>phone number</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        placeholder="+213-567-888-89"
                        type="tel"
                        disabled={isLoading}
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </form>
        {Step == 3 && (
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )}
      </Form>
      {Step == 1 && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#888888"
                    d="M20.855 10.361a.197.197 0 0 0-.194-.161H12.2a.2.2 0 0 0-.2.2v3.2c0 .11.09.2.2.2h4.886A5.398 5.398 0 0 1 6.6 12A5.4 5.4 0 0 1 12 6.6a5.37 5.37 0 0 1 3.44 1.245a.205.205 0 0 0 .276-.01l2.266-2.267a.197.197 0 0 0-.007-.286A8.953 8.953 0 0 0 12 3a9 9 0 1 0 9 9c0-.547-.051-1.113-.145-1.639Z"
                  />
                </svg>
              )}{" "}
              google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.56"
                  height="32"
                  viewBox="0 0 486.037 1000"
                >
                  <path
                    fill="#888888"
                    d="M124.074 1000V530.771H0V361.826h124.074V217.525C124.074 104.132 197.365 0 366.243 0C434.619 0 485.18 6.555 485.18 6.555l-3.984 157.766s-51.564-.502-107.833-.502c-60.9 0-70.657 28.065-70.657 74.646v123.361h183.331l-7.977 168.945H302.706V1000H124.074"
                  />
                </svg>
              )}{" "}
              Facebook
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

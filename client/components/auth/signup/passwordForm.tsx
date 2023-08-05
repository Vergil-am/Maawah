"use client";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import { UserAtom } from "@/lib/Atoms";
import axios from "axios";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "passoword must be at least 8 characters",
  }),

  confirmPassword: z.string().refine(
    function(
      this: {
        password: {
          value: string;
        };
      },
      value,
    ) {
      return value == this.password.value;
    },
    {
      message: "passwords don't match",
    },
  ),
});

export default function PasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const User = useAtomValue(UserAtom)
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/auth/signup", {
        name: User.name,
        email: User.email,
        phone: User.phone,
        password: values.password
      })
      setIsLoading(false)
      router.push('/')

    } catch (err) {
      setIsLoading(false)
      console.log(err)
    }

  }
  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      id="confirmPassword"
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
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

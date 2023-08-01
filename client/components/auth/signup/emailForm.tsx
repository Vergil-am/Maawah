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
import { useAtom, useSetAtom } from "jotai";
import { StepAtom } from "@/app/auth/signup/page";
import { UserAtom } from "@/app/auth/signup/page";

const formSchema = z.object({
  email: z.string().email({
    message: "invalid email adress",
  }),
});

export default function EmailForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Step, setStep] = useAtom(StepAtom)
  const setUser = useSetAtom(UserAtom)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setUser({
      email: values.email,
      phone: "",
      name: "",
    })
    setStep(Step + 1)
  }
  return (
    <div className="grid gap-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Button disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In with Email
                  </Button>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

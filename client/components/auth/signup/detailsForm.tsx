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
import { useAtom } from "jotai";
import { StepAtom } from "@/app/auth/signup/page";
import { UserAtom } from "@/app/auth/signup/page";

const formSchema = z.object({
  name: z.string().min(3).includes(" ", {

    message: "please enter your full name",
  }),

  phone: z.string().min(10, {
    message: "please enter a valid phone number",
  }),
});

export default function DetailsForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Step, setStep] = useAtom(StepAtom)
  const [User, setUser] = useAtom(UserAtom)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    setUser({
      email: User.email,
      name: values.name,
      phone: values.phone
    })
    setStep(Step + 1)
  }
  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

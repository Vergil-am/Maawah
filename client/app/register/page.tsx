"use client";
import { Card } from "@/components/ui/card";
import axios from "axios";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation"
const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({
    message: "invaild email adress",
  }),
  password: z.string().min(8, {
    message: "passoword must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "passoword must be at least 8 characters",
  }),
});

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.password == values.confirmPassword) {
      try {
        const res = await axios.post("http://localhost:5000/auth/register", values, {
          withCredentials: true,
        });
        console.log(res)
        redirect("/login")

      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="flex justify-center items-center content-center h-5/6">
      <Card className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input className="w-44" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>Enter your first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input className="w-44" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>Enter your last name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-96" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email adress.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input className="w-96" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your secure password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input className="w-96" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Retype your passoword</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign up</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

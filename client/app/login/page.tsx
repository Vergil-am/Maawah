"use client";
import { Card } from "@/components/ui/card";
import axios, { AxiosError } from "axios";
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
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { useToast } from "@/components/ui/use-toast";
import { isLoggedinAtom } from "@/components/Navbar/ProfileMenu";

const formSchema = z.object({
  email: z.string().email({
    message: "invalid email adress",
  }),
  password: z.string().min(5, {
    message: "passoword must be at least 5 characters",
  }),
});

export default function Login() {
  const setisLoggedin = useSetAtom(isLoggedinAtom)
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const res = await axios.post("http://localhost:5000/auth/signin", values, {
        withCredentials: true,
      });
      setisLoggedin(true)
      router.push("/");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: 'error logging in!',
        description: `${err.response.data.message}`,
      });
    }
  }
  return (
    <div className="flex justify-center items-center content-center h-5/6">
      <Card className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-96" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Your email adress.</FormDescription>
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your secure password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

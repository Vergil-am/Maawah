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
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email({
    message: "invalid email adress",
  }),
});
export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    setIsLoading(true)
    try {
      const res = await axios.put('http://localhost:5000/auth/reset-password',
        { email: values.email }
      )
      const userId = res.data.userId
      router.push(`/auth/reset-password/${userId}`)
      toast({
        title: "we sent you an email",
        description: "please check your inbox",
      })


    } catch (err: any) {
      if (err.response.data.statusCode == 404) {
        toast({
          title: "user not found ",
          variant: "destructive",
          description: "there is no user with this email address create an account?",
          action: (
            <ToastAction altText="create an account" onClick={() => router.push('/auth/signup')}>signup</ToastAction>
          )
        })
        setIsLoading(false)

      }
    }

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
                    continue
                  </Button>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

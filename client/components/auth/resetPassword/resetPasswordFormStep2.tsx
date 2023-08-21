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
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  code: z.string().length(6, {
    message: "code must be 6 characters long"
  }),
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
export default function ResetPasswordFormStep2({ userId }: { userId: number }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: ""
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    if (userId) {
      try {
        const res = await axios.put(`http://localhost:5000/auth/new-password/${userId}`,
          {
            code: values.code,
            password: values.password
          }
        )
        toast({
          title: "password reset",
          description: "you succesfully reset your passoword",
        })
        setIsLoading(false)

      } catch (err: any) {
        console.log(err)
        toast({
          title: "failed to reset password",
          variant: 'destructive',
          description: "please try again",
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
              name="code"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="code"
                      placeholder="12345"
                      type="number"
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
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="*****"
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
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      placeholder="*******"
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
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            continue
          </Button>
        </form>
      </Form>
    </div>

  )
}

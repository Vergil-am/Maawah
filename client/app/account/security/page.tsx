"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const profileFormSchema = z.object({
  password: z.string().min(8, {
    message: "passoword must be at least 8 characters long"
  }),
  newPassword: z.string().min(8, {
    message: "passoword must be at least 8 characters long"
  }),
  confirmNewPassword: z.string().refine(
    function(
      this: {
        newPassword: {
          value: string;
        };
      },
      value,
    ) {
      return value == this.newPassword.value;
    },
    {
      message: "passwords don't match",
    },
  ),

});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
export default function Security() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });
  async function ChangePassword() {

  }
  return (
    <main className="flex-col flex items-center w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(ChangePassword)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={() => (
              <FormItem>
                <FormLabel>current password</FormLabel>
                <FormControl>
                  <Input type="text" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={() => (
              <FormItem>
                <FormLabel>new password</FormLabel>
                <FormControl>
                  <Input type="text" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={() => (
              <FormItem>
                <FormLabel>confirm your new password</FormLabel>
                <FormControl>
                  <Input type="text" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />



          <Button type="submit">Change password</Button>
        </form>
      </Form>
    </main>
  )
}

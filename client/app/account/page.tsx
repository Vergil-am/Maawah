"use client";
import { MakeRequest } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { isLoggedinAtom } from "@/components/Navbar/ProfileMenu";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import User from "@/interfaces/user";

const profileFormSchema = z.object({
  name: z.string(),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z.number().max(10).min(9),

  adress: z.object({
    adress: z.string(),
    City: z.string(),
    PostCode: z.number(),
  }),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;
export default function Profile() {
  const router = useRouter();
  const isLoggedin = useAtomValue(isLoggedinAtom);
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const options = {
          methode: "get",
          withCredentials: true,
        };
        const user = await MakeRequest("http://localhost:5000/users/profile", options);
        setUser(user);
        console.log(user);
      } catch (err) {
        throw new Error("can't get user data");
      }
    };

    if (isLoggedin) {
      getUser();
    }

  }, [isLoggedin]);
  function UpdateProfile(data: ProfileFormValues) {
    //We need to send the information to updata user
  }

  return (
    <main className="flex-col flex items-center w-full">
      {user && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(UpdateProfile)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled defaultValue={user.name} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" disabled defaultValue={`${user.email[0]}****${user.email.split('@')[0].slice(-1)}@${user.email.split('@')[1]}`} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={() => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="text" disabled defaultValue={user.phone} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      )}
    </main>
  );
}

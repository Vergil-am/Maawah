"use client";
import { MakeRequest } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
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
  phoneNumber: z.number().max(10).min(9),

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
  const [NameisOpen, setNameIsOpen] = useState(false);
  const [EmailIsOpen, setEmailIsOpen] = useState(false);
  const [PhoneisOpen, setPhoneIsOpen] = useState(false);
  const [AdressisOpen, setAdressIsOpen] = useState(false);
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

    if (!isLoggedin) {
      router.push("/login");
    } else if (isLoggedin) {
      getUser();
    }
  }, []);
  function UpdateProfile(data: ProfileFormValues) {
    //We need to send the information to updata user
  }

  return (
    <main className="flex-col flex items-center w-full">
      {user && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(UpdateProfile)} className="space-y-8">
            {/* Name */}
            <Collapsible
              open={NameisOpen}
              onOpenChange={setNameIsOpen}
              className="w-[350px] space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">Name:</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">{user.name}</div>
              <CollapsibleContent className="space-y-2">
                <div className="flex">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is the name on your travel document, which could be a licence or a passport.
                </p>
              </CollapsibleContent>
            </Collapsible>

            {/* EMAIl */}
            <Collapsible
              open={EmailIsOpen}
              onOpenChange={setEmailIsOpen}
              className="w-[350px] space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">Email :</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">{user.email}</div>
              <CollapsibleContent className="space-y-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormDescription>Enter a valid email address.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
            {/* PHONE NUMBER */}
            <Collapsible
              open={PhoneisOpen}
              onOpenChange={setPhoneIsOpen}
              className="w-[350px] space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">Phone Number :</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                {user.phone ? user.phone : "place holder"}
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (XXX) XXX-XXXX" {...field} />
                        </FormControl>
                        <FormDescription>Enter a valid phone number.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
            {/* ADRESS */}
            <Collapsible
              open={AdressisOpen}
              onOpenChange={setAdressIsOpen}
              className="w-[350px] space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">Address :</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">place holder</div>
              <CollapsibleContent className="space-y-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="adress.adress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adress</FormLabel>
                        <FormControl>
                          <Input placeholder="Flat, suite ..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="adress.City"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="adress.PostCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="postCode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">Use your real adress.</p>
              </CollapsibleContent>
            </Collapsible>
            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      )}
    </main>
  );
}

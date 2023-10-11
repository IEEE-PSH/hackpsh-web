"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label"
import { Input } from "@/components//ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';

interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const UserSignUpFormSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email." })
})

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {

  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm({ resolver: zodResolver(UserSignUpFormSchema) })
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1300));
    console.log(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form id="userSignUpForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              className="mb-2"
              id="email"
              placeholder="yourname@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" disabled={isSubmitting}>
            {isSubmitting ? (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Icons.google className="w-4 h-4 mr-2" />
            )}{" "}
            Google
          </Button>
        </div>
      </form >
    </div >
  )
}
"use client";

import { cn } from "@/app/_lib/client-utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/ui/icons";
import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import React, { useState } from "react";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import FormStep from "@/app/_components/onboarding/form-step";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SupportUsFormSchema, type TSupportUsForm } from "@/app/_lib/zod-schemas/forms/onboarding/support-us";

export default function SupportUsForm() {
  const [help, setHelp] = useState(false);

  const form = useForm<TSupportUsForm>({
    resolver: zodResolver(SupportUsFormSchema),
  });

  const router = useRouter();

  function onSubmit(values: TSupportUsForm) {
    //if help, return role type also
    console.log(values.be_officer);
    if (help) {
      console.log(values.type_officer);
    }
    router.replace("/onboarding/team");
  }

  return (
    <div className="mt-[25vh] flex flex-col items-center ">
      <div className={cn("w-[23rem]")}>
        <FormStep step="2" />

        <Form {...form}>
          <form
            id="onboardingForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <p className="text-2xl font-bold tracking-tight text-center ">
              Consider Helping IEEE!
            </p>
            <FormField
              control={form.control}
              name="be_officer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you like to become an IEEE officer?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue=""
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="option-one"
                          value="yes"
                          onClick={() => {
                            setHelp(true);
                          }}
                        />
                        <Label htmlFor="option-one">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="option-two"
                          value="no"
                          onClick={() => {
                            setHelp(false);
                          }}
                        />
                        <Label htmlFor="option-two">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type_officer"
              render={({ field }) => (
                <FormItem className={help ? "visible" : "hidden"}>
                  <FormLabel>What role would you be interested in?</FormLabel>
                  <FormControl>
                    <SelectContainer
                      disabled={!help}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Role"
                          className="text-muted-foreground"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrative">
                          Administrative
                        </SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </SelectContainer>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full grid-cols-2 gap-4 ">
              <Link
                className={cn(
                  `w-full ${buttonVariants({ variant: "default" })}`,
                )}
                href="/onboarding"
              >
                Back
              </Link>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

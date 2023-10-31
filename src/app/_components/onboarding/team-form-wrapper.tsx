"use client";
import React from "react";
import { cn } from "@/app/_lib/client-utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import CreateTeamForm from "@/app/_components/onboarding/create-team-form";
import JoinTeamForm from "@/app/_components/onboarding/join-team-form";
import FormStep from "@/app/_components/onboarding/form-step";
import {  buttonVariants } from "@/app/_components/ui/button";
import Link from "next/link";

export default function TeamFormWrapper() {
  return (
    <div className="mt-[25vh] flex flex-col items-center">
      <div className={cn("w-[23rem] space-y-4")}>
        <FormStep step="3" />
        <p className="text-center text-2xl font-bold tracking-tight">
          Create or Join a Team
        </p>
        <Tabs defaultValue="create-team" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="create-team">Create Team</TabsTrigger>
            <TabsTrigger value="join-team">Join Team</TabsTrigger>
          </TabsList>
          <TabsContent value="create-team">
            <CreateTeamForm />
          </TabsContent>
          <TabsContent value="join-team">
            <JoinTeamForm />
          </TabsContent>
        </Tabs>
        <Link
          className={cn(`w-full ${buttonVariants({ variant: "default" })}`)}
          href="/dashboard"
        >
          Skip
        </Link>
      </div>
    </div>
  );
}
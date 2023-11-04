"use client";

import { cn } from "@/app/_lib/client-utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import CreateTeamForm from "@/app/_components/onboarding/create-team-form";
import JoinTeamForm from "@/app/_components/onboarding/join-team-form";
import NumberStepper from "./number-stepper";

type TeamFormWrapperProps = React.HTMLAttributes<HTMLDivElement>;

export default function TeamFormWrapper({ className, ...props }: TeamFormWrapperProps) {
  return (
    <div className={cn("grid-gap-6 flex flex-col items-center", className)} {...props}>
      <NumberStepper currentStep={2} maxStep={3} />
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
    </div>
  );
}
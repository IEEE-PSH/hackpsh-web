"use client";
import { type TChallengeData } from "@/server/dao/challenges";
import { createContext, type ReactNode, useContext } from "react";

export type TUserData = {
  user_display_name: string | null;
  user_email_address: string | null;
  user_team_uuid: string | null;
  user_uuid: string | null;
  user_team_name: string | null;
} | null;

const ChallengeContext = createContext<{
  userData: TUserData;
  challengeData: TChallengeData;
  isSolved: boolean;
} | null>(null);

export default function ChallengeContextProvider({
  userData,
  challengeData,
  isSolved,
  children,
}: {
  userData: TUserData;
  challengeData: TChallengeData;
  isSolved: boolean;
  children: ReactNode;
}) {
  return (
    <ChallengeContext.Provider value={{ userData, challengeData, isSolved }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export type ChallengeContextType = {
  userData: TUserData;
  challengeData: TChallengeData;
  isSolved: boolean;
};
export function useChallenge(): ChallengeContextType {
  return useContext(ChallengeContext)!;
}

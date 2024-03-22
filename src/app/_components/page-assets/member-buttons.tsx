"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export type MemberContactInformation = {
  github?: string;
  linkedin?: string;
  email?: string;
};

export function MemberButtons({ github, linkedin, email }: MemberContactInformation) {
  return (
    <div className="absolute bottom-0 right-0 flex space-x-2">
      {github && (
        <Button variant="ghost" size="icon" asChild>
          <Link href={github} target="_blank">
            <Github />
          </Link>
        </Button>
      )}

      {linkedin && (
        <Button variant="ghost" size="icon" asChild>
          <Link href={linkedin} target="_blank">
            <Linkedin />
          </Link>
        </Button>
      )}

      {email && (
        <Button variant="ghost" size="icon">
          <Mail onClick={() => window.open(`mailto:${email}`)} />
        </Button>
      )}
    </div>
  );
}

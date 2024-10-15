import Section from "@/app/_components/page-assets/section";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";
import { Card, CardTitle } from "@/app/_components/ui/card";
import {
  type MemberContactInformation,
  MemberButtons,
} from "@/app/_components/page-assets/member-buttons";
import AboutHeroSvg from "@/app/../../public/hackpsh-about-1.svg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH is about!",
};

function AboutHero() {
  return (
    <section className="border-b-[1px] bg-background text-foreground">
      <div className="container">
        <div className="flex flex-row justify-between space-x-4 py-6">
          <div className="flex flex-col justify-center space-y-6 md:space-y-4">
            <h2 className="text-6xl font-bold">About</h2>
            <p className="max-w-3xl">
              Without the individuals listed below, our event would never
              flourish into the interactive engaging experience for everyone. A
              round of applause truly goes to the individuals listed below for
              each of their contributions towards the event.
            </p>
          </div>

          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={AboutHeroSvg}
            width={300}
            alt="Graphical Element"
            className="hidden md:flex"
          />
        </div>
      </div>
    </section>
  );
}

type TeamMemberCardProps = {
  title: string;
  name: string;
  major: string;
} & MemberContactInformation;

type TeamMember = TeamMemberCardProps;

function TeamMemberCard(memberDetails: TeamMemberCardProps) {
  const { title, name, major } = memberDetails;
  return (
    <Card className="p-4">
      <div className="flex flex-col text-foreground">
        <p className="font-bold">{title.toUpperCase()}</p>
        <p className="mb-4 text-2xl">{name}</p>
        <div className="flex justify-between">
          <p className="text-sm text-foreground/80">
            {major.toLocaleUpperCase()}
          </p>
          <MemberButtons {...memberDetails} />
        </div>
      </div>
    </Card>
  );
}

function createTeamMemberCards(allCurrentMembers: TeamMember[]) {
  const teamMemberElements: JSX.Element[] = [];

  allCurrentMembers.forEach((teamMember, teamIndex) => {
    teamMemberElements.push(<TeamMemberCard key={teamIndex} {...teamMember} />);
  });

  return teamMemberElements;
}

function AboutTeam() {
  const currentMembers: TeamMember[] = [
    {
      title: "President",
      name: "Luke Goldstein",
      email: "lpg5285@psu.edu",
      major: "electrical engineering",
      linkedin: "https://www.linkedin.com/in/luke-goldstein",
    },
    {
      title: "Vice President",
      name: "Adriana Medina",
      email: "abm6894@psu.edu",
      major: "mechanical engineering",
      linkedin: "https://www.linkedin.com/in/adriana-medina-152881291/",
    },
    {
      title: "Secretary",
      name: "Kuber Dey",
      email: "kod5261@psu.edu",
      major: "mathematics",
      linkedin: "https://www.linkedin.com/in/kuberodey",
    },
    {
      title: "Advisory Chair",
      name: "Jeremiah Ddumba",
      email: "jsd5521@psu.edu",
      major: "electrical engineering",
      linkedin: "https://www.linkedin.com/in/jeremiah-ddumba",
    },
    {
      title: "Computer Science Lead",
      name: "John Nguyen",
      email: "jnn5163@psu.edu",
      major: "computer science",
      linkedin: "https://www.linkedin.com/in/john-nguyen-29252021a",
    },
    {
      title: "Social Media Chair",
      name: "Marianne Ramos",
      email: "mzr5975@psu.edu",
      major: "biomedical engineering",
      linkedin: "https://www.linkedin.com/in/mariannezramosc/",
    },
    {
      title: "Corporate Liaison",
      name: "Christina Voltz",
      email: "cxv278@psu.edu",
      major: "electrical engineering",
      linkedin: "https://www.linkedin.com/in/cvvoltz",
    },
    {
      title: "Event Coordinator",
      name: "Rizzie Lu",
      email: "ybl5651@psu.edu",
      major: "electrical engineering",
      linkedin: "https://www.linkedin.com/in/yi-rizzie-lu-67849b24b",
    },
    {
      title: "Outreach Chair",
      name: "Chase Brown",
      email: "crb6243@psu.edu",
      major: "electrical engineering technology",
      linkedin: "https://www.linkedin.com/in/chase-brown-3392a8274",
    },
  ];

  const pastMembers: TeamMember[] = [
    {
      title: "Corporate Liaison",
      name: "Michael Villalona",
      email: "mmv5379@psu.edu",
      major: "electrical engineering technology",
      linkedin: "https://www.linkedin.com/in/michaelvillalonanunez",
    },
    {
      title: "Treasurer",
      name: "Bramantyo Bhaskoro",
      email: "bsb5521@psu.edu",
      major: "Data Science",
      linkedin: "https://www.linkedin.com/in/bramantyo-bhaskoro-878982241",
    },
    {
      title: "Technical Lead",
      name: "Aaron Olsen",
      email: "axo5216@psu.edu",
      major: "electrical engineering",
      linkedin: "https://www.linkedin.com/in/aaron-olsen",
    },
    {
      title: "Computer Science Lead",
      name: "Dinesh Umasankar",
      email: "dqu5021@psu.edu",
      major: "computer science",
      linkedin: "https://www.linkedin.com/in/dinesh-umasankar-78354b184",
    },
    {
      title: "Sales Coordinator",
      name: "Juliana Lenge",
      email: "jcl5742@psu.edu",
      major: "electrical engineering",
      linkedin: "https://www.linkedin.com/in/juliana-lenge-72bb801b7",
    },
    {
      title: "Advisory Chair",
      name: "Peter Lee",
      email: "pbl5061@psu.edu",
      major: "electrical engineering",
      linkedin: "https://www.linkedin.com/in/peter-lee-2038141b5",
    },
    {
      title: "Vice President",
      name: "Max Valentine",
      email: "mxv5212@psu.edu",
      major: "mechanical engineering",
      linkedin: "https://www.linkedin.com/in/mx-v",
    },
    {
      title: "Secretary",
      name: "Joyce Buhano",
      email: "jsd5521@psu.edu",
      major: "electrical engineering",
      github: "https://github.com/joycebuhano",
      linkedin: "https://www.linkedin.com/in/jeremiah-ddumba",
    },
  ];

  return (
    <Section className="bg-background-variant">
      <p className="text-center text-4xl font-bold text-foreground">
        Connect with our Team
      </p>
      <p className="ml-4 mt-8 text-lg font-semibold">CURRENT MEMBERS</p>
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {createTeamMemberCards(currentMembers)}
      </div>
      <hr />
      <p className="ml-4 mt-8 text-lg font-semibold">ALUMNI</p>
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {createTeamMemberCards(pastMembers)}
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <>
      <AboutHero />
      <AboutTeam />
      <ContactSection title="Have Feedback?" cta="Let Us Know!" />
    </>
  );
}

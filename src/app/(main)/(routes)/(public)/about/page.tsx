import Section from "@/app/_components/page-assets/section";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";
import { Card } from "@/app/_components/ui/card";
import { type MemberContactInformation, MemberButtons } from "@/app/_components/page-assets/member-buttons";
import AboutHeroSvg from "@/app/../../public/hackpsh-about-1.svg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH is about!",
};

function AboutHero() {
  return (
    <section className="bg-background border-b-[1px] text-foreground">
      <div className="container">
        <div className="flex flex-row justify-between py-6">
          <div className="flex flex-col justify-center space-y-6 md:space-y-4">
            <h2 className="text-6xl font-bold">About</h2>
            <p className="text-lg text-muted-foreground max-w-[44rem]">
              Without the individuals listed below, our event would never flourish into the interactive engaging experience for everyone.
              A round of applause truly goes to the individuals listed below for each of their contributions towards the event.
            </p>
          </div>
          
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image src={AboutHeroSvg} width={300} alt="Graphical Element" className="hidden md:flex" />
        </div>
      </div>
    </section>
  );
}

type TeamMemberCardProps = {
  title: string,
  name: string,
  major: string,
} & MemberContactInformation;

type TeamMember = TeamMemberCardProps;

function TeamMemberCard(memberDetails : TeamMemberCardProps ) {
  const { title, name, major } = memberDetails
  return (
    <Card className="p-4">
      <div className="relative flex flex-col text-foreground">
        <p className="font-bold">{title.toUpperCase()}</p>
        <p className="mb-4 text-2xl">{name}</p>
        <p className="text-sm text-foreground/80">
          {major.toLocaleUpperCase()}
        </p>
        <MemberButtons {...memberDetails} />
      </div>
    </Card>
  )
}

function createTeamMemberCards(allTeamMembers: TeamMember[]) {
  const teamMemberElements: JSX.Element[] = [];

  allTeamMembers.forEach(
    (teamMember, teamIndex) => {
      teamMemberElements.push(<TeamMemberCard key={teamIndex} {...teamMember} />)
    }
  );

  return teamMemberElements;
}

function AboutTeam() {
  const teamMembers: TeamMember[] = [
    {
      "title":"President",
      "name": "Jeremiah Ddumba",
      "email": "jsd5521@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/jeremiah-ddumba"
    },
    {
      "title":"Internal President",
      "name": "Luke Goldstein",
      "email": "lpg5285@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/luke-goldstein"
    },
    {
      "title":"Vice President",
      "name": "Max Valentine",
      "email": "mxv5212@psu.edu",
      "major": "mechanical engineering",
      "linkedin": "https://www.linkedin.com/in/mx-v"
    }, 
    {
      "title":"Corporate Liaison",
      "name": "Michael Villalona",
      "email": "mmv5379@psu.edu",
      "major": "electrical engineering technology",
      "linkedin": "https://www.linkedin.com/in/michaelvillalonanunez"
    },
    {
      "title":"Corporate Liaison Assistant",
      "name": "Christina Voltz",
      "email": "cxv278@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/cvvoltz"
    },
    {
      "title":"Technical Lead",
      "name": "Aaron Olsen",
      "email": "axo5216@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/aaron-olsen"
    },
    {
      "title":"Computer Science Lead",
      "name": "Dinesh Umasankar",
      "email": "dqu5021@psu.edu",
      "major": "computer science",
      "linkedin": "https://www.linkedin.com/in/dinesh-umasankar-78354b184"
    },
    {
      "title":"Computer Science Lead Assistant",
      "name": "John Nguyen",
      "email": "jnn5163@psu.edu",
      "major": "computer science",
      "linkedin": "https://www.linkedin.com/in/john-nguyen-29252021a"
    },
    {
      "title":"Treasurer",
      "name": "Bramantyo (Bram) Bhaskoro",
      "email": "bsb5521@psu.edu",
      "major": "Data Science",
      "linkedin": "https://www.linkedin.com/in/bramantyo-bhaskoro-878982241"
    },
    {
      "title":"Computer Science Assistant",
      "name": "Ritam Ghosh",
      "email": "rpg5573@psu.edu",
      "major": "computer science",
      "linkedin": "https://www.linkedin.com/in/ritamghosh-compsci/"
    },
    {
      "title":"Computer Science Assistant",
      "name": "Suryansh Sijwali",
      "email": "sss6371@psu.edu",
      "major": "computer science",
      "linkedin": "https://www.linkedin.com/in/suryansh-sijwali-b807a6292"
    },
    {
      "title":"Secretary",
      "name": "Matthew Rice",
      "email": "mjr7081@psu.edu",
      "major": "computer science & communications",
      "linkedin": "https://www.linkedin.com/in/ricemj"
    },
    {
      "title":"Social Media Chair",
      "name": "Kuber Dey",
      "email": "kod5261@psu.edu",
      "major": "mathematics",
      "linkedin": "https://www.linkedin.com/in/kuberodey"
    },
    {
      "title":"Event Coordinator",
      "name": "Rizzie Lu",
      "email": "ybl5651@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/yi-rizzie-lu-67849b24b"
    },
    {
      "title":"Webmaster",
      "name": "Steven Carr",
      "email": "sdc5476@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/steven-carr-927269256"
    },
    {
      "title": "Sales Coordinator",
      "name": "Juliana Lenge",
      "email": "jcl5742@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/juliana-lenge-72bb801b7"
    },
    {
      "title": "Outreach Chair",
      "name": "Chase Brown",
      "email": "crb6243@psu.edu",
      "major": "electrical engineering technology",
      "linkedin": "https://www.linkedin.com/in/chase-brown-3392a8274"
    },
    {
      "title": "Advisory Student",
      "name": "Peter Lee",
      "email": "pbl5061@psu.edu",
      "major": "electrical engineering",
      "linkedin": "https://www.linkedin.com/in/peter-lee-2038141b5"
    }
  ];

  return (
    <Section className="bg-background-variant-other">
      <p className="text-3xl font-bold text-center text-foreground">
        Connect with our Team
      </p>
      <p className="mt-8 ml-4 text-lg font-semibold">CURRENT MEMBERS</p>
      <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-2">
        {createTeamMemberCards(teamMembers)}
      </div>
      <hr />
      <p className="mt-8 ml-4 text-lg font-semibold">ALUMNI</p>
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">SECRETRARY</p>
            <p className="mb-4 text-2xl">Joyce Buhano</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              github="https://github.com/joycebuhano"
              linkedin="https://www.linkedin.com/in/joycebuhano/"
            />
          </div>
        </Card>
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
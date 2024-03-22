import Section from "@/app/_components/page-assets/section";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";
import { Card } from "@/app/_components/ui/card";
import { type MemberContactInformation, MemberButtons } from "@/app/_components/page-assets/member-buttons";
import AboutHeroSvg from "@/app/../../public/hackpsh-about-1.svg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
};

function AboutHero() {
  return (
    <section className="bg-background text-foreground">
      <div className="container">
        <div className="flex flex-row justify-between py-6">
          <div className="flex flex-col space-y-6 md:space-y-4 justify-center">
            <h2 className="text-6xl font-bold">About</h2>
            <p className="text-lg text-muted-foreground max-w-[44rem]">
              Without the individuals listed below, our event would never flourish into the interactive engaging experience for everyone.
              A round of applause truly goes to the individuals listed below for each of their contributions towards the event.
            </p>
          </div>
          <Image src={AboutHeroSvg} width={300} alt="Graphical Element" className="hidden md:flex" />
        </div>
      </div>
    </section>
  );
}

// type TeamMemberCardProps = {
//   title: string,
//   name: string,
//   major: string,
// } & MemberContactInformation;

// type TeamMember = TeamMemberCardProps;

// const teamMembers: TeamMember[] = [
//     {
//       "title":"President",
//       "name": "Jeremiah Ddumba",
//       "email": "jsd5521@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/jeremiah-ddumba"
//     },
//     {
//       "title":"Internal President",
//       "name": "Luke Goldstein",
//       "email": "lpg5285@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/luke-goldstein"
//     },
//     {
//       "title":"Vice President",
//       "name": "Max Valentine",
//       "email": "mxv5212@psu.edu",
//       "major": "mechanical engineering",
//       "linkedin": "https://www.linkedin.com/in/mx-v"
//     },
//     {
//       "title":"Treasurer",
//       "name": "Bramantyo (Bram) Bhaskoro",
//       "email": "bsb5521@psu.edu",
//       "major": "Data Science",
//       "linkedin": "https://www.linkedin.com/in/bramantyo-bhaskoro-878982241"
//     },
//     {
//       "title":"Secretary",
//       "name": "Matthew Rice",
//       "email": "mjr7081@psu.edu",
//       "major": "computer science & communications",
//       "linkedin": "https://www.linkedin.com/in/ricemj"
//     },
//     {
//       "title":"Social Media Chair",
//       "name": "Kuber Dey",
//       "email": "kod5261@psu.edu",
//       "major": "Math",
//       "linkedin": "https://www.linkedin.com/in/kuberodey"
//     },
//     {
//       "title":"Corporate Liaison",
//       "name": "Michael Villalona",
//       "email": "mmv5379@psu.edu",
//       "major": "electrical engineering technology",
//       "linkedin": "https://www.linkedin.com/in/michaelvillalonanunez"
//     },
//     {
//       "title":"Corporate Liaison Assistant",
//       "name": "Christina Voltz",
//       "email": "cxv278@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/cvvoltz"
//     },
//     {
//       "title":"Technical Lead",
//       "name": "Aaron Olsen",
//       "email": "axo5216@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/aaron-olsen"
//     },
//     {
//       "title":"Computer Science Lead",
//       "name": "Dinesh Umasankar",
//       "email": "dqu5021@psu.edu",
//       "major": "computer science",
//       "linkedin": "https://www.linkedin.com/in/dinesh-umasankar-78354b184"
//     },
//     {
//       "title":"Computer Science Lead Assistant",
//       "name": "John Nguyen",
//       "email": "jnn5163@psu.edu",
//       "major": "computer science",
//       "linkedin": "https://www.linkedin.com/in/john-nguyen-29252021a"
//     },
//     {
//       "title":"Computer Science Assistant",
//       "name": "Suryansh Sijwali",
//       "email": "sss6371@psu.edu",
//       "major": "computer science",
//       "linkedin": "https://www.linkedin.com/in/suryansh-sijwali-b807a6292"
//     },
//     {
//       "title":"Event Coordinator",
//       "name": "Rizzie Lu",
//       "email": "ybl5651@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/yi-rizzie-lu-67849b24b"
//     },
//     {
//       "title":"Webmaster",
//       "name": "Steven Carr",
//       "email": "sdc5476@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/steven-carr-927269256"
//     },
//     {
//       "title": "Sales Coordinator",
//       "name": "Juliana Lenge",
//       "email": "jcl5742@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/juliana-lenge-72bb801b7"
//     },
//     {
//       "title": "Outreach Chair",
//       "name": "Chase Brown",
//       "email": "crb6243@psu.edu",
//       "major": "electrical engineering technology",
//       "linkedin": "https://www.linkedin.com/in/chase-brown-3392a8274"
//     },
//     {
//       "title": "Advisory Student",
//       "name": "Peter Lee",
//       "email": "pbl5061@psu.edu",
//       "major": "electrical engineering",
//       "linkedin": "https://www.linkedin.com/in/peter-lee-2038141b5"
//     }
// ];

function AboutTeam() {
  return (
    <Section className="bg-background-variant-other">
      <p className="text-3xl font-bold text-center text-foreground">
        Connect with our Team
      </p>
      <p className="mt-8 ml-4 text-lg font-semibold">CURRENT MEMBERS</p>
      <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-2">
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">PRESIDENT</p>
            <p className="mb-4 text-2xl">Jeremiah Ddumba</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/jeremiah-ddumba/"
              email="jsd5521@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">VICE PRESIDENT</p>
            <p className="mb-4 text-2xl">Max Valentine</p>
            <p className="font-light text-foreground/80">
              Mechanical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/mx-v"
              email="mxv5212@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">CORPORATE LIAISON</p>
            <p className="mb-4 text-2xl">Michael Villalona</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/michaelvillalonanunez"
              email="mmv5379@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">COMPUTER SCIENCE LEAD</p>
            <p className="mb-4 text-2xl">Dinesh Umansankar</p>
            <p className="font-light text-foreground/80">Computer Science</p>
            <MemberButtons
              github="https://github.com/dineshUmasankar"
              linkedin="https://www.linkedin.com/in/dinesh-umasankar-78354b184/"
              email="dqu5021@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">COMPUTER SCIENCE LEAD ASSISTANT</p>
            <p className="mb-4 text-2xl">John Nguyen</p>
            <p className="font-light text-foreground/80">Computer Science</p>
            <MemberButtons
              github="https://github.com/ImJunny"
              linkedin="https://www.linkedin.com/in/john-nguyen-29252021a/"
              email="jnn5163@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">COMPUTER SCIENCE ASSISTANCE</p>
            <p className="mb-4 text-2xl">Suryansh Sijwali</p>
            <p className="font-light text-foreground/80">Computer Science</p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/suryansh-sijwali-b807a6292"
              email="sss6371@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">TREASURER</p>
            <p className="mb-4 text-2xl">Bramantyo Bhaskuro</p>
            <p className="font-light text-foreground/80">Data Science</p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/bramantyo-bhaskoro-878982241"
              email="bsb5521@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">TECHNICAL LEAD</p>
            <p className="mb-4 text-2xl">Aaron Olsen</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/aaron-olsen-/"
              email="axo5216@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">SOCIAL MEDIA CHAIR</p>
            <p className="mb-4 text-2xl">Kuber Dey</p>
            <p className="font-light text-foreground/80">Mathematics</p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/kuberodey/"
              email="kod5261@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">CORPORATE LIAISON ASSISANT</p>
            <p className="mb-4 text-2xl">Christina Voltz</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/cvvoltz"
              email="cxv278@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">OUTREACH CHAIR</p>
            <p className="mb-4 text-2xl">Chase Brown</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/chase-brown-3392a8274/"
              email="crb6243@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">INTERNAL PRESIDENT</p>
            <p className="mb-4 text-2xl">Luke Goldstein</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/luke-goldstein-0735191b1"
              email="lpg5285@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">SALES COORDINATOR</p>
            <p className="mb-4 text-2xl">Juliana Lenge</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/juliana-lenge-72bb801b7"
              email="jcl5742@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">SECRETARY</p>
            <p className="mb-4 text-2xl">Matthew Rice</p>
            <p className="font-light text-foreground/80">
              Computer Science | Communications
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/ricemj/"
              email="mjr7081@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">Advisory Student</p>
            <p className="mb-4 text-2xl">Peter Lee</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/peter-lee-2038141b5"
              email="pbl5061@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">EVENT COORDINATOR</p>
            <p className="mb-4 text-2xl">Rizzie Lu</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/yi-rizzie-lu-67849b24b"
              email="ybl5651@psu.edu"
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">WEBMASTER</p>
            <p className="mb-4 text-2xl">Steven Carr</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
            <MemberButtons
              linkedin="https://www.linkedin.com/in/steven-carr-927269256"
              email="sdc5476@psu.edu"
            />
          </div>
        </Card>
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

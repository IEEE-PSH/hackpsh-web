import Section from "@/app/_components/page-assets/section";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";
import { Card } from "@/app/_components/ui/card";
import MemberButtons from "@/app/_components/page-assets/member-buttons";
import AboutSvg from "@/app/_images/about-svg";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
};

function AboutHero() {
  return (
    <Section className="h-[16.75rem] border-b bg-background text-foreground">
      <div className="flex justify-between space-x-12">
        <div>
          <p className="text-6xl font-bold">About</p>
          <p className="mt-8">
            Learn more about the HackPSH team including administrators,
            coordinators, developers, and more.
          </p>
        </div>
        <div className="-mt-[2rem] hidden items-center justify-start md:flex">
          <AboutSvg />
        </div>
      </div>
    </Section>
  );
}

function AboutTeam() {
  return (
    <Section className="bg-background-variant-other">
      <p className="text-center text-3xl font-bold text-foreground">
        Connect with our Team
      </p>
      <p className="ml-4 mt-8 text-lg font-semibold">CURRENT MEMBERS</p>
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
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
      <p className="ml-4 mt-8 text-lg font-semibold">ALUMNI</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-4">
          <div className="relative flex flex-col text-foreground">
            <p className="font-bold">PRESIDENT</p>
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
      <ContactSection title="Have Feedback?" />
    </>
  );
}

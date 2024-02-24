import Section from "@/app/_components/page-assets/section";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";
import { Card } from "@/app/_components/ui/card";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
};

function AboutHero() {
  return (
    <Section className="min-h-[16.75rem] bg-slate-800 text-white">
      <p className="text-6xl font-bold">About US</p>
      <p className="mt-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
    </Section>
  );
}

function AboutTeam() {
  return (
    <Section>
      <p className="text-center text-4xl font-bold text-foreground">
        Connect with our Team
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">PRESIDENT</p>
            <p className="mb-4 text-2xl">Jeremiah Ddumba</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">SECRETARY</p>
            <p className="mb-4 text-2xl">Matthew Rice</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">TECHNICAL LEAD</p>
            <p className="mb-4 text-2xl">Aaron Olsen</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">SOCIAL MEDIA CHAIR</p>
            <p className="mb-4 text-2xl">Kuber Dey</p>
            <p className="font-light text-foreground/80">Computer Science</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">COMPUTER SCIENCE LEAD</p>
            <p className="mb-4 text-2xl">Dinesh Umansankar</p>
            <p className="font-light text-foreground/80">Computer Science</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">COMPUTER SCIENCE LEAD ASSISTANT</p>
            <p className="mb-4 text-2xl">John Nguyen</p>
            <p className="font-light text-foreground/80">Computer Science</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">CORPORATE LIAISON</p>
            <p className="mb-4 text-2xl">Michael Villalona</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">CORPORATE LIAISON ASSISANT</p>
            <p className="mb-4 text-2xl">Christina Voltz</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">INTERNAL PRESIDENT</p>
            <p className="mb-4 text-2xl">Luke Goldstein</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col text-foreground">
            <p className="font-bold">SALES COORDINATOR</p>
            <p className="mb-4 text-2xl">Juliana Lenge</p>
            <p className="font-light text-foreground/80">
              Electrical Engineering
            </p>
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

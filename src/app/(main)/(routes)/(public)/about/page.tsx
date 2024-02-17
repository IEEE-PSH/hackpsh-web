import Section from "@/app/_components/page-assets/section";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
};

function AboutHero() {
  return (
    <Section className="min-h-[16.75rem] bg-slate-800">
      <p className="text-6xl font-bold">About US</p>
      <p className="mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
    </Section>
  );
}

function AboutIEEE() {
  return (
    <Section className="bg-primary text-black">
      <p className="text-center text-4xl font-bold">We are IEEE</p>
    </Section>
  );
}

function AboutTeam() {
  return (
    <Section className="bg-neutral-100 text-black">
      <p className="text-center text-4xl font-bold">Connect with our Team!</p>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col">
          <p className="font-bold">PRESIDENT</p>
          <p className="mb-4 text-2xl">Jeremiah Ddumba</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">VICE PRESIDENT</p>
          <p className="mb-4 text-2xl">Max Valentine</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">TREASURER</p>
          <p className="mb-4 text-2xl">Bramantyo Bhaskoro</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">SECRETARY</p>
          <p className="mb-4 text-2xl">Matthew Rice</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">SOCIAL MEDIA CHAIR</p>
          <p className="mb-4 text-2xl">Kuber Dey</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">TECHNICAL LEAD</p>
          <p className="mb-4 text-2xl">Aaron Olsen</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">COMPUTER SCIENCE LEAD</p>
          <p className="mb-4 text-2xl">Dinesh Umansankar</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">CORPORATE LIAISON</p>
          <p className="mb-4 text-2xl">Michael Villalona</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">TECHNICAL LEAD ASSISTANT</p>
          <p className="mb-4 text-2xl">Michael Cieslak</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">EVENT COORDINATOR</p>
          <p className="mb-4 text-2xl">Rizzie Lu</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">RADIO STATION LEAD</p>
          <p className="mb-4 text-2xl">Alexandor Caylor</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">OUTREACH CHAIR</p>
          <p className="mb-4 text-2xl">Chase Brown</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">SALES COORDINATOR</p>
          <p className="mb-4 text-2xl">Juliana Lenge</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">WEBMASTER</p>
          <p className="mb-4 text-2xl">Steven Carr</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">MASTER{`'`}S ADVISORY STUDENT</p>
          <p className="mb-4 text-2xl">Peter Lee</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">EXECUTIVE ASSISTANT</p>
          <p className="mb-4 text-2xl">Kimberly Ulishney</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">COMPUTER SCIENCE LEAD ASSISTANT</p>
          <p className="mb-4 text-2xl">John Nguyen</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">INTERNAL PRESIDENT</p>
          <p className="mb-4 text-2xl">Luke Goldstein</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">CORPORATE LIAISON ASSISANT</p>
          <p className="mb-4 text-2xl">Christina Voltz</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">COMPUTER SCIENCE ASSISTANT</p>
          <p className="mb-4 text-2xl">Suryansh Sijwali</p>
          <p className="font-light text-neutral-500">Electrical Engineering</p>
        </div>
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <>
      <AboutHero />
      <AboutIEEE />
      <AboutTeam />
      <ContactSection className="bg-black" title="Have Feedback?" />
    </>
  );
}

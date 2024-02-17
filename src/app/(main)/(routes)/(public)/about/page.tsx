import Section from "@/app/_components/page-assets/section";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
};

function AboutHero() {
  return (
    <Section className="bg-slate-800">
      <p className="text-6xl font-bold">About US</p>
      <p className="mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
    </Section>
  );
}

function AboutOfficers() {
  return (
    <Section className="bg-white text-black">
      <p className="mt-5 text-center text-4xl font-bold">IEEE Officers</p>
      <div className="grid grid-cols-2 gap-10">
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
      </div>
    </Section>
  );
}

function AboutHelpers() {
  return (
    <Section className="bg-neutral-100 text-black">
      <p className="text-center text-4xl font-bold">Helpers</p>
      <div className="grid grid-cols-2 gap-10">
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <p className="font-bold">John Smith</p>
          <p>frjfjrfr</p>
        </div>
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <>
      <AboutHero />
      <AboutOfficers />
      <AboutHelpers />
      <ContactSection className="bg-black" title="Have Feedback?" />
    </>
  );
}

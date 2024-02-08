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
      <h1 className="text-4xl font-bold">About Us</h1>
      <p className="mt-6">Lorem ipsum</p>
    </Section>
  );
}

function AboutOfficers() {
  return (
    <Section>
      <h1 className="mt-5 text-center text-4xl font-bold">IEEE Officers</h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
      </div>
    </Section>
  );
}

function Helpers() {
  return (
    <Section className="bg-white">
      <h1 className="text-center text-4xl font-bold text-black">Helpers</h1>
      <div className="grid grid-cols-2 gap-10 text-black">
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
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
      <Helpers />
      <ContactSection className="bg-black" title="Have Feedback?" />
    </>
  );
}

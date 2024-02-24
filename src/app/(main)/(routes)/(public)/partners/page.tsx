import ContactSection from "@/app/_components/page-assets/contact-section";
import Section from "@/app/_components/page-assets/section";
import { Button } from "@/app/_components/ui/button";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | HackPSH",
  description:
    "Our partners help us make this event! Please consider partnerring with us.",
};

function PartnersHero() {
  return (
    <Section className="min-h-[16.75rem] bg-slate-800 text-white">
      <p className="text-6xl font-bold">Partners</p>
      <p className="mt-8">
        Learn more about our partners who will be sponsoring HackPSH.
      </p>
    </Section>
  );
}

function PartnersInfo() {
  return (
    <Section>
      <div className="mx-auto grid gap-y-8 text-foreground">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <img
            alt="penn-state-img"
            className="h-auto w-full rounded-md object-cover md:block"
            src="https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
          />

          <div className="relative flex h-full flex-col md:pl-8">
            <p className="text-4xl font-bold">Sponsor Name</p>
            <p className="py-8 text-foreground/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
            <Button className="text-md ml-auto mt-auto w-32">Visit</Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <img
            alt="penn-state-img"
            className="h-auto w-full rounded-md object-cover md:block"
            src="https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
          />

          <div className="relative flex h-full flex-col md:pl-8">
            <p className="text-4xl font-bold">Sponsor Name</p>
            <p className="py-8 text-foreground/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
            <Button className="text-md ml-auto mt-auto w-32">Visit</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <>
      <PartnersHero />
      <PartnersInfo />
      <ContactSection title="Interested in Partnering?" />
    </>
  );
}

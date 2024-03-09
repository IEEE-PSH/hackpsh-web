import ContactSection from "@/app/_components/page-assets/contact-section";
import Section from "@/app/_components/page-assets/section";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import PartnersHeroSvg from "@/app/_components/svg-components/partners/partners-hero-svg";
import { type Metadata } from "next";
import Image from "next/image";
import PlaceholderImg from "@/../public/placeholder.jpg"

export const metadata: Metadata = {
  title: "Partners | HackPSH",
  description:
    "Our partners help us make this event! Please consider partnerring with us.",
};

function PartnersHero() {
  return (
    <Section className="h-[16.75rem] border-b bg-background text-foreground">
      <div className="flex justify-between space-x-12">
        <div>
          <p className="text-6xl font-bold">Partners</p>
          <p className="mt-8">
            Learn more about our partners who will be helping us with our latest
            HackPSH event.
          </p>
        </div>
        <div className="-mt-[3rem] hidden items-center justify-end md:flex">
          <PartnersHeroSvg />
        </div>
      </div>
    </Section>
  );
}

function PartnersInfo() {
  return (
    <Section className="bg-background-variant-other">
      <p className="text-center text-3xl font-bold text-foreground">
        Support our Partners
      </p>
      <div className="mx-auto mt-8 grid gap-y-8 text-foreground">
        <Card className="grid grid-cols-1 gap-y-8 p-6 md:grid-cols-2">
          <Image
            alt="penn-state-img"
            className="rounded-md object-cover md:block"
            src={PlaceholderImg}
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
        </Card>
        <Card className="grid grid-cols-1 gap-y-8 p-6 md:grid-cols-2">
        <Image
            alt="penn-state-img"
            className="rounded-md object-cover md:block"
            src={PlaceholderImg}
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
        </Card>
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

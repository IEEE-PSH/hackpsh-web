import Section from "@/app/_components/page-assets/section";
import { Button } from "@/app/_components/ui/button";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | HackPSH",
  description:
    "Our partners help us make this event! Please consider partnerring with us.",
};

function PartnerHero(){
  return(
    <Section className="bg-neutral-400">
      <div className="justify-left text-left items-center space-y-8 flex-col text-black ml-6 mt-[-40px]">
      <p className="text-5xl m-5 font-bold">Partners</p> 
      </div>
      <div className="flex flex-col max-w-2xl ml-6">  
        <p className="ml-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>

      </div>
    </Section>
    
  );
}

function PartnerInfo() {
  return (
    <Section className="bg-white">
      <div className="mx-auto grid gap-y-8 text-black">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <img
            alt="penn-state-img"
            className="hidden md:block rounded-md w-50 h-50"
            src=
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            
          />

          <div className="flex flex-col space-y-8 md:px-8">
            <p className="text-4xl font-bold">Sponsor Name</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
            <Button className="ml-auto mt-auto w-32">
                Visit
              </Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <img
            alt="penn-state-img"
            className="hidden md:block rounded-md w-50 h-50"
            src=
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            
          />

          <div className="flex flex-col space-y-8 md:px-8">
            <p className="text-4xl font-bold">Sponsor Name</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
            <Button className="ml-auto mt-auto w-32">
                Visit
              </Button>
          </div>
        </div>
        <hr />
      </div>
    </Section>
  );
}

function ContactHero() {
  return (
    <Section className="bg-gray-950">
      <div className="flex min-h-[10rem] justify-center text-center items-center space-y-8 flex-col text-white">
        <p className="text-4xl font-bold">Interested in Partnering?</p> 
        <div className="flex flex-col max-w-2xl">  
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
          </p>
        </div>
        <Button className="text-xl h-12 w-48 bg-white hover:bg-white/80">
          Contact Us
        </Button>
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <><PartnerHero />
    <PartnerInfo />
    <ContactHero /></>
  );
}

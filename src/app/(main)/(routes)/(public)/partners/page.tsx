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
      <div className="flex flex-col text-black mt-[-40px] sm:mt-[-20px] ml-5 sm:ml-8 md:ml-10 lg:ml-12 xl:ml-16 mb-4">
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">Partners</p> 
      </div>
      <div className="flex flex-col max-w-2xl ml-5 sm:ml-8 md:ml-10 lg:ml-12 xl:ml-16">  
        <p className="text-left">
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
      <div className="mx-auto grid gap-y-8 text-black px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:gap-x-8">
          <img
            alt="penn-state-img"
            className="md:block rounded-md w-full h-auto object-cover"
            src=
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            
          />

          <div className="flex flex-col space-y-8 px-4 sm:px-6 md:px-8">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">Sponsor Name</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
            <Button className="mr-auto mt-auto w-32">
                Visit
              </Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:gap-x-8">
          <img
            alt="penn-state-img"
            className="md:block rounded-md w-full h-auto object-cover"
            src=
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            
          />

          <div className="flex flex-col space-y-8 px-4 sm:px-6 md:px-8">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">Sponsor Name</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
            <Button className="mr-auto mt-auto w-32">
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
      <div className="flex min-h-[10rem] justify-center text-center items-center space-y-8 flex-col text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <p className="text-3xl sm:text=4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">Interested in Partnering?</p> 
        <div className="flex flex-col max-w-2xl">  
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
          </p>
        </div>
        <Button className="text-lg sm:text-xl h-10 sm:h-12 w-40 sm:w-48 bg-white hover:bg-white/80">
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

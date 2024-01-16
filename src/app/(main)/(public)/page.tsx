import { Medal, Scale, Smile, Trophy, User } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Card } from "../../_components/ui/card";
import Section from "../../_components/page-assets/section";
import ContactSection from "../../_components/page-assets/contact-section";

function CustomImg({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  return <img src={source} className={`${className} rounded-md`} />;
}

function Hero() {
  return (
    <Section bg="bg-slate-800">
      <div className="flex min-h-[25rem] flex-col text-white">
        <p className="text-6xl font-bold">HackPSH Spring 2024 is Here!</p>
        <p className="mt-8 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <p className="mt-8 text-lg">Madlyn Hanes Library | Morrison Gallery</p>
        <p className="text-lg">February 17, 2024 | 9:00 AM</p>
        <Button className="mt-auto w-48 bg-white text-lg hover:bg-white/80">
          Join Us!
        </Button>
      </div>
    </Section>
  );
}

function HomeCountdown() {
  return (
    <Section bg="bg-neutral-950">
      <div className="flex flex-col items-center space-y-8">
        <div className="grid grid-cols-7 place-items-center items-start text-white">
          <div className="flex flex-col items-center">
            <p className="text-5xl">24</p>
            <p className="text-xl">Days</p>
          </div>
          <p className="text-5xl">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl">03</p>
            <p className="text-xl">Hours</p>
          </div>
          <p className="text-5xl">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl">46</p>
            <p className="text-xl">Minutes</p>
          </div>
          <p className="text-5xl">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl">02</p>
            <p className="text-xl">Seconds</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HomeInfo() {
  return (
    <Section bg="bg-white">
      <div className="mx-auto grid gap-y-8 text-black">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <CustomImg
            className="hidden md:block"
            source={
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            }
          />

          <div className="flex flex-col space-y-8 md:px-8">
            <p className="text-4xl font-bold">What is HackPSH?</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <div className="flex flex-col space-y-8 md:pr-8">
            <p className="text-4xl font-bold">Who is it for?</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
          </div>
          <CustomImg
            className="hidden max-w-full md:block"
            source={
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            }
          />
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <CustomImg
            className="hidden max-w-full md:block"
            source={
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            }
          />
          <div className="flex flex-col space-y-8 md:px-8">
            <p className="text-4xl font-bold">What is the theme?</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HomeRules() {
  return (
    <Section bg="bg-neutral-100">
      <div className="mx-auto max-w-[30rem] md:max-w-full">
        <p className="text-center text-4xl font-bold text-black">RULES</p>
        <div className="my-6 mt-8 grid grid-cols-1 place-items-center items-start gap-8 text-black md:grid-cols-3">
          <div className="flex flex-col items-center">
            <User size="2rem" />
            <p className="mt-4 text-xl">Teams</p>
            <p className="mt-8 text-lg">
              Teams are comprised of up to 4 people. You cannot leave or join
              other teams.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Scale size="2rem" />
            <p className="mt-4 text-xl">Integrity</p>
            <p className="mt-8 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Smile size="2rem" />
            <p className="mt-4 text-xl">Conduct</p>
            <p className="mt-8 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HomePrizes() {
  return (
    <Section bg="bg-primary">
      <div className="mx-auto flex max-w-[30rem] flex-col items-center text-center text-black">
        <p className="text-4xl font-bold">PRIZES</p>
        <p className="mt-8 text-2xl">Participate in HackPSH to earn prizes!</p>
        <div className="my-14 flex flex-row space-x-8">
          <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
            <Medal size="2rem" />
            <p className="text-xl font-bold">2nd Place</p>
            <p className="text-xl">$50</p>
          </div>
          <div className="box-border flex scale-[1.3] flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
            <Trophy size="2rem" />
            <p className="text-xl font-bold">1st Place</p>
            <p className="text-xl">$100</p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
            <Medal size="2rem" />
            <p className="text-xl font-bold">3rd Place</p>
            <p className="text-xl">$25</p>
          </div>
        </div>
        <p className="text-2xl">
          Everyone will receive a{" "}
          <span className="italic">Certificate of Participation</span> and an
          entry in the <span className="italic">Resume Book!</span>
        </p>
      </div>
    </Section>
  );
}

function HomePastEvents() {
  return (
    <Section bg="bg-neutral-900">
      <div className="mx-auto grid max-w-[30rem] gap-y-8 text-black md:max-w-[60rem]">
        <p className="text-center text-4xl font-bold text-white">PAST EVENTS</p>
        <Card>
          <div className="grid grid-cols-1 gap-8 rounded-xl p-4 md:grid-cols-2">
            <CustomImg
              className="max-w-full"
              source={
                "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
              }
            />
            <div className="flex flex-col justify-between">
              <p className="text-3xl font-bold">HackPSH Spring 2023</p>
              <p className="my-4 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiumdod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud.
              </p>
              <Button className="ml-auto mt-auto w-32 text-lg">
                Read More
              </Button>
            </div>
          </div>
        </Card>
        <Card>
          <div className="grid grid-cols-1 gap-8 rounded-xl p-4 md:grid-cols-2">
            <CustomImg
              className="max-w-full"
              source={
                "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
              }
            />
            <div className="flex flex-col justify-between">
              <p className="text-3xl font-bold">HackPSH Fall 2023</p>
              <p className="my-4 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiumdod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim.
              </p>
              <Button className="ml-auto mt-auto w-32 text-lg">
                Read More
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <>
      <Hero />
      <HomeCountdown />
      <HomeInfo />
      <HomeRules />
      <HomePrizes />
      <HomePastEvents />
      <ContactSection bg="bg-black" title="Have a Question?" />
    </>
  );
}

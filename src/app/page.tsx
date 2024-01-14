import { Scale, Smile, User } from "lucide-react";
import PublicSiteHeader from "./_components/nav/public-site-header";
import { Button, buttonVariants } from "./_components/ui/button";
import { ReactNode } from "react";
import { cn } from "./_lib/client-utils";

function Section({ children, bg }: { children?: ReactNode; bg: string }) {
  return (
    <section className={`bg-blue-40 ${bg}`}>
      <div className="container px-24 py-10">{children}</div>
    </section>
  );
}

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
    <section className="bg-blue-200 ">
      <div className="container grid grid-cols-2 px-24 py-40">
        <div className="grid gap-y-6">
          <p className="text-5xl font-bold">HackPSH Spring 2024</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <p>Madlyn Hanes Library | Morrison Gallery</p>
          <Button
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
                className: "w-48",
              }),
            )}
          >
            Join Us!
          </Button>
        </div>
      </div>
    </section>
  );
}

function HomeCountdown() {
  return (
    <Section bg="bg-foreground">
      <div className="flex flex-col items-center space-y-6">
        <p className="text-xl text-background">This event starts in</p>
        <div className="grid grid-cols-7 place-items-center items-start text-background">
          <div className="flex flex-col items-center">
            <p className="text-5xl font-bold">24</p>
            <p className="text-xl">Days</p>
          </div>
          <p className="text-5xl font-bold">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl font-bold">03</p>
            <p className="text-xl">Hours</p>
          </div>
          <p className="text-5xl font-bold">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl font-bold">46</p>
            <p className="text-xl">Minutes</p>
          </div>
          <p className="text-5xl font-bold">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl font-bold">02</p>
            <p className="text-xl">Seconds</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HomeInfo() {
  return (
    <Section bg="bg-background">
      <div className="grid grid-cols-2 grid-rows-3 gap-6">
        <CustomImg
          source={
            "https://www.abc27.com/wp-content/uploads/sites/55/2016/08/28480319612_9590ae5671_z_39096617_ver1.0.jpg?w=640"
          }
        />
        <div>
          <p className="text-xl font-bold">What is HackPSH?</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure.
          </p>
        </div>
        <div>
          <p className="text-xl font-bold">Who is it for?</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>
        </div>
        <CustomImg
          source={
            "https://www.abc27.com/wp-content/uploads/sites/55/2016/08/28480319612_9590ae5671_z_39096617_ver1.0.jpg?w=640"
          }
        />
        <CustomImg
          source={
            "https://www.abc27.com/wp-content/uploads/sites/55/2016/08/28480319612_9590ae5671_z_39096617_ver1.0.jpg?w=640"
          }
        />
        <div>
          <p className="text-xl font-bold">What is the theme?</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure.
          </p>
        </div>
      </div>
    </Section>
  );
}

function HomeRules() {
  return (
    <Section bg="bg-muted">
      <p className="text-center text-2xl font-bold">Rules</p>
      <div className="my-6 grid grid-cols-3 place-items-center gap-x-6">
        <div className="flex flex-col items-center space-y-6">
          <User />
          <p className="text-xl">Teams</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <Scale />
          <p className="text-xl">Integrity</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <Smile />
          <p className="text-xl">Conduct</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>
      </div>
    </Section>
  );
}

function HomePrizes() {
  return (
    <Section bg="bg-primary">
      <div>
        <p className="text-center text-2xl font-bold">Prizes</p>
      </div>
    </Section>
  );
}

function HomePastEvents() {
  return <Section bg="bg-background"></Section>;
}

export default function Page() {
  return (
    <div>
      <PublicSiteHeader />
      <Hero />
      <HomeCountdown />
      <HomeInfo />
      <HomeRules />
      <HomePrizes />
      <HomePastEvents />
    </div>
  );
}

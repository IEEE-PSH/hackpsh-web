import { Scale, Smile, User } from "lucide-react";
import PublicSiteHeader from "./_components/nav/public-site-header";
import { Button, buttonVariants } from "./_components/ui/button";
import { ReactNode } from "react";

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
    <section className="bg-blue-200 py-40">
      <div className="container grid grid-cols-2 ">
        <div className="grid gap-y-6">
          <p className="text-5xl font-bold">HackPSH Spring 2024</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <p>Madlyn Hanes Library | Morrison Gallery</p>
          <Button className={buttonVariants({ variant: "outline" })}>
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
      <p className="text-center text-xl text-background">
        This event starts in
      </p>
      <div className="container grid grid-cols-4 place-items-center">
        <div className="flex flex-col items-center">
          <p className="text-5xl text-background">24</p>
          <p className="text-xl text-background">Days</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-5xl text-background">03</p>
          <p className="text-xl text-background">Hours</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-5xl text-background">46</p>
          <p className="text-xl text-background">Minutes</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-5xl text-background">02</p>
          <p className="text-xl text-background">Seconds</p>
        </div>
      </div>
    </Section>
  );
}

function HomeInfo() {
  return (
    <Section bg="bg-background">
      <div className="grid grid-cols-2">
        <CustomImg
          source={
            "https://i0.wp.com/images.onwardstate.com/uploads/2022/08/8-29-22-scaled.jpg?fit=2560%2C1707&ssl=1"
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
      </div>
      <div className="grid grid-cols-2">
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
            "https://i0.wp.com/images.onwardstate.com/uploads/2022/08/8-29-22-scaled.jpg?fit=2560%2C1707&ssl=1"
          }
        />
      </div>
      <div className="grid grid-cols-2">
        <CustomImg
          source={
            "https://i0.wp.com/images.onwardstate.com/uploads/2022/08/8-29-22-scaled.jpg?fit=2560%2C1707&ssl=1"
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
      <div className="grid grid-cols-3 place-items-center">
        <div className="flex flex-col items-center">
          <User />
          <p className="text-xl">Teams</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Scale />
          <p className="text-xl">Integrity</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>
        <div className="flex flex-col items-center">
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

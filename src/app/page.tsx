import { Scale, Smile, User } from "lucide-react";
import PublicSiteHeader from "./_components/nav/public-site-header";
import { Button } from "./_components/ui/button";
import { ReactNode } from "react";
import { Card } from "./_components/ui/card";

function Section({ children, bg }: { children?: ReactNode; bg: string }) {
  return (
    <section className={`bg-blue-40 ${bg}`}>
      <div className="container py-16">{children}</div>
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
  return (
    <img src={source} className={`${className} overflow-hidden rounded-md`} />
  );
}

function Hero() {
  return (
    <Section bg="bg-slate-800">
      <div className="flex min-h-[25rem] max-w-[40rem] flex-col space-y-8 text-white">
        <p className="text-6xl font-bold">HackPSH Spring 2024</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <p>Madlyn Hanes Library | Morrison Gallery | February 17, 2024</p>
        <Button className="mt-auto w-48 text-xl">Join Us!</Button>
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
      <div className="mx-auto grid max-w-[54rem] gap-y-8 text-black">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <CustomImg
            className="hidden md:block"
            source={
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            }
          />

          <div className="flex flex-col space-y-8 md:px-8">
            <p className="text-4xl font-bold">What is HackPSH?</p>
            <p className="text-md">
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
            <p className="text-md">
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
            <p className="text-md">
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
      <div className="mx-auto max-w-[30rem] md:max-w-[54rem]">
        <p className="text-center text-4xl font-bold text-black">RULES</p>
        <div className="my-6 grid grid-cols-1 place-items-center items-start gap-8 text-black md:grid-cols-3">
          <div className="flex flex-col items-center">
            <User />
            <p className="mt-4 text-xl">Teams</p>
            <p className="text-md mt-8">
              Teams are comprised of up to 4 people. You cannot leave or join
              other teams.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Scale />
            <p className="mt-4 text-xl">Integrity</p>
            <p className="text-md mt-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Smile />
            <p className="mt-4 text-xl">Conduct</p>
            <p className="text-md mt-8">
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
      <div className="text-black">
        <p className="text-center text-4xl font-bold">PRIZES</p>
        <p className="text-center">Participate in HackPSH to earn prizes!</p>
      </div>
    </Section>
  );
}

function HomePastEvents() {
  return (
    <Section bg="bg-neutral-900">
      <div className="mx-auto grid max-w-[30rem] gap-y-8 text-black md:max-w-[54rem]">
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
              <p className="text-md mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiumdod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud.
              </p>
              <ol className="mt-auto list-inside list-decimal">
                <li>Heckers</li>
                <li>NULL</li>
                <li>Blockbuilders</li>
              </ol>
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
              <p className="text-md mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiumdod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud.
              </p>
              <ol className="mt-auto list-inside list-decimal">
                <li>Heckers</li>
                <li>NULL</li>
                <li>Blockbuilders</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function ContactSection({ title, bg }: { title: string; bg: string }) {
  return (
    <Section bg={bg}>
      <div className="flex flex-col items-center space-y-6 text-center text-white">
        <p className="text-4xl font-bold">{title}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <Button>Contact Us</Button>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <Section bg="bg-background">
      <div className="flex flex-row justify-between text-foreground">
        <div>
          <p className="font-bold">Follow Us</p>
          <ul>
            <li>LinkedIn</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">Directory</p>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Partners</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">Information</p>
          <ul>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms and Service</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">Other Links</p>
          <ul>
            <li>PSH IEEE</li>
          </ul>
        </div>
      </div>
    </Section>
  );
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
      <ContactSection bg="bg-black" title="Have a Question?" />
      <Footer />
    </div>
  );
}

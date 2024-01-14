import { Scale, Smile, User } from "lucide-react";
import PublicSiteHeader from "./_components/nav/public-site-header";
import { Button } from "./_components/ui/button";
import { ReactNode } from "react";

function Section({ children, bg }: { children?: ReactNode; bg: string }) {
  return (
    <section className={`bg-blue-40 ${bg}`}>
      <div className="container px-24 py-16">{children}</div>
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
    <img
      src={source}
      className={`${className} h-full overflow-hidden rounded-md`}
    />
  );
}

function Hero() {
  return (
    <section className="bg-slate-800">
      <div className="container grid grid-cols-2 px-24 py-48 text-white">
        <div className="grid gap-y-8">
          <p className="text-5xl font-bold">HackPSH Spring 2024</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <p>Madlyn Hanes Library | Morrison Gallery | February 17, 2024</p>
          <Button className="w-48">Join Us!</Button>
        </div>
      </div>
    </section>
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
      <div className="mx-32 grid gap-y-8 text-black">
        <div className="grid grid-cols-2 gap-8 rounded-xl bg-neutral-100 p-8">
          <CustomImg
            source={
              "https://www.abc27.com/wp-content/uploads/sites/55/2016/08/28480319612_9590ae5671_z_39096617_ver1.0.jpg?w=640"
            }
          />
          <div className="flex flex-col space-y-8">
            <p className="text-3xl font-bold">What is HackPSH?</p>
            <p className="text-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 rounded-xl bg-neutral-100 p-8">
          <div className="flex flex-col space-y-8">
            <p className="text-3xl font-bold">Who is it for?</p>
            <p className="text-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>
          </div>
          <CustomImg
            source={
              "https://www.abc27.com/wp-content/uploads/sites/55/2016/08/28480319612_9590ae5671_z_39096617_ver1.0.jpg?w=640"
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-8 rounded-xl bg-neutral-100 p-8">
          <CustomImg
            source={
              "https://www.abc27.com/wp-content/uploads/sites/55/2016/08/28480319612_9590ae5671_z_39096617_ver1.0.jpg?w=640"
            }
          />
          <div className="flex flex-col space-y-8">
            <p className="text-3xl font-bold">What is the theme?</p>
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
      <p className="text-center text-2xl font-bold text-black">RULES</p>
      <div className="my-6 grid grid-cols-3 place-items-center gap-x-8 px-32 text-black">
        <div className="flex flex-col items-center space-y-8">
          <User />
          <p className="text-xl">Teams</p>
          <p className="text-md">
            Teams are comprised of up to 4 people. You cannot leave or join
            other teams.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <Scale />
          <p className="text-xl">Integrity</p>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>
        <div className="flex flex-col items-center space-y-8">
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
      <div className="text-black">
        <p className="text-center text-2xl font-bold">PRIZES</p>
        <p className="text-center">Participate in HackPSH to earn prizes!</p>
      </div>
    </Section>
  );
}

function HomePastEvents() {
  return (
    <Section bg="bg-white">
      <div className="mx-32 grid gap-y-8 text-black">
        <div className="grid grid-cols-2 gap-8 rounded-xl bg-neutral-100 p-4">
          <CustomImg
            source={
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            }
          />
          <div className="flex flex-col">
            <p className="text-3xl font-bold">HackPSH Fall 2023</p>
            <p className="text-md mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim.
            </p>
            <ol className="mt-auto list-inside list-decimal">
              <li>Heckers</li>
              <li>NULL</li>
              <li>Blockbuilders</li>
            </ol>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 rounded-xl bg-neutral-100 p-4">
          <CustomImg
            source={
              "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/penn-state-logo-1596642604.jpg?crop=1.00xw:1.00xh;0,0&resize=900:*"
            }
          />
          <div className="flex flex-col justify-between">
            <p className="text-3xl font-bold">HackPSH Spring 2023</p>
            <p className="text-md mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>
            <ol className="mt-auto list-inside list-decimal">
              <li>Heckers</li>
              <li>NULL</li>
              <li>Blockbuilders</li>
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactSection({ children, bg }: { children: ReactNode; bg: string }) {
  return <Section bg={bg}>{children}</Section>;
}

function HomeContact() {
  return (
    <ContactSection bg="bg-neutral-950">
      <div className="flex flex-col items-center space-y-6 text-white">
        <p className="text-4xl font-bold">Have a Question?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <Button>Contact Us</Button>
      </div>
    </ContactSection>
  );
}

function Footer() {
  return (
    <Section bg="bg-white">
      <div className="flex flex-row justify-between text-black">
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
      <HomeContact />
      <Footer />
    </div>
  );
}

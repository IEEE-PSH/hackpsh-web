import { Medal, Scale, Smile, Trophy, User } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/app/_components/ui/card";
import Section from "@/app/_components/page-assets/section";
import ContactSection from "@/app/_components/page-assets/contact-section";
import { EventCountdownSection } from "@/app/_components/countdown/event-countdown-section";
import HackPSH2023Fall from "@/../public/2023-fall-event.jpg";
import HackPSH2023Spring from "@/../public/2023-spring-event.jpg";
import Image from "next/image";
import Link from "next/link";
import HomeHeroSvg from "@/app/../../public/hackpsh-home-hero.svg";
import HomeInfo1Svg from "@/app/../../public/hackpsh-home-info-1.svg";
import HomeInfo2Svg from "@/app/../../public/hackpsh-home-info-2.svg";
import HomeInfo3Svg from "@/app/../../public/hackpsh-home-info-3.svg";
import HomePrizeSvg from "@/app/../../public/hackpsh-home-prize.svg";
import { siteConfig } from "@/app/_config/site";

//eslint-disable @typescript-eslint/no-unsafe-assignment
//fix type

function Hero() {
  return (
    <Section className="bg-background">
      <div className="flex justify-center lg:justify-between">
        <div className="flex max-w-xl flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
          <h2 className="text-4xl font-bold text-foreground">
            HackPSH Spring 2024
          </h2>

          <p className="text-lg text-muted-foreground">
            Welcome to HackPSH Spring 2024! Dive into challenges testing your
            software and hardware skills. Whether you&apos;re new to coding or a
            circuit-building pro, this event has something for everyone!
          </p>

          <div className="text-foreground">
            <Button
              variant="inline_link"
              size="navigation"
              className="text-md"
              asChild
            >
              <Link href={siteConfig.location} target="_blank">
                <span>Educational Activities Building | EAB 103</span>
              </Link>
            </Button>
            <p>March 23, 2024 | 10:00 AM - 10:00 PM EST</p>
          </div>

          <Button variant="default" className="text-md w-48" asChild>
            <Link href={siteConfig.registration_form} target="_blank">
              <span>Register</span>
            </Link>
          </Button>
        </div>

        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image
          src={HomeHeroSvg}
          width={300}
          alt="Graphical Element"
          className="hidden lg:block"
        />
      </div>
    </Section>
  );
}

function HomeInfo() {
  return (
    <Section className="border-y bg-background-variant dark:bg-background/60">
      <div className="grid grid-cols-5 gap-8">
        <div className="hidden justify-center md:col-span-2 md:flex">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image
            priority={true}
            alt="Graphical Element"
            src={HomeInfo1Svg}
            width={230}
          />
        </div>
        <Card className="col-span-full text-foreground/80 md:col-span-3">
          <CardHeader>
            <CardTitle className="text-3xl text-card-foreground">
              What is HackPSH?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Built by students of{" "}
              <Button
                variant="inline_link"
                size="navigation"
                className="text-md"
                asChild
              >
                <Link href={siteConfig.links.blog} target="_blank">
                  Penn State Harrisburg&apos;s IEEE Student Chapter
                </Link>
              </Button>
              , HackPSH is a dynamic hackathon focused on solving challenges
              dedicated towards subjects within the Computer Science and
              Electrical Engineering disciplines. Participants will be provided
              with Raspbery Pi Pico W kits to build various circuits and engage
              in coding challenges via{" "}
              <Button
                variant="inline_link"
                size="navigation"
                className="text-md"
                asChild
              >
                <Link href="https://www.hackerrank.com/" target="_blank">
                  HackerRank
                </Link>
              </Button>
              . We aim to explore learning in areas such as cryptography,
              circuitry, algorithms, and much more!
            </p>
          </CardContent>
        </Card>
        <hr className="col-span-full" />
        <Card className="col-span-full text-foreground/80 md:col-span-3">
          <CardHeader>
            <CardTitle className="text-3xl text-card-foreground">
              Who is it for?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              HackPSH caters towards students eager to explore the intricacies
              of building complex circuits and solving real-world coding
              problems. We aim our event towards those who want to improve their
              skills while providing an inclusive environment for learning and
              competition. With a diverse range of skill levels in mind, the
              event encourages participation from beginners to experienced
              students, fostering a collaborative and competitive environment.
            </p>
          </CardContent>
        </Card>
        <div className="hidden justify-center p-6 md:col-span-2 md:flex">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image
            alt="Graphical Element"
            src={HomeInfo2Svg}
            width={210}
            height={250}
          />
        </div>

        <hr className="col-span-full" />
        <div className="hidden items-center justify-center p-6 md:col-span-2 md:flex">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image alt="Graphical Element" src={HomeInfo3Svg} width={160} />
        </div>
        <Card className="col-span-full p-6 text-foreground/80 md:col-span-3">
          <p className="mb-8 text-4xl font-bold text-foreground">
            What is the theme?
          </p>
          <p>
            The theme for HackPSH is currently in the works, awaiting its grand
            reveal. Traditionally, HackPSH selects themes that encourage
            boundless creativity, allowing participants to embark on unique
            projects. Stay tuned for the exciting theme announcement—it&apos;s
            going to be epic! 🚀🌑
          </p>
        </Card>
      </div>
    </Section>
  );
}

function HomeRules() {
  return (
    <Section className="mx-auto bg-background">
      <p className="text-center text-4xl font-bold text-foreground">RULES</p>
      <div className="my-6 mt-8 grid grid-cols-1 place-items-center items-start gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <User className="h-8 w-8 text-xl text-foreground" />
          <p className="mt-4 text-xl text-foreground">Teams</p>
          <p className="mt-8 text-foreground/80">
            Teams are comprised of up to 4 people. Team members must work
            together to complete challenges and earn points. Once joining a
            team, members cannot leave to join other teams.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Scale className="h-8 w-8 text-xl text-foreground" />
          <p className="mt-4 text-xl text-foreground">Integrity</p>
          <p className="mt-8 text-foreground/80">
            Our commitment to integrity means promoting a culture where ethical
            practices are the norm. We believe in the power of collaboration,
            honesty, and respect in driving innovation. By joining HackPSH,
            participants commit to upholding these principles and contributing
            to a positive and inclusive community.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Smile className="h-8 w-8 text-xl text-foreground" />
          <p className="mt-4 text-xl text-foreground">Conduct</p>
          <p className="mt-8 text-foreground/80">
            At HackPSH, we expect all participants to engage with respect and
            fairness, valuing the contributions and efforts of every individual.
            We have no tolerance for communication that makes anyone feel
            unwelcome, unsupported, insulted, or discriminated against.
          </p>
        </div>
      </div>
    </Section>
  );
}

function HomePrizes() {
  return (
    <Section className="border-y bg-primary/90">
      <div className="flex flex-row justify-center space-x-12">
        <Card className="max-w-[32rem] border-black bg-background-banana">
          <CardHeader>
            <CardTitle className="text-3xl dark:text-background">
              PRIZES
            </CardTitle>
            <CardDescription className="text-md text-foreground dark:text-background/80">
              Attend HackPSH to earn prizes, participate in raffles, and much
              more!
            </CardDescription>
            <CardContent className="mx-auto">
              <div className="my-14 flex scale-[0.85] flex-row space-x-4 sm:scale-[1]">
                <div className="h-42 flex w-28 rotate-[2deg] flex-col items-center space-y-4 rounded-xl bg-white p-4 text-foreground shadow-lg dark:text-background">
                  <Medal className="h-8 w-8" />
                  <p className="font-bold">2nd Place</p>
                  <p className="text-xl">$50</p>
                </div>
                <div className="h-42 z-[2] box-border flex w-28 rotate-[-7deg] scale-[1.3] flex-col items-center space-y-4 rounded-xl bg-white p-4 text-foreground shadow-lg dark:text-background">
                  <Trophy className="h-8 w-8" />
                  <p className="font-bold">1st Place</p>
                  <p className="text-xl">$100</p>
                </div>
                <div className="h-42 flex w-28 rotate-[5deg] flex-col items-center space-y-4 rounded-xl bg-white p-4 text-foreground shadow-lg dark:text-background">
                  <Medal className="h-8 w-8" />
                  <p className="font-bold">3rd Place</p>
                  <p className="text-xl">$25</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-lg font-medium dark:text-background/80">
              Everyone will receive a Certificate of Participation and an entry
              in the Resume Book.
            </CardFooter>
          </CardHeader>
        </Card>
        <div className="hidden md:flex">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image alt="Graphical Element" src={HomePrizeSvg} />
        </div>
      </div>
    </Section>
  );
}

function HomePastEvents() {
  return (
    <Section className="bg-background-variant-other">
      <div className="mx-auto grid max-w-[30rem] gap-y-8 md:max-w-[60rem]">
        <p className="text-center text-4xl font-bold text-foreground">
          PAST EVENTS
        </p>
        <Card>
          <div className="grid grid-cols-1 gap-8 rounded-xl p-6 md:grid-cols-2">
            <Image
              alt="fall-2023-event"
              className="rounded-md brightness-[105%] saturate-[120%]"
              src={HackPSH2023Fall}
            />
            <div className="flex flex-col justify-between">
              <p className="text-3xl font-bold">HackPSH Fall 2023</p>
              <p className="my-4">
                The Fall 2023 Hackathon, organized by IEEE, was a vibrant event
                with over 70 participants. It facilitated collaboration across
                different disciplines, offering a mix of team-building,
                networking, workshops, and project-building. Each participant
                received Arduino kits and earned points by completing coding and
                circuit challenges. The event also featured a partnership with
                TRC Companies, Inc., insights from industry professionals, and
                the introduction of the HackPSH platform itself.
              </p>
              <Button className="text-md ml-auto mt-auto w-32" asChild>
                <Link
                  href="https://edu.ieee.org/us-psu/event/hackpsh/"
                  target="_blank"
                >
                  Read More
                </Link>
              </Button>
            </div>
          </div>
        </Card>
        <Card>
          <div className="grid grid-cols-1 gap-8 rounded-xl p-6 md:grid-cols-2">
            <Image
              alt="spring-2023-event"
              className="rounded-md brightness-[105%] saturate-[120%]"
              src={HackPSH2023Spring}
            />

            <div className="flex flex-col justify-between">
              <p className="text-3xl font-bold">HackPSH Spring 2023</p>
              <p className="my-4">
                The Spring 2023 Hackathon, co-hosted by IEEE and ACM, was Penn
                State Harrisburg&apos;s first-ever hackathon. It drew students
                across various majors to engage in hardware and software
                projects, including Arduino programming and circuit building.
                The event fostered team-building, workshops, and networking with
                over 60 students, including those without prior technical
                experience. Sponsors such as Capgemini Engineering and the
                Pennsylvania Air National Guard Recruiting played a key role on
                the success of the event.
              </p>
              <Button className="text-md ml-auto mt-auto w-32" asChild>
                <Link
                  href="https://edu.ieee.org/us-psu/event/ieee-acm-hackathon/"
                  target="_blank"
                >
                  Read More
                </Link>
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
      <EventCountdownSection />
      <HomeInfo />
      <HomeRules />
      <HomePrizes />
      <HomePastEvents />
      <ContactSection title="Have a Question?" cta="Reach Out!" />
    </>
  );
}

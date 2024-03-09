import { Medal, Scale, Smile, Trophy, User } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import Section from "@/app/_components/page-assets/section";
import ContactSection from "@/app/_components/page-assets/contact-section";
import CountdownWrapper from "@/app/_components/countdown/countdown-wrapper";
import HackPSH2023Fall from "@/../public/2023-fall-event.jpg";
import HackPSH2023Spring from "@/../public/2023-spring-event.jpg";
import Image from "next/image";
import Link from "next/link";
import HomeInfo1Svg from "@/app/_components/svg-components/home/home-info1-svg";
import HomePrizeSvg from "@/app/_components/svg-components/home/home-prize-svg";
import HomeInfo3Svg from "@/app/_components/svg-components/home/home-info3-svg";
import HomeHeroSvg from "@/app/_components/svg-components/home/home-hero-svg";
import HomeInfo2Svg from "@/app/_components/svg-components/home/home-info2-svg";
import { siteConfig } from "@/app/_config/site";

function Hero() {
  return (
    <Section className="bg-background">
      <div className="flex max-w-[80rem] flex-row justify-center space-x-12 text-center lg:justify-between lg:text-left">
        <div className="flex max-w-[50rem] flex-col items-center space-y-8 lg:items-start">
          <p className="whitespace-nowrap text-[7vw] font-bold text-foreground md:text-6xl">
            HackPSH Spring 2024
          </p>
          <div className="text-md flex flex-col md:text-lg">
            <p>
              Welcome to HackPSH Spring 2024! Dive into challenges testing your
              software and hardware skills. Whether you&apos;re new to coding or
              a circuit-building pro, this event has something for everyone!
            </p>
            <div className="mt-8">
              <p>Educational Activities Building | EAB 103</p>
              <p>March 23, 2024 | 10:00 AM - 10:00 PM EST</p>
            </div>
          </div>
          <Button
            className="text-md mt-auto w-48 bg-foreground text-background hover:bg-foreground/80"
            asChild
          >
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdkVRX1e8lNruVzWVKgcQ6YOt9NWhkotzOysjU8YdewjDvvTA/viewform"
              target="_blank"
            >
              Register
            </Link>
          </Button>
        </div>
        <div className="hidden lg:flex">
          <HomeHeroSvg/>
        </div>
      </div>
    </Section>
  );
}

function HomeInfo() {
  return (
    <Section className="border-y">
      <div className="grid grid-cols-5 gap-8">
        <div className="hidden items-center justify-center p-6 md:col-span-2 md:flex">
          <HomeInfo1Svg />
        </div>
        <Card className="col-span-full p-6 text-foreground/80 md:col-span-3">
          <p className="mb-8 text-4xl font-bold text-foreground">
            What is HackPSH?
          </p>
          <p>
            HackPSH is a dynamic student-led hackathon built by{" "}
            <span className="font-semibold text-foreground hover:underline">
              {" "}
              <Link href={siteConfig.links.blog} target="_blank">
                Penn State Harrisburg&apos;s IEEE Student Chapter
              </Link>
            </span>
            . We focus on solving challenges dedicated towards subjects within
            the Computer Science and Electrical Engineering disciplines.
            Participants will be provided with Raspbery Pi Pico W kits to build
            various circuits and engage in coding challenges via{" "}
            <span className="font-semibold text-foreground hover:underline">
              <Link href="https://www.hackerrank.com/" target="_blank">
                HackerRank
              </Link>
            </span>
            . We aim to explore learning in areas such as cryptography,
            circuitry, algorithms, and much more!
          </p>
        </Card>
        <hr className="col-span-full" />
        <div className="hidden items-center justify-center p-6 md:col-span-2 md:flex">
          <HomeInfo2Svg/>
        </div>
        <Card className="col-span-full p-6 text-foreground/80 md:col-span-3">
          <p className="mb-8 text-4xl font-bold text-foreground">
            Who is it for?
          </p>
          <p>
            HackPSH caters towards students eager to explore the intricacies of
            building complex circuits and solving real-world coding problems. We
            aim our event towards those who want to improve their skills while
            providing an inclusive environment for learning and competition.
            With a diverse range of skill levels in mind, the event encourages
            participation from beginners to experienced students, fostering a
            collaborative and competitive environment.
          </p>
        </Card>
        <hr className="col-span-full" />
        <div className="hidden items-center justify-center p-6 md:col-span-2 md:flex">
          <HomeInfo3Svg />
        </div>
        <Card className="col-span-full p-6 text-foreground/80 md:col-span-3">
          <p className="mb-8 text-4xl font-bold text-foreground">
            What is the theme?
          </p>
          <p>
            As of right now, the theme is being decided, and will be announced
            once determined. Traditionally, HackPSH tends to choose a theme that
            can be interpreted in an open manner to allow for the most
            creativity, as we simply want to see unique projects.
          </p>
        </Card>
      </div>
    </Section>
  );
}

function HomeRules() {
  return (
    <Section className="bg-background-variant">
      <div className="mx-auto max-w-[30rem] md:max-w-full">
        <p className="text-center text-4xl font-bold text-foreground">RULES</p>
        <div className="my-6 mt-8 grid grid-cols-1 place-items-center items-start gap-8 text-foreground md:grid-cols-3">
          <div className="flex flex-col items-center">
            <User size="2rem" />
            <p className="mt-4 text-xl">Teams</p>
            <p className="mt-8 text-foreground/80">
              Teams are comprised of up to 4 people. Team members must work
              together to complete challenges and earn points. Once joining a
              team, members cannot leave to join other teams.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Scale size="2rem" />
            <p className="mt-4 text-xl">Integrity</p>
            <p className="mt-8 text-foreground/80">
              Our commitment to integrity means promoting a culture where
              ethical practices are the norm. We believe in the power of
              collaboration, honesty, and respect in driving innovation. By
              joining HackPSH, participants commit to upholding these principles
              and contributing to a positive and inclusive community.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Smile size="2rem" />
            <p className="mt-4 text-xl">Conduct</p>
            <p className="mt-8 text-foreground/80">
              At HackPSH, we expect all participants to engage with respect and
              fairness, valuing the contributions and efforts of every
              individual. We have no tolerance for communication that makes
              anyone feel unwelcome, unsupported, insulted, or discriminated
              against.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HomePrizes() {
  return (
    <Section className="border-y bg-primary">
      <div className="flex items-center space-x-12">
        <div className="mx-auto flex max-w-[30rem] flex-col items-center text-center text-black">
          <p className="text-4xl font-bold">PRIZES</p>
          <p className="mt-8 text-xl">
            Attend HackPSH to earn prizes, participate in raffles, and much
            more!
          </p>
          <p className="mt-8 text-xl font-semibold">
            Money prizes for each person on winning teams!
          </p>
          <div className="my-14 flex scale-[0.85] flex-row space-x-4 sm:scale-[1]">
            <div className="flex h-[9.5rem] w-[7rem] rotate-[2deg] flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
              <Medal size="2rem" />
              <p className=" font-bold">2nd Place</p>
              <p className="text-xl">$50</p>
            </div>
            <div className="z-[2] box-border flex h-[9.5rem] w-[7rem] rotate-[-7deg] scale-[1.3] flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
              <Trophy size="2rem" />
              <p className=" font-bold">1st Place</p>
              <p className="text-xl">$100</p>
            </div>
            <div className="flex h-[9.5rem] w-[7rem] rotate-[5deg] flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
              <Medal size="2rem" />
              <p className=" font-bold">3rd Place</p>
              <p className="text-xl">$25</p>
            </div>
          </div>
          <p className="text-xl">
            Everyone will receive a{" "}
            <span className="italic">Certificate of Participation</span> and an
            entry in the <span className="italic">Resume Book.</span>
          </p>
        </div>
        <div className="hidden md:flex">
          <HomePrizeSvg />
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
                State Harrisburg{"'"}s first-ever hackathon. It drew students
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
      <CountdownWrapper />
      <HomeInfo />
      <HomeRules />
      <HomePrizes />
      <HomePastEvents />
      <ContactSection title="Have a Question?" />
    </>
  );
}

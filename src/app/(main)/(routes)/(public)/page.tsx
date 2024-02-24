import { Medal, Scale, Smile, Trophy, User } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import Section from "@/app/_components/page-assets/section";
import ContactSection from "@/app/_components/page-assets/contact-section";
import CountdownWrapper from "@/app/_components/countdown/countdown-wrapper";
import HackPSH2023Fall from "@/app/_images/fall-2023-event.jpg";
import HackPSH2023Spring from "@/app/_images/spring-2023-event.jpg";
import EAB from "@/app/_images/eab.jpg";
import PennStatePlaceholder from "@/app/_images/penn-state-placeholder.jpg";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative">
      <Image
        alt="eab-building"
        src={EAB}
        className="absolute z-[-1] h-full w-full object-cover brightness-[28%] saturate-[110%]"
      />
      <div className="container max-w-[80rem] py-16">
        <div className="flex min-h-[25rem] flex-col items-center justify-center space-y-8 text-center text-white">
          <p className="text-6xl font-bold">HackPSH Spring 2024</p>
          <div className="flex max-w-2xl flex-col">
            <p>
              Welcome to HackPSH Spring 2024! Dive into challenges testing your
              software and hardware skills. Whether you&apos;re new to coding or
              a circuit-building pro, this event has something for everyone.
              Join us for an exciting journey of learning, creativity, and
              teamwork with fellow students. Make the most of this fantastic
              opportunity!
            </p>
            <div>
              <p className="mt-8">Educational Activities Building | EAB 103</p>
              <p className="">March 23, 2024 | 10:00 AM - 10:00 PM EST</p>
            </div>
          </div>
          <Button
            className="text-md w-48 bg-white hover:bg-neutral-200"
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
      </div>
    </section>
  );
}

function HomeInfo() {
  return (
    <Section className="bg-white">
      <div className="mx-auto grid gap-y-8 text-black">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <Image
            alt="penn-state-img"
            className="hidden rounded-md md:block"
            src={PennStatePlaceholder}
          />

          <div className="flex flex-col space-y-8 md:px-8">
            <p className="text-4xl font-bold">What is HackPSH?</p>
            <p>
              HackPSH is a dynamic student-led hackathon built by Penn State
              Harrisburg&apos;s IEEE Student Chapter. We focus on solving
              challenges dedicated towards subjects within the Computer Science
              and Electrical Engineering disciplines. Participants will be
              provided with Raspbery Pi Pico W kits to build various circuits
              and engage in coding challenges via HackerRank. We aim to explore
              learning in areas such as cryptography, circuitry, algorithms, and
              much more!
            </p>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <div className="flex flex-col space-y-8 md:pr-8">
            <p className="text-4xl font-bold">Who is it for?</p>
            <p>
              HackPSH caters towards students eager to explore the intricacies
              of building complex circuits and solving real-world coding
              problems. We aim our event towards those who want to improve their
              skills while providing an inclusive environment for learning and
              competition. With a diverse range of skill levels in mind, the
              event encourages participation from beginners to experienced
              students, fostering a collaborative and competitive environment.
            </p>
          </div>
          <Image
            alt="penn-state-img"
            className="hidden rounded-md md:block"
            src={PennStatePlaceholder}
          />
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
          <Image
            alt="penn-state-img"
            className="hidden rounded-md md:block"
            src={PennStatePlaceholder}
          />
          <div className="flex flex-col space-y-8 md:px-8">
            <p className="text-4xl font-bold">What is the theme?</p>
            <p>
              As of right now, the theme is being determined, and will be
              announced once determined. Traditionally, HackPSH tends to choose
              a theme that can be interpreted in an open manner to allow for the
              most creativity, as we simply want to see unique projects.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HomeRules() {
  return (
    <Section className="bg-neutral-100">
      <div className="mx-auto max-w-[30rem] md:max-w-full">
        <p className="text-center text-4xl font-bold text-black">RULES</p>
        <div className="my-6 mt-8 grid grid-cols-1 place-items-center items-start gap-8 text-black md:grid-cols-3">
          <div className="flex flex-col items-center">
            <User size="2rem" />
            <p className="mt-4 text-xl">Teams</p>
            <p className="mt-8">
              Teams are comprised of up to 4 people. You cannot leave or join
              other teams.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Scale size="2rem" />
            <p className="mt-4 text-xl">Integrity</p>
            <p className="mt-8">
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
            <p className="mt-8">
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
    <Section className="bg-primary">
      <div className="mx-auto flex max-w-[30rem] flex-col items-center text-center text-black">
        <p className="text-4xl font-bold">PRIZES</p>
        <p className="mt-8 text-xl">Participate in HackPSH to earn prizes!</p>
        <div className="my-14 flex flex-row space-x-8">
          <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
            <Medal size="2rem" />
            <p className=" font-bold">2nd Place</p>
            <p className="text-xl">$50</p>
          </div>
          <div className="box-border flex scale-[1.3] flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
            <Trophy size="2rem" />
            <p className=" font-bold">1st Place</p>
            <p className="text-xl">$100</p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-lg">
            <Medal size="2rem" />
            <p className=" font-bold">3rd Place</p>
            <p className="text-xl">$25</p>
          </div>
        </div>
        <p className="text-xl">
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
    <Section className="bg-neutral-900">
      <div className="mx-auto grid max-w-[30rem] gap-y-8 text-black md:max-w-[60rem]">
        <p className="text-center text-4xl font-bold text-white">PAST EVENTS</p>
        <Card>
          <div className="grid grid-cols-1 gap-8 rounded-xl p-4 md:grid-cols-2">
            <Image
              alt="penn-state-img"
              className="rounded-md brightness-[105%] saturate-[120%]"
              src={HackPSH2023Fall}
            />
            <div className="flex flex-col justify-between">
              <p className="text-3xl font-bold">HackPSH Fall 2023</p>
              <p className="my-4">
                The Fall 2023 Hackathon, organized by IEEE, was a vibrant event
                with over 70 students participating. It facilitated
                collaboration across disciplines, offering a mix of
                team-building, workshops, building a project, and networking
                with faculty, alumni, and industry professionals. Challenges
                ranged from basic programming like Hello World to developing an
                algorithm to minimize the waiting time in a hypothetical pizza
                restaurant, with each participant receiving an Arduino kit for
                the circuit challenges. The event also featured a partnership
                with TRC Companies, Inc., insights from industry professionals,
                and the introduction of the HackPSH platform for coding
                challenges and live updates.
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
          <div className="grid grid-cols-1 gap-8 rounded-xl p-4 md:grid-cols-2">
            <picture>
              <Image
                alt="penn-state-img"
                className="rounded-md brightness-[105%] saturate-[120%]"
                src={HackPSH2023Spring}
              />
            </picture>

            <div className="flex flex-col justify-between">
              <p className="text-3xl font-bold">HackPSH Spring 2023</p>
              <p className="my-4">
                The Spring 2023 Hackathon at Penn State Harrisburg, co-hosted by
                IEEE and ACM, was a success, drawing students across majors to
                engage in hardware and software projects, including Arduino
                programming and circuit building. The event fostered
                team-building, workshops, and networking with over 60 students
                participating, some without prior coding experience. Sponsors
                like Capgemini Engineering and The Pennsylvania Air National
                Guard Recruiting played a key role, with plans to build on this
                success for the upcoming Fall Hackathon.
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
      <ContactSection className="bg-black" title="Have a Question?" />
    </>
  );
}

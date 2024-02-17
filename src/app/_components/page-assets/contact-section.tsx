import { Button } from "../ui/button";
import Section from "./section";

export default function ContactSection({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <Section className={`${className} px-4 sm:px-6 lg:px-8`} >
      <div className="flex flex-col items-center space-y-4 sm:space-y-6 text-center text-white">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</p>
        <p className="text-sm sm:text-base md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <Button className="mt-auto w-full sm:w-64 md:w-72 bg-white hover:bg-white/80 text-sm sm:text-base md:text-lg">
          Contact Us
        </Button>
      </div>
    </Section>
  );
}

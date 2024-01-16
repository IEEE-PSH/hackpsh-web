import { Button } from "../ui/button";
import Section from "./section";

export default function ContactSection({
  title,
  bg,
}: {
  title: string;
  bg: string;
}) {
  return (
    <Section bg={bg}>
      <div className="flex flex-col items-center space-y-6 text-center text-white">
        <p className="text-4xl font-bold">{title}</p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <Button className="mt-auto w-48 bg-white text-lg hover:bg-white/80">
          Contact Us
        </Button>
      </div>
    </Section>
  );
}

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
    <Section className={className}>
      <div className="flex flex-col items-center space-y-6 text-center text-white">
        <p className="text-4xl font-bold">{title}</p>
        <Button className="mt-auto w-48 bg-white hover:bg-white/80">
          Contact Us
        </Button>
      </div>
    </Section>
  );
}

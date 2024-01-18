import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | HackPSH",
  description:
    "Our partners help us make this event! Please consider partnerring with us.",
};

export default function Page() {
  return (
    <div>
      <p className="m-10 text-center text-3xl font-bold">Partners</p>
    </div>
  );
}

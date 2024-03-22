import ContactSection from "@/app/_components/page-assets/contact-section";
import Section from "@/app/_components/page-assets/section";
import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/app/_components/ui/card";
import PartnersHeroSvg from "@/app/../../public/hackpsh-partners-1.svg";
import { type Metadata } from "next";
import Image from "next/image";
import AdvancedConversionTechnologyLogo from "@/../public/sponsors/Advanced_Conversion_Technology_Logo.png";
import AmphenolLogo from "@/../public/sponsors/Amphenol_Logo.png";
import DeloitteLogo from "@/../public/sponsors/Deloitte_Logo.jpg";
import FootLockerLogo from "@/../public/sponsors/Foot_Locker_Logo.png";
import MicrochipLogo from "@/../public/sponsors/Microchip-Logo.png";
import RohdeSchwarzLogo from "@/../public/sponsors/Rohde_Schwarz_Logo.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partners | HackPSH",
  description:
    "Our partners help us make this event! Please consider partnerring with us.",
};

function PartnersHero() {
  return (
    <section className="bg-background text-foreground">
      <div className="container">
        <div className="flex flex-row justify-between py-6">
          <div className="flex flex-col space-y-6 md:space-y-4 justify-center">
            <h2 className="text-6xl font-bold">Partners</h2>
            <p className="text-lg text-muted-foreground max-w-[44rem]">
              We're thrilled to partner with exceptional organizations that share our passion for innovation and community-driven experiences.
              These partners play a pivotal role in making each event unforgettable, and we're excited to introduce them to you!
            </p>
          </div>
          <Image src={PartnersHeroSvg} width={300} alt="Graphical Element" className="hidden md:flex" />
        </div>
      </div>
    </section>
  );
}

type PartnerSpotCardProps = {
  name: string,
  description: string,
  image_src: string | StaticImport,
  image_alt: string,
  partner_url: string,
};

function PartnerSpotCard({ name, description, image_src, image_alt, partner_url }: PartnerSpotCardProps) {
  return (
    <Card className="mx-auto grid gap-y-8 text-foreground">
      <div className="flex flex-row">
        <Image
          alt={image_alt}
          src={image_src}
          className="hidden object-contain md:block"
          width={400}
          height={400}
        />
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="p-0 text-3xl">{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button className="text-md w-32" asChild>
              <Link href={partner_url} target="_blank">
                Visit
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

type PartnerDetail = PartnerSpotCardProps;

function createPartnerSpotCards(allPartners: PartnerDetail[]) {
  const partnerSpotCardElements: JSX.Element[] = [];

  allPartners.forEach(
    (partnerDetails, partnerIndex) =>
      partnerSpotCardElements.push(
        <PartnerSpotCard key={partnerIndex} {...partnerDetails} />
      )
  )

  return partnerSpotCardElements;
}

function PartnersInfo() {
  const partnerDetails: PartnerDetail[] = [
    {
      name: "Advanced Conversion Technology",
      description: "Advanced Conversion Technology (ACT), founded in 1981 in Middletown, PA, specializes in military AC-DC and DC-DC power supplies. With over 40 years in the industry, ACT meets stringent environmental, performance, and miniaturization standards, producing over a thousand designs and establishing itself as a leader in its field.",
      image_src: AdvancedConversionTechnologyLogo,
      image_alt: "Advanced Conversion Technology Company Logo",
      partner_url: "https://www.actpower.com/",
    },
    {
      name: "Amphenol",
      description: "Amphenol is a global leader in high-technology interconnect, sensor, and antenna solutions, serving a wide range of markets such as automotive, broadband communications, aerospace, defense, and IT. The company's extensive product range supports essential applications across diverse industries, demonstrating its significant expertise and impact.",
      image_src: AmphenolLogo,
      image_alt: "Amphenol Company Logo",
      partner_url: "https://amphenol.com/",
    },
    {
      name: "Deloitte",
      description: "Deloitte, one of the Big Four accounting firms, is a British multinational professional services network. It is the largest in the world by revenue and number of employees. Deloitte offers services in audit and assurance, consulting, financial advisory, risk advisory, tax, and legal across more than 150 countries and territories, employing over 415,000 professionals.",
      image_src: DeloitteLogo,
      image_alt: "Deloitte Company Logo",
      partner_url: "https://www.deloitte.com/"
    },
    {
      name: "Foot Locker",
      description: "Foot Locker is a leading global retailer specializing in athletic footwear, apparel, and accessories. It caters to the needs of sneaker enthusiasts and provides a wide selection of premium products for various activities, including basketball, running, and training. Foot Locker is known for offering the hottest sneaker drops and freshest finds from top brands like Jordan, Nike, Under Armour, New Balance, and many others.",
      image_src: FootLockerLogo,
      image_alt: "Foot Locker Company Logo",
      partner_url: "https://www.footlocker.com/"
    },
    {
      name: "Microchip",
      description: "Microchip Technology, established in 1987, is a leading supplier of programmable memory, microcontrollers, digital signal processors, and integrated circuits. It delivers smart, connected, and secure embedded control solutions for diverse sectors including industrial, automotive, consumer, aerospace, and defense, highlighting its key role in advancing technology across various industries.",
      image_src: MicrochipLogo,
      image_alt: "Microchip Company Logo",
      partner_url: "https://www.microchip.com/"
    },
    {
      name: "Rohde & Schwarz",
      description: "Rohde & Schwarz, headquartered in Munich, Germany, is a leading international electronics group specializing in test equipment, broadcast & media, cybersecurity, radio monitoring, radiolocation, and radiocommunication. The company offers advanced products for wireless communications and various industries, focusing on creating a safer, more connected world. It serves industrial, regulatory, and military customers globally.",
      image_src: RohdeSchwarzLogo,
      image_alt: "Rohde & Schwarz Company Logo",
      partner_url: "https://www.rohde-schwarz.com/"
    }
  ];

  return (
    <Section className="bg-background-variant">
      <div className="flex flex-col space-y-8">
        {createPartnerSpotCards(partnerDetails)}
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <>
      <PartnersHero />
      <PartnersInfo />
      <ContactSection title="Innovate with Us!" cta="Join Us!" />
    </>
  );
}

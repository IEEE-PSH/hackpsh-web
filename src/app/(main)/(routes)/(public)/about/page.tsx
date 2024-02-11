import Section from "@/app/_components/page-assets/section";
import { Button } from "@/app/_components/ui/button";
import { type Metadata } from "next";
import ContactSection from "@/app/_components/page-assets/contact-section";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
};

function A() {
  return (
    <Section className="bg-slate-800">
      <h1 className="text-4xl font-bold text-center">About US</h1>
      
      <p className="text-center mt-6">Hello There</p>
    </Section>
  )
}



function Officers() {
  return (
    <Section >
      <h1 className="text-4xl font-bold text-center mt-5">IEEE Officers</h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
      </div>
       
    </Section>
  )
}

function Helpers() {
  return (
    <Section className="bg-white">
      <h1 className="text-4xl font-bold text-center text-black">Helpers</h1>
      <div className="grid grid-cols-2 gap-10 text-black">
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">John Smith</h1>
          <p>frjfjrfr</p>
        </div>
      </div>
       
    </Section>
  )
  
  
}

function Feedback() {
  return (
    <Section className="bg-neutral-950">
      <div className="flex min-h-[15rem] justify-center text-center items-center space-y-8 flex-col text-white">
        <h1 className="text-4xl font-bold text-center">Feedback</h1>
      
        <p className="text-center mt-6">If you have any questions please click the button below.</p>
      
        <Button className="text-xl h-12 w-48 bg-white hover:bg-white/80 text-center">
                Contact Us
        </Button>
      </div>
    </Section>
  )
}

export default function Page() {
  return (
    <>
      <A></A>
      <Officers></Officers>
      <Helpers></Helpers>
      <ContactSection className="bg-black" title="Have Feedback?" />

      
    </>
  );
}


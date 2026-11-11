import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Channels } from "@/components/sections/Channels";
import { InboxSection } from "@/components/sections/Inbox";
import { Workspaces } from "@/components/sections/Workspaces";
import { TeamSecurity } from "@/components/sections/TeamSecurity";
import { Automation } from "@/components/sections/Automation";
import { Campaigns } from "@/components/sections/Campaigns";
import { People } from "@/components/sections/People";
import { Customize } from "@/components/sections/Customize";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Channels />
        <InboxSection />
        <Workspaces />
        <TeamSecurity />
        <Automation />
        <Campaigns />
        <People />
        <Customize />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

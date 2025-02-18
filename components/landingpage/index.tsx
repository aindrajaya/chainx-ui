"use client"

import Head from "next/head";
import { Header } from "../organisms/Header";
import { HeroSection } from "../organisms/HeroSection";
import { FeaturesSection } from "../organisms/FeaturesSection";
import { ExampleSection } from "../organisms/ExampleSection";
import { ContactSection } from "../organisms/ContactSection";
import { Footer } from "../organisms/Footer";

export default function HomeAtomic() {
    return (
      <div className="min-h-screen bg-white">
        <Head>
          <title>ChainX - Secure Smart Contracts</title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://cdn.tailwindcss.com"></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          ></script>
        </Head>
        <Header />
        <main className="pt-20">
          <HeroSection />
          <FeaturesSection />
          <ExampleSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    );
  }
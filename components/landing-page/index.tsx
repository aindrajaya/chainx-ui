import Head from "next/head"
import Header from "./elements/Header"
import Hero from "./elements/Hero"
import HowItWorks from "./elements/HowItWorks"
import Example from "./elements/Example"
import Features from "./elements/Features"
import Contact from "./elements/Contact"
import Footer from "./elements/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ChainX: Secure Your Smart Contracts with Confidence</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="pt-20">
        <Hero />
        <HowItWorks />
        <Example />
        <Features />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}


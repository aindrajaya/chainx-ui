"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Sparkles, ArrowRight, MessageSquare, FileSearch, BarChart3, Lock, Zap, Mail, MapPin, ShieldCheck, Construction, Code2, Github, GitPullRequest, Link2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/theme-toggle";
import Header from "@/components/ui/Header";
import Image from "next/image";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [reportFormat, setReportFormat] = useState("markdown");
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (reportFormat === "markdown") {
      fetch("/sample-report.md")
        .then((res) => res.text())
        .then((text) => setMarkdownContent(text));
    }
  }, [reportFormat]);

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#0D1117]">
      {/* Navigation */}
      {/* <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 grid place-items-center rounded-md bg-primary/10 text-primary">
              <Shield className="size-5" />
            </div>
            <span className="font-semibold tracking-tight">ChainX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-primary">How it works</a>
            <a href="#report" className="hover:text-primary">Report</a>
            <a href="#pricing" className="hover:text-primary">Pricing</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
            <Button className="inline-flex">Get started</Button>
          </div>
        </div>
      </header> */}
      <Header />

      
      <main>
        {/* Hero */}
        <section className="bg-background dark:bg-[#0D1117] border-b border-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left Column: Text Content */}
              <div className="text-center md:text-left">
                <p className="font-semibold text-green-400 mb-2">ChainX Insider</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  The Ultimate Blockchain Scanner for Real-Time Analysis
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Smart Contract Security Scanning Made Simple, Easy, & Safe just few seconds in your workspace.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Link
                    href="/auth/register"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
                  >
                    Try for free
                  </Link>
                  <Link
                    href="#features"
                    className="bg-secondary hover:bg-secondary/80 border text-secondary-foreground font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Explore Use Case <span>&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="flex justify-center">
                <img
                  src="/images-animation.svg"
                  alt="A code editor showing smart contract analysis by ChainX"
                  width={600}
                  height={450}
                  className="rounded-lg dark:shadow-2xl dark:shadow-green-900/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" aria-labelledby="features-heading" className="bg-background dark:bg-[#0D1117] py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-semibold text-green-400">Productivity</p>
              <h2 id="features-heading" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Enhanced Security & Efficiency with Real-time Scanner
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: 'Unprecedented Security Realtime',
                  description: 'Our scanner ensures that your platform remains resistant to unauthorized access, tampering, and data breaches.',
                  icon: ShieldCheck,
                },
                {
                  name: 'Trustworthy Data Integrity',
                  description: 'With our Blockchain Scanner, you can guarantee the integrity of your data by leveraging blockchain\'s immutability.',
                  icon: Lock,
                },
                {
                  name: 'Seamless Integration & Scalability',
                  description: 'Our scanner can be easily integrated into your system, ensuring a smooth and hassle-free implementation process.',
                  icon: Code2,
                },
                {
                  name: 'Streamlined Compliance',
                  description: 'Our Systems simplifies the compliance process by automatically auditing and tracking.',
                  icon: Construction,
                },
              ].map((feature) => (
                <div key={feature.name} className="bg-secondary/50 dark:bg-[#161B22] p-8 rounded-lg border">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary dark:bg-gray-800 mb-6">
                    <feature.icon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.name}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Integration Section */}
        <section id="workflow" aria-labelledby="workflow-heading" className="bg-background dark:bg-[#0D1117] py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 id="workflow-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Seamless Integration with Your Workflow
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                ChainX works directly within your development environment, eliminating context switching and making security a natural part of the development process.
              </p>
            </div>

            <div className="mt-16 flex justify-center items-center space-x-8">
              <Github className="h-12 w-12" />
              <div className="flex-grow h-px bg-green-500/50 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-blue-500/20 rounded-full">
                  <Link2 className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <Zap className="h-12 w-12" />
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-secondary/50 dark:bg-[#161B22] p-8 rounded-lg border">
                <GitPullRequest className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold">GitHub Integration</h3>
                <p className="mt-2 text-base text-muted-foreground">Automated security scans on every pull request.</p>
              </div>
              <div className="bg-secondary/50 dark:bg-[#161B22] p-8 rounded-lg border">
                <Code2 className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold">VS Code Extension</h3>
                <p className="mt-2 text-base text-muted-foreground">Get real-time vulnerability feedback directly in your editor.</p>
              </div>
              <div className="bg-secondary/50 dark:bg-[#161B22] p-8 rounded-lg border">
                <Zap className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold">Effortless Setup</h3>
                <p className="mt-2 text-base text-muted-foreground">Connect your accounts in minutes and start scanning immediately.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security report mockup */}
        <section id="report" aria-labelledby="report-heading" className="bg-secondary/50 dark:bg-[#0D1117] border-y">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <div className="space-y-4">
                <h2 id="report-heading" className="text-2xl md:text-3xl font-semibold tracking-tight">Security report preview</h2>
                <p className="text-muted-foreground">An example of what your team receives after each analysis run.</p>
                <ul className="space-y-3">
                  {["Reentrancy vulnerability in Vault.withdraw()", "Unchecked call return value in Token.mint()", "Insecure randomness source in Lottery.draw()"].map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 text-primary" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Button>Request a sample report</Button>
                </div>
              </div>
              <Card className="overflow-hidden">
                <CardHeader className="border-b flex flex-row items-center justify-between">
                  <CardTitle className="text-base">
                    {reportFormat === "markdown" ? "findings.md" : "report.pdf"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={reportFormat === "markdown" ? "secondary" : "ghost"}
                      onClick={() => setReportFormat("markdown")}
                    >
                      Markdown
                    </Button>
                    <Button
                      size="sm"
                      variant={reportFormat === "pdf" ? "secondary" : "ghost"}
                      onClick={() => setReportFormat("pdf")}
                    >
                      PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {reportFormat === "markdown" ? (
                    <pre className="m-0 p-4 text-sm overflow-auto leading-relaxed bg-card dark:bg-[#161B22] h-[400px]">
                      {markdownContent}
                    </pre>
                  ) : (
                    <div className="h-[400px]">
                      <iframe src="/sample-report.pdf" width="100%" height="100%" />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t text-xs text-muted-foreground">
                  Generated by ChainX AI • EVM target • Solidity 0.8.x
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" aria-labelledby="pricing-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 id="pricing-heading" className="text-3xl md:text-4xl font-semibold tracking-tight">Simple pricing</h2>
            <p className="text-muted-foreground mt-3">Start auditing today. Upgrade anytime.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* $15/month */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Starter</CardTitle>
                  <Badge>Most popular</Badge>
                </div>
                <div className="mt-2 text-4xl font-semibold tracking-tight">$15<span className="text-lg font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Unlimited analyses on small repos</div>
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Autogenerated fix suggestions</div>
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Shareable PDF reports</div>
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Email support</div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  onClick={async () => {
                    try {
                      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/subscription/create`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          // Add auth header if needed
                        },
                        body: JSON.stringify({
                          userId: 'user-id-here', // Replace with actual user ID
                          email: email,
                        }),
                      });
                      const data = await response.json();
                      if (data.approvalUrl) {
                        window.location.href = data.approvalUrl;
                      } else {
                        alert('Subscription created successfully!');
                      }
                    } catch (error) {
                      console.error('Subscription error:', error);
                      alert('Failed to create subscription');
                    }
                  }}
                >
                  Subscribe with PayPal
                </Button>
                <div className="text-xs text-muted-foreground text-center">Subscribe using your PayPal account</div>
              </CardFooter>
            </Card>

            {/* $50/month - Coming Soon */}
            <Card className="relative opacity-90">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pro</CardTitle>
                  <Badge variant="outline" className="border-dashed">Coming soon</Badge>
                </div>
                <div className="mt-2 text-4xl font-semibold tracking-tight">$50<span className="text-lg font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Large monorepo support</div>
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> CI/CD & GitHub checks</div>
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Custom rules & policy gates</div>
                <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Priority support</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" disabled className="w-full">Join waitlist</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer id="contact" className="border-t bg-muted/50 dark:bg-[#0D1117] text-foreground backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 grid place-items-center rounded-lg bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
                  <Image 
                    alt="main logo"
                    src="/default.ico"
                    width={50}
                    height={50}
                  />
                </div>
                <span className="text-2xl font-bold tracking-tight">ChainX</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                AI-first security platform for smart contracts. Build, deploy, and monitor with enterprise-grade protection and real-time threat intelligence.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Product</h3>
              <nav className="flex flex-col space-y-3">
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Features
                </Link>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Pricing
                </Link>
                <Link href="#security" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Security
                </Link>
                <Link href="#integrations" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Integrations
                </Link>
              </nav>
            </div>

            {/* Contact & Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contact & Support</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-medium">Email</p>
                    <a href="mailto:hello@chainx.id" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      hello@chainx.id
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-medium">Support</p>
                    <a href="mailto:support@chainx.id" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      support@chainx.id
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-medium">Location</p>
                    <p className="text-muted-foreground text-sm">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Get the latest security insights and product updates delivered to your inbox.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-10 bg-background border border-border rounded-md px-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring transition-colors"
                  />
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  No spam, unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ChainX Labs, Inc. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
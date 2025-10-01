"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Sparkles, ArrowRight, MessageSquare, FileSearch, BarChart3, Lock, Zap, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import Header from "@/components/ui/Header";
import Image from "next/image";

export default function HomePage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_top_right,theme(colors.primary)/6%,transparent_60%)] dark:bg-[radial-gradient(60rem_40rem_at_top_right,theme(colors.primary)/12%,transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <Badge className="gap-2 w-fit mx-auto lg:mx-0" variant="secondary">
                <Sparkles className="size-4" /> AI-powered Smart Contract Security
              </Badge>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                Ship faster with autonomous audits for your Web3 code
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                ChainX continuously analyzes Solidity, Vyper, and Rust smart contracts to detect vulnerabilities before they cost you. Instant insights, actionable fixes, and shareable reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <div className="flex w-full sm:w-auto items-center gap-2 bg-secondary border rounded-md px-2 pr-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full sm:w-72 bg-transparent outline-none px-2"
                  />
                  <Button onClick={() => alert(`Thanks! We'll reach out at ${email || "your email"}.`)}>
                    Join waitlist
                  </Button>
                </div>
                <Link href="#how" className="inline-flex">
                  <Button variant="outline" className="w-full sm:w-auto gap-2 h-12">
                    See how it works <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Lock className="size-4" /> SOC2-ready practices</div>
                <div className="flex items-center gap-2"><Zap className="size-4" /> CI/CD integrations</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl border bg-card shadow-sm overflow-hidden">
                <img
                  // src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1600&auto=format&fit=crop"
                  src="/hero1.png"
                  alt="Code security dashboard"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="size-4 text-primary" /> Real-time static + symbolic analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">How ChainX works</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">From submission to detailed findings in minutes. Our AI-powered platform makes smart contract security audits fast, accurate, and actionable.</p>
        </div>

        {/* Step-by-step process - improved layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop connection line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: 1,
                title: "Submit",
                description: "Upload your repo, paste code, or connect GitHub. Choose EVM/Vyper/Rust targets.",
                icon: <FileSearch className="size-6" />,
                gradient: "from-green-700 to-green-800"
              },
              {
                step: 2,
                title: "Analyze",
                description: "AI + formal methods run static analysis, test generation, and symbolic execution.",
                icon: <BarChart3 className="size-6" />,
                gradient: "from-green-700 to-green-800"
              },
              {
                step: 3,
                title: "Report",
                description: "Get prioritized findings with proofs of exploit, code paths, and suggested fixes.",
                icon: <MessageSquare className="size-6" />,
                gradient: "from-green-600 to-green-700"
              }
            ].map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center group">
                {/* Step number */}
                <div className={`relative inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-r ${step.gradient} text-white font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-all duration-300 z-10`}>
                  {step.step}
                  {/* Pulse effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.gradient} animate-ping opacity-20`}></div>
                </div>

                {/* Card */}
                <Card className="w-full h-full group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-500 border-2 group-hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${step.gradient} text-white shadow-lg`}>
                        {step.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Mobile arrow */}
                {index < 2 && (
                  <div className="md:hidden flex justify-center my-8">
                    <ArrowRight className="size-6 text-primary/60 animate-bounce" />
                  </div>
                )}

                {/* Desktop arrow */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-8 -right-6 z-20">
                    <div className="relative">
                      <ArrowRight className="size-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                      <div className="absolute inset-0 animate-pulse">
                        <ArrowRight className="size-8 text-primary/30" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced feature highlights */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Why Choose ChainX?</h3>
            <p className="text-muted-foreground mt-3">Advanced security analysis powered by cutting-edge AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <Shield className="size-8" />,
                title: "Deep static analysis",
                desc: "Detect reentrancy, overflows, access control flaws, and more with comprehensive vulnerability scanning.",
                gradient: "from-green-700 to-green-800"
              },
              {
                icon: <Zap className="size-8" />,
                title: "Risk scoring",
                desc: "CVSS-like severity with gas and exploitability metrics for prioritized remediation.",
                gradient: "from-green-700 to-green-800"
              },
              {
                icon: <Check className="size-8" />,
                title: "Actionable fixes",
                desc: "Human-readable patch suggestions and references to resolve issues quickly.",
                gradient: "from-green-600 to-green-700"
              }
            ].map((feature, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 shadow-lg">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-xl mb-2">Ready to secure your contracts?</h4>
              <p className="text-muted-foreground">Get started with ChainX today and ship with confidence</p>
            </div>
            <Button size="lg" className="gap-2 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Start Free Trial <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Security report mockup */}
      <section id="report" className="bg-secondary/50 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Security report preview</h3>
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
              <CardHeader className="border-b">
                <CardTitle className="text-base">findings.md</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <pre className="m-0 p-4 text-sm overflow-auto leading-relaxed bg-card">
{`# ChainX Audit Findings

## [CRITICAL] Reentrancy in Vault.withdraw()
- Impact: Attacker drains funds via reentrant callback
- Recommendation: Add reentrancy guard and checks-effects-interactions pattern

## [HIGH] Access control bypass in Admin.upgrade()
- Impact: Unauthorized upgrades possible
- Recommendation: Use onlyOwner and multi-sig confirmation

## [MEDIUM] Integer overflow in Reward.calculate()
- Impact: Reward inflation under edge conditions
- Recommendation: Use SafeMath or solidity ^0.8 checked arithmetic

---
Summary: 3 issues (1 Critical, 1 High, 1 Medium)
Confidence: High | Gas Impact: Low
`}
                </pre>
              </CardContent>
              <CardFooter className="border-t text-xs text-muted-foreground">
                Generated by ChainX AI • EVM target • Solidity 0.8.x
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Simple pricing</h2>
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

      {/* Footer */}
      <footer id="contact" className="border-t bg-muted/50 dark:bg-[#181818] text-foreground backdrop-blur-sm">
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
                    <a href="mailto:hello@chainx.ai" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      hello@chainx.ai
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-medium">Support</p>
                    <a href="mailto:support@chainx.ai" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      support@chainx.ai
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
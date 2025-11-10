"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="font-semibold text-primary">Pricing</p>
        <h2 id="pricing-heading" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
          Transparent and Straightforward
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Choose the right plan for your needs. All plans come with our core security features.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 items-stretch">
        {/* Basic Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>For individuals and small teams getting started.</CardDescription>
            <div className="mt-4 text-4xl font-semibold tracking-tight">$29<span className="text-lg font-normal text-muted-foreground">/month</span></div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Real-time scanning</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Basic vulnerability reports</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Email support</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Up to 10 scans/day</div>
          </CardContent>
          <CardFooter>
            <a
              href="https://chainx-ai.lemonsqueezy.com/buy/f7ec5b9d-42f4-4792-bf59-7be05c087123"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full cursor-pointer">Get Started</Button>
            </a>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col border-2 border-primary shadow-lg shadow-primary/10 relative">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">MOST POPULAR</Badge>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For growing businesses and professional developers.</CardDescription>
            <div className="mt-4 text-4xl font-semibold tracking-tight">$99<span className="text-lg font-normal text-muted-foreground">/month</span></div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> All features from Basic</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Advanced vulnerability analysis</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Priority email & chat support</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Unlimited scans</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> API Access</div>
          </CardContent>
          <CardFooter>
            <a
              href="https://chainx-ai.lemonsqueezy.com/buy/0e6b56fb-f842-4077-8092-a3eaa6442fbe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-white cursor-pointer">Get Started</Button>
            </a>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large organizations with custom needs.</CardDescription>
            <div className="mt-4 text-4xl font-semibold tracking-tight">Custom</div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> All features from Pro</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Dedicated account manager</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> Custom integrations</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> On-premise deployment</div>
            <div className="flex items-center gap-2"><Check className="size-4 text-primary" /> 24/7 premium support</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full cursor-pointer">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

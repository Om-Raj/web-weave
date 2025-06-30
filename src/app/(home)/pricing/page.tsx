"use client";

import Image from "next/image";
import { PricingTable } from "@clerk/nextjs";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { dark } from "@clerk/themes";

const Page = () => {
  const theme = useCurrentTheme();

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-40">
        <div className="flex flex-col items-center justify-center">
          <Image 
            src="/logo.svg"
            alt="Web Weave"
            width={50}
            height={50}
            />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-center">Pricing</h1>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          Choose the plan that&apos;s right for you.
        </p>
          <PricingTable 
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                pricingTableCard: "border! shadow-none! rounded-lg!",
              }
            }}
          />
      </section>
    </div>
  );
};

export default Page;
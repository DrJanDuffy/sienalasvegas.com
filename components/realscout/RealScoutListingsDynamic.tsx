"use client";

import dynamic from "next/dynamic";

const RealScoutListings = dynamic(
  () => import("@/components/realscout/RealScoutListings"),
  {
    ssr: false,
    loading: () => (
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-slate-600 text-lg">
                Discover homes at Siena and Las Vegas 55+ communities
              </p>
            </div>
          </div>
          <div className="min-h-[280px] flex items-center justify-center text-slate-500">
            Loading listings…
          </div>
        </div>
      </section>
    ),
  }
);

export default RealScoutListings;

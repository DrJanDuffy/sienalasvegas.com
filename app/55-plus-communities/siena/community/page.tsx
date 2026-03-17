import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { sienaCommunityPage } from "@/lib/siena-pages";

export const metadata: Metadata = {
  title: "Siena Community | Location & Overview | Dr. Jan Duffy",
  description:
    "Siena is a 667-acre age-privileged community in Summerlin South with 2,001 single-family homes and villas. Golf course living, I-215 access, Downtown Summerlin nearby. Dr. Jan Duffy, Siena real estate.",
  openGraph: {
    title: "Siena Community | Location & Overview",
    description:
      "667-acre 55+ community in Summerlin South. 2,001 homes and villas, championship golf, I-215 Beltway, Downtown Summerlin.",
  },
};

export default function SienaCommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/55-plus-communities" className="hover:text-blue-600">
                55+ Communities
              </Link>
              {" / "}
              <Link href="/55-plus-communities/siena" className="hover:text-blue-600">
                Siena
              </Link>
              {" / "}
              <span className="text-slate-900">Community</span>
            </nav>

            <div className="flex items-center gap-3 mb-8">
              <MapPin className="h-10 w-10 text-emerald-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                {sienaCommunityPage.title}
              </h1>
            </div>

            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <p>{sienaCommunityPage.intro}</p>
              <p>{sienaCommunityPage.location}</p>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              <a
                href={sienaCommunityPage.link55places}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                See what 55places.com has to say about Siena →
              </a>
            </p>

            <p className="mt-8 text-slate-600">
              For real estate in Siena, contact{" "}
              <strong>Dr. Jan Duffy</strong>:{" "}
              <a href="tel:+17025001942" className="text-blue-600 hover:underline">
                (702) 500-1942
              </a>{" "}
              | sienalasvegas.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

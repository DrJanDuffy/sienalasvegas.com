import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Calendar, PartyPopper } from "lucide-react";
import type { Metadata } from "next";
import { sienaEventsPage } from "@/lib/siena-pages";

export const metadata: Metadata = {
  title: "Siena Events & Activities | Lifestyle, Signature Events | Dr. Jan Duffy",
  description:
    "Siena Lifestyle Department and Social Committee events: Sienafest, New Year's Eve Gala, Smith Center trips, trivia, BINGO, Golf & Bistro events. Dr. Jan Duffy, Siena real estate.",
  openGraph: {
    title: "Siena Events & Activities",
    description:
      "Signature events, lifestyle activities, club events, and Siena Golf Club & Bistro events.",
  },
};

export default function SienaEventsActivitiesPage() {
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
              <span className="text-slate-900">Events & Activities</span>
            </nav>

            <div className="flex items-center gap-3 mb-8">
              <Calendar className="h-10 w-10 text-emerald-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                {sienaEventsPage.title}
              </h1>
            </div>

            <p className="text-slate-700 mb-6">{sienaEventsPage.intro}</p>
            <p className="text-slate-700 mb-10">{sienaEventsPage.intro2}</p>

            {/* Signature Events */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <PartyPopper className="h-6 w-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  {sienaEventsPage.signatureEvents.heading}
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {sienaEventsPage.signatureEvents.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Lifestyle Events */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {sienaEventsPage.lifestyleEvents.heading}
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {sienaEventsPage.lifestyleEvents.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Other Activities */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {sienaEventsPage.otherActivities.heading}
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {sienaEventsPage.otherActivities.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Golf & Bistro Events */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {sienaEventsPage.golfBistroEvents.heading}
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {sienaEventsPage.golfBistroEvents.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <p className="text-sm text-slate-500 mb-8">
              <a
                href={sienaEventsPage.sienalvEvents}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                More at sienalv.org →
              </a>
            </p>

            <p className="text-slate-600">
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

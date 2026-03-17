"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface PropertyCardProps {
  image: string;
  imageAlt: string;
  price: string;
  address?: string;
  city?: string;
  state?: string;
  beds?: number;
  baths?: number;
  sqft?: string | number;
  status?: string;
  agentName?: string;
  ctaLink: string;
  ctaLabel?: string;
}

export default function PropertyCard({
  image,
  imageAlt,
  price,
  address,
  city,
  state,
  beds,
  baths,
  sqft,
  status,
  agentName,
  ctaLink,
  ctaLabel = "View details",
}: PropertyCardProps) {
  const location = [address, city, state].filter(Boolean).join(", ");

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] bg-slate-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {status && (
            <span className="absolute top-2 left-2 rounded bg-slate-900/80 px-2 py-1 text-xs font-medium text-white">
              {status}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xl font-bold text-slate-900">{price}</p>
        {location && (
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{location}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
          {beds != null && <span>{beds} beds</span>}
          {baths != null && <span>{baths} baths</span>}
          {sqft != null && <span>{typeof sqft === "number" ? `${sqft} sqft` : sqft}</span>}
        </div>
        {agentName && (
          <p className="text-xs text-slate-500 mt-2">Listed by {agentName}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={ctaLink}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

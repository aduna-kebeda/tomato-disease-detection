"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroEnhanced = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8FT-seO8nieP93zbidqqlJ05CkyEl6RHrQ&s"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-10 top-1/3 h-48 w-48 md:h-64 md:w-64 lg:right-20 overflow-hidden rounded-full border-4 border-white/20">
        <Image
          src="https://pbs.twimg.com/media/F9sLypxXgAAOuEy.jpg"
          alt="Ethiopian Coffee Ceremony"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-20 right-32 h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-white/20">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nM5ceKYJGgh8WDNREw3_fXo12qWUC7RrdQ&s"
          alt="Lalibela Church"
          fill
          className="object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            From <span className="text-pink-500">Highlands</span> to Heritage:{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Explore</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 rounded-full -z-0"></span>
            </span>{" "}
            <span className="text-yellow-400">Ethiopia.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            From the peaks of the Simien Mountains to the depths of the Danakil, Ethiopia is waiting for you.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-lg p-2 flex items-center"
          >
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
              <Input
                type="text"
                placeholder="Search destinations, activities, or events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button type="submit" size="lg" className="ml-2 bg-pink-500 hover:bg-pink-600">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>

          {/* Location and Date */}
          <div className="flex flex-wrap items-center mt-8 gap-6">
            <div className="flex items-center text-white/80">
              <MapPin className="h-4 w-4 mr-1 text-pink-500" />
              <span className="text-sm">Addis Ababa, Dire Dawa</span>
            </div>
            <div className="flex items-center text-white/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">30 Aug, 2023</span>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-pink-500 text-white border-none hover:bg-pink-600"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEnhanced;

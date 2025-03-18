"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
          Discover the Beauty of Ethiopia
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
          Explore ancient history, breathtaking landscapes, and rich cultural heritage with our AI-powered travel
          platform
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
          <Button type="submit" size="lg" className="ml-2">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Addis Ababa
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Lalibela
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Axum
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Gondar
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Danakil Depression
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero


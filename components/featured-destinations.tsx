"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const destinations = [
  {
    id: 1,
    name: "Lalibela",
    description: "Famous for its rock-hewn churches, a UNESCO World Heritage site.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Amhara Region",
    rating: 4.9,
    category: "Historical",
  },
  {
    id: 2,
    name: "Danakil Depression",
    description: "One of the hottest places on Earth with colorful sulfur springs and salt formations.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Afar Region",
    rating: 4.7,
    category: "Natural Wonder",
  },
  {
    id: 3,
    name: "Simien Mountains",
    description: "Breathtaking mountain range with unique wildlife and stunning views.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Amhara Region",
    rating: 4.8,
    category: "National Park",
  },
  {
    id: 4,
    name: "Axum",
    description: "Ancient city with obelisks and archaeological sites from the Kingdom of Axum.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Tigray Region",
    rating: 4.6,
    category: "Historical",
  },
  {
    id: 5,
    name: "Omo Valley",
    description: "Home to diverse indigenous tribes with unique cultures and traditions.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Southern Nations",
    rating: 4.7,
    category: "Cultural",
  },
  {
    id: 6,
    name: "Blue Nile Falls",
    description: "Spectacular waterfall known locally as Tis Abay or 'smoking water'.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Amhara Region",
    rating: 4.5,
    category: "Natural Wonder",
  },
]

const FeaturedDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(destinations.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= destinations.length ? 0 : prevIndex + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? destinations.length - itemsPerPage : prevIndex - itemsPerPage,
    )
  }

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Destinations</h2>
          <p className="text-muted-foreground max-w-2xl">
            Explore Ethiopia's most iconic destinations, from ancient historical sites to breathtaking natural wonders
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleDestinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden group">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium py-1 px-2 rounded-full">
                {destination.rating} ★
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium py-1 px-2 rounded-full">
                {destination.category}
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{destination.location}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{destination.description}</p>
              <Button asChild className="w-full">
                <Link href={`/destinations/${destination.id}`}>Explore</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/destinations">View All Destinations</Link>
        </Button>
      </div>
    </section>
  )
}

export default FeaturedDestinations


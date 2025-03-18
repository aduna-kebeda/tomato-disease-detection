import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const itineraries = [
  {
    id: 1,
    title: "Historical Northern Circuit",
    description: "Explore the ancient historical sites of Northern Ethiopia including Lalibela, Axum, and Gondar.",
    image: "/placeholder.svg?height=600&width=800",
    duration: "7 days",
    bestSeason: "October - March",
    groupSize: "2-12 people",
    tags: ["Historical", "Cultural", "UNESCO"],
  },
  {
    id: 2,
    title: "Omo Valley Cultural Experience",
    description: "Immerse yourself in the diverse cultures of Ethiopia's Omo Valley tribes.",
    image: "/placeholder.svg?height=600&width=800",
    duration: "10 days",
    bestSeason: "Year-round",
    groupSize: "4-8 people",
    tags: ["Cultural", "Photography", "Tribal"],
  },
  {
    id: 3,
    title: "Ethiopian Highlands Trek",
    description: "Trek through the breathtaking landscapes of the Simien Mountains and Bale Mountains National Parks.",
    image: "/placeholder.svg?height=600&width=800",
    duration: "12 days",
    bestSeason: "September - April",
    groupSize: "2-10 people",
    tags: ["Adventure", "Trekking", "Wildlife"],
  },
  {
    id: 4,
    title: "Danakil Depression Expedition",
    description: "Venture into one of the hottest and most geologically active places on Earth.",
    image: "/placeholder.svg?height=600&width=800",
    duration: "5 days",
    bestSeason: "November - February",
    groupSize: "4-12 people",
    tags: ["Adventure", "Geological", "Extreme"],
  },
]

const PopularItineraries = () => {
  return (
    <section className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Popular Itineraries</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted travel itineraries to experience the best of Ethiopia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {itineraries.map((itinerary) => (
            <Card key={itinerary.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={itinerary.image || "/placeholder.svg"}
                  alt={itinerary.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{itinerary.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">{itinerary.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span>Best: {itinerary.bestSeason}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>{itinerary.groupSize}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {itinerary.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full mt-auto">
                  <Link href={`/itineraries/${itinerary.id}`}>
                    View Itinerary
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/itineraries">Browse All Itineraries</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PopularItineraries


import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar, Users, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const itineraries = [
  {
    id: 1,
    title: "Historical Northern Circuit",
    description: "Explore the ancient historical sites of Northern Ethiopia including Lalibela, Axum, and Gondar.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJouUkPdFcbU-AOs_9ww7SSKc1aGvwpteHLA&s",
    duration: "7 days",
    bestSeason: "October - March",
    groupSize: "2-12 people",
    tags: ["Historical", "Cultural", "UNESCO"],
  },
  {
    id: 2,
    title: "Omo Valley Cultural Experience",
    description: "Immerse yourself in the diverse cultures of Ethiopia's Omo Valley tribes.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW7Hn7oFAqqt0lfRGEJHHNLLAMNiMWlzDOfQ&s",
    duration: "10 days",
    bestSeason: "Year-round",
    groupSize: "4-8 people",
    tags: ["Cultural", "Photography", "Tribal"],
  },
  {
    id: 3,
    title: "Ethiopian Highlands Trek",
    description: "Trek through the breathtaking landscapes of the Simien Mountains and Bale Mountains National Parks.",
    image: "https://cdn.getyourguide.com/img/tour/183eaebf7dcb0d0ebd18da5428003b245e6d3a7c068aafdd245dce6d0e41c3d9.jpeg/146.jpg",
    duration: "12 days",
    bestSeason: "September - April",
    groupSize: "2-10 people",
    tags: ["Adventure", "Trekking", "Wildlife"],
  },
  {
    id: 4,
    title: "Danakil Depression Expedition",
    description: "Venture into one of the hottest and most geologically active places on Earth.",
    image: "https://res.cloudinary.com/tourhq/image/upload/fl_progressive,f_auto,h_507,w_900,g_auto,c_fill,q_auto/knice95chwzkup1dkqy1",
    duration: "5 days",
    bestSeason: "November - February",
    groupSize: "4-12 people",
    tags: ["Adventure", "Geological", "Extreme"],
  },
]

const PopularItinerariesEnhanced = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-[#E61C5D] mr-2" />
              <span className="text-[#E61C5D] font-medium uppercase tracking-wider">Curated Journeys</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Popular <span className="text-[#E61C5D]">Itineraries</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover our carefully crafted travel itineraries to experience the best of Ethiopia
            </p>
          </div>
          <Button asChild className="mt-6 md:mt-0 bg-[#E61C5D] hover:bg-pink-700 rounded-full">
            <Link href="/itineraries">
              View All Itineraries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {itineraries.map((itinerary, index) => (
            <Card
              key={itinerary.id}
              className={`overflow-hidden h-full flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 ${
                index % 2 === 1 ? "md:transform md:translate-y-6" : ""
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={itinerary.image || "/placeholder.svg"}
                  alt={itinerary.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{itinerary.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{itinerary.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-[#E61C5D]" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-[#E61C5D]" />
                    <span>Best: {itinerary.bestSeason}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-[#E61C5D]" />
                    <span>{itinerary.groupSize}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {itinerary.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-pink-50 text-[#E61C5D]">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full mt-auto bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                  <Link href={`/itineraries/${itinerary.id}`}>
                    View Itinerary
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularItinerariesEnhanced


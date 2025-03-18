import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Lalibela",
    description: "Famous for its rock-hewn churches, a UNESCO World Heritage site.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1iDTFe-y3EwJkQ4gavA2HUlbJSjQM0ha5A&s",
    location: "Amhara Region",
    rating: 4.9,
    category: "Historical",
  },
  {
    id: 2,
    name: "Danakil Depression",
    description: "One of the hottest places on Earth with colorful sulfur springs and salt formations.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6JrHF_no7qwjui2g0XHB1at3IkDt-Tq4yuw&s",
    location: "Afar Region",
    rating: 4.7,
    category: "Natural Wonder",
  },
  {
    id: 3,
    name: "Simien Mountains",
    description: "Breathtaking mountain range with unique wildlife and stunning views.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLVtkYVuNhAuVyb1xE9gardtKW1iyTV1AtQ&s",
    location: "Amhara Region",
    rating: 4.8,
    category: "National Park",
  },
  {
    id: 4,
    name: "Axum",
    description: "Ancient city with obelisks and archaeological sites from the Kingdom of Axum.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8XEl0f6q9flplHt-8wmg7NtY0DiWgrIMaMg&s",
    location: "Tigray Region",
    rating: 4.6,
    category: "Historical",
  },
]

const DestinationsGrid = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Explore <span className="text-pink-500">Breathtaking</span> Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most beautiful and fascinating places across Ethiopia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-primary-brand text-sm font-medium py-1 px-2 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                  {destination.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium py-1 px-2 rounded-full">
                  {destination.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-pink-500" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                <Button asChild className="w-full bg-pink-500 hover:bg-pink-600">
                  <Link href={`/destinations/${destination.id}`}>Explore</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" asChild className="border-pink-500 text-pink-500 hover:bg-pink-50">
            <Link href="/destinations">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DestinationsGrid


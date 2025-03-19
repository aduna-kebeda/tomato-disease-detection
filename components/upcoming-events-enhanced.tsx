import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Timkat Festival",
    description: "Experience Ethiopia's colorful Epiphany celebration with processions and ceremonies.",
    image: "https://images.unsplash.com/photo-1523805009345-7448936ea995?q=80&w=1472&auto=format&fit=crop",
    date: "January 19, 2025",
    time: "All day",
    location: "Gondar",
    category: "Religious",
  },
  {
    id: 2,
    title: "Great Ethiopian Run",
    description: "Join Africa's biggest road race through the streets of Addis Ababa.",
    image: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?q=80&w=1470&auto=format&fit=crop",
    date: "November 15, 2024",
    time: "8:00 AM - 12:00 PM",
    location: "Addis Ababa",
    category: "Sports",
  },
  {
    id: 3,
    title: "Meskel Festival",
    description: "Witness the Finding of the True Cross celebration with bonfires and ceremonies.",
    image: "https://images.unsplash.com/photo-1627306048632-0c1be3e87e8a?q=80&w=1470&auto=format&fit=crop",
    date: "September 27, 2024",
    time: "4:00 PM - 9:00 PM",
    location: "Addis Ababa",
    category: "Religious",
  },
]

const UpcomingEventsEnhanced = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-[#E61C5D] mr-2" />
              <span className="text-[#E61C5D] font-medium uppercase tracking-wider">Cultural Experiences</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Upcoming <span className="text-[#E61C5D]">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Don't miss these authentic Ethiopian cultural experiences and celebrations
            </p>
          </div>
          <Button asChild className="mt-6 md:mt-0 bg-[#E61C5D] hover:bg-pink-700 rounded-full">
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={event.id}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge
                    className={`
                    ${
                      event.category === "Religious"
                        ? "bg-purple-500"
                        : event.category === "Sports"
                          ? "bg-blue-500"
                          : event.category === "Cultural"
                            ? "bg-pink-500"
                            : "bg-green-500"
                    }
                  `}
                  >
                    {event.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-white mt-2">{event.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{event.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-[#E61C5D]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-[#E61C5D]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-[#E61C5D]" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full border-[#E61C5D] text-[#E61C5D] rounded-full hover:bg-pink-50">
                  <Link href={`/events/${event.id}`}>
                    Event Details
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

export default UpcomingEventsEnhanced


import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Timkat Festival",
    description: "Experience Ethiopia's colorful Epiphany celebration with processions and ceremonies.",
    date: "January 19, 2025",
    time: "All day",
    location: "Gondar",
    category: "Cultural",
  },
  {
    id: 2,
    title: "Great Ethiopian Run",
    description: "Join Africa's biggest road race through the streets of Addis Ababa.",
    date: "November 15, 2024",
    time: "8:00 AM - 12:00 PM",
    location: "Addis Ababa",
    category: "Sports",
  },
  {
    id: 3,
    title: "Meskel Festival",
    description: "Witness the Finding of the True Cross celebration with bonfires and ceremonies.",
    date: "September 27, 2024",
    time: "4:00 PM - 9:00 PM",
    location: "Addis Ababa",
    category: "Religious",
  },
]

const UpcomingEvents = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl">
            Don't miss these authentic Ethiopian cultural experiences and celebrations
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/events">
            View All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-5">
              <Badge className="mb-4">{event.category}</Badge>
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-muted-foreground mb-4">{event.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/events/${event.id}`}>Event Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default UpcomingEvents


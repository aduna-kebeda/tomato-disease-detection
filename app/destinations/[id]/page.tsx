import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Star, ArrowLeft, Share2, Heart, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Lalibela | Ethiopia Travel Platform",
  description: "Explore the rock-hewn churches of Lalibela, a UNESCO World Heritage site",
}

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the destination data based on the ID
  // For this example, we'll use hardcoded data for Lalibela
  const destination = {
    id: 1,
    name: "Lalibela",
    description:
      "Lalibela is famous for its rock-hewn churches, carved from solid rock in the 12th and 13th centuries. These monolithic churches are a testament to the faith and engineering skills of medieval Ethiopians. The site is a place of pilgrimage for Ethiopian Orthodox Christians and a UNESCO World Heritage site.",
    longDescription:
      "Lalibela is a town in the Amhara Region of Ethiopia, known for its distinctive rock-cut churches dating from the 12th and 13th centuries. The complex of 11 churches was carved out of solid rock and is still in use today. The churches are connected by a maze of tunnels and passages, with some rising to 40 feet high. King Gebre Mesqel Lalibela, who ruled Ethiopia at the turn of the 13th century, is credited with building these churches, which he intended to be a 'New Jerusalem' for those who could not make the pilgrimage to the Holy Land.",
    image: "/placeholder.svg?height=800&width=1200",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    location: "Amhara Region, Ethiopia",
    coordinates: "12.0319° N, 39.0453° E",
    rating: 4.9,
    reviews: 487,
    category: "Historical",
    tags: ["UNESCO", "Churches", "Religious", "Architecture"],
    bestTimeToVisit: "October to March (dry season)",
    entranceFee: "$50 USD for foreigners",
    openingHours: "6:00 AM - 5:00 PM daily",
    highlights: [
      "Church of Saint George (Bete Giyorgis)",
      "Church of the Savior of the World (Bete Medhane Alem)",
      "Church of the Holy Cross (Bete Meskel)",
      "Church of Saint Mary (Bete Maryam)",
      "Church of Golgotha (Bete Golgotha)",
    ],
    nearbyAttractions: [
      {
        name: "Yemrehana Krestos Church",
        distance: "12 km",
        description: "An earlier church built inside a cave, predating the rock-hewn churches of Lalibela.",
      },
      {
        name: "Asheton Maryam Monastery",
        distance: "7 km",
        description: "A monastery located on a mountain overlooking Lalibela, offering panoramic views.",
      },
    ],
    activities: [
      "Guided tours of the rock churches",
      "Attend Ethiopian Orthodox ceremonies",
      "Hiking in the surrounding mountains",
      "Photography",
      "Cultural experiences with local communities",
    ],
    accommodation: [
      {
        name: "Mountain View Hotel",
        type: "Hotel",
        priceRange: "$$$",
        description: "Upscale hotel with panoramic views of the mountains.",
      },
      {
        name: "Lalibela Lodge",
        type: "Lodge",
        priceRange: "$$",
        description: "Mid-range accommodation with traditional Ethiopian design.",
      },
      {
        name: "Ben Abeba",
        type: "Guesthouse",
        priceRange: "$",
        description: "Budget-friendly option with a famous restaurant.",
      },
    ],
    transportation: [
      "Flights to Lalibela Airport from Addis Ababa",
      "Road access (rough roads, 4x4 recommended)",
      "Local taxis and tuk-tuks within Lalibela",
      "Walking is the best way to explore the church complex",
    ],
    tips: [
      "Wear comfortable shoes as there is a lot of walking and climbing",
      "Dress modestly as these are active religious sites",
      "Hire a local guide for historical context",
      "Bring cash as ATMs may not always work",
      "Respect photography restrictions in certain areas",
    ],
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Button variant="outline" size="sm" className="mb-4 bg-white/20 text-white border-white/30" asChild>
            <Link href="/destinations">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Destinations
            </Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>
                {destination.rating} ({destination.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Best time: {destination.bestTimeToVisit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="practical">Practical Info</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                  <p className="text-muted-foreground mb-4">{destination.description}</p>
                  <p className="text-muted-foreground">{destination.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Activities</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {destination.activities.map((activity, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Nearby Attractions</h3>
                  <div className="space-y-3">
                    {destination.nearbyAttractions.map((attraction, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h4 className="font-semibold">{attraction.name}</h4>
                          <Badge variant="outline">{attraction.distance}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{attraction.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="highlights" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Highlights of {destination.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{highlight}</h3>
                        <p className="text-sm text-muted-foreground">
                          {/* In a real app, you would have descriptions for each highlight */}
                          Explore this magnificent structure, one of the most impressive rock-hewn churches in Lalibela.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.gallery.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${destination.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="practical" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Practical Information</h2>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="hours">
                    <AccordionTrigger>Opening Hours & Fees</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Opening Hours:</span>
                          <span>{destination.openingHours}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Entrance Fee:</span>
                          <span>{destination.entranceFee}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transportation">
                    <AccordionTrigger>Transportation</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {destination.transportation.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accommodation">
                    <AccordionTrigger>Accommodation</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {destination.accommodation.map((place, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold">{place.name}</h4>
                              <Badge variant="outline">{place.priceRange}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">{place.type}</div>
                            <p className="text-sm mt-2">{place.description}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tips">
                    <AccordionTrigger>Travel Tips</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {destination.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-muted rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href={`/itineraries/create?destination=${destination.id}`}>Add to Itinerary</Link>
                </Button>

                <Button variant="outline" className="w-full">
                  <Map className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-bold mb-3">Weather</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current:</span>
                  <span>22°C / 72°F, Sunny</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. High:</span>
                  <span>25°C / 77°F</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Low:</span>
                  <span>10°C / 50°F</span>
                </div>
                <div className="flex justify-between">
                  <span>Rainfall:</span>
                  <span>Minimal (Dry Season)</span>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-bold mb-3">Safety Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall Safety:</span>
                  <span className="text-green-500 font-medium">High</span>
                </div>
                <div className="flex justify-between">
                  <span>Health Services:</span>
                  <span className="text-amber-500 font-medium">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span>COVID Measures:</span>
                  <span className="text-green-500 font-medium">In Place</span>
                </div>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/safety">View Detailed Safety Info</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
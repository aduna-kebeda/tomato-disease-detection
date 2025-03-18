"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United States",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "My trip to Ethiopia was absolutely life-changing. The historical sites in Lalibela were breathtaking, and the AI recommendations from this platform helped me discover hidden gems I would have otherwise missed.",
  },
  {
    id: 2,
    name: "David Chen",
    location: "Canada",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "The Ethiopia Travel Platform made planning my adventure so easy. The itinerary suggestions were perfect, and the safety information gave me peace of mind throughout my journey in the Simien Mountains.",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Spain",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    text: "I was hesitant about traveling to Ethiopia alone, but this platform provided all the information I needed. The chatbot was incredibly helpful when I had questions during my trip to the Omo Valley.",
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Australia",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "The cultural insights provided by this platform enhanced my experience of Ethiopian festivals. Attending Timkat in Gondar was a highlight of my travels, and I felt well-prepared thanks to the detailed event information.",
  },
  {
    id: 5,
    name: "Aisha Mohammed",
    location: "United Arab Emirates",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "Ethiopia's coffee culture and cuisine were amazing to experience. The restaurant recommendations from this platform were spot on, and the business listings helped me find authentic experiences.",
  },
]

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsToShow = 3
  const totalPages = Math.ceil(testimonials.length / itemsToShow)

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1 >= totalPages ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 < 0 ? totalPages - 1 : prevIndex - 1))
  }

  const visibleTestimonials = testimonials.slice(activeIndex * itemsToShow, activeIndex * itemsToShow + itemsToShow)

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Traveler Experiences</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from travelers who have explored Ethiopia with our platform
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 mr-1",
                        i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300",
                      )}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant="ghost"
                size="icon"
                className={cn("w-2 h-2 rounded-full p-0", i === activeIndex ? "bg-primary" : "bg-muted-foreground/30")}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection


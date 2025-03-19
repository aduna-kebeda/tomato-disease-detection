"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United States",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "My trip to Ethiopia was absolutely life-changing. The historical sites in Lalibela were breathtaking, and the AI recommendations from this platform helped me discover hidden gems I would have otherwise missed.",
  },
  {
    id: 2,
    name: "David Chen",
    location: "Canada",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "The Ethiopia Travel Platform made planning my adventure so easy. The itinerary suggestions were perfect, and the safety information gave me peace of mind throughout my journey in the Simien Mountains.",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Spain",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    text: "I was hesitant about traveling to Ethiopia alone, but this platform provided all the information I needed. The chatbot was incredibly helpful when I had questions during my trip to the Omo Valley.",
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Australia",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "The cultural insights provided by this platform enhanced my experience of Ethiopian festivals. Attending Timkat in Gondar was a highlight of my travels, and I felt well-prepared thanks to the detailed event information.",
  },
  {
    id: 5,
    name: "Aisha Mohammed",
    location: "United Arab Emirates",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    rating: 5,
    text: "Ethiopia's coffee culture and cuisine were amazing to experience. The restaurant recommendations from this platform were spot on, and the business listings helped me find authentic experiences.",
  },
]

const TestimonialsSectionEnhanced = () => {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Quote className="h-6 w-6 text-[#E61C5D] mr-2" />
            <span className="text-[#E61C5D] font-medium uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-[#E61C5D]">Travelers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from travelers who have explored Ethiopia with our platform
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${
                  index === 1 ? "md:transform md:-translate-y-6" : ""
                }`}
              >
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 text-pink-100">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 11C10 5.5 14.5 5.5 14.5 5.5V8.5C14.5 8.5 13 8.5 13 11V19H5V11H10Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19 11C19 5.5 23.5 5.5 23.5 5.5V8.5C23.5 8.5 22 8.5 22 11V19H14V11H19Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <p className="text-gray-600 italic mb-6 relative z-10">{testimonial.text}</p>

                  <div className="flex items-center mt-6">
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
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex mt-4">
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
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-pink-200 hover:bg-pink-50 hover:text-[#E61C5D]"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className={cn("w-3 h-3 rounded-full p-0", i === activeIndex ? "bg-pink-500" : "bg-gray-300")}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-pink-200 hover:bg-pink-50 hover:text-[#E61C5D]"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSectionEnhanced


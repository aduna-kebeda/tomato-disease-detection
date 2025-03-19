import Image from "next/image"
import { Button } from "@/components/ui/button"

const AboutSection = () => {
  const stats = [
    { value: "15", label: "Years Experience" },
    { value: "1k", label: "Successful Trips" },
    { value: "20k", label: "Happy Customers" },
    { value: "4.9", label: "Overall Rating" },
  ]

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Images */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 left-0 w-3/4 h-3/4 overflow-hidden rounded-tl-[100px] rounded-br-[100px]">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmbPq6fh2O7rg72751fm_WGYTaesR9NJMQQ&s"
                  alt="Simien Mountains"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 overflow-hidden rounded-full">
                <Image
                  src="https://cdn.britannica.com/23/93423-050-107B2836/obelisk-kingdom-Aksum-Ethiopian-name-city.jpg"
                  alt="Lalibela Church"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2">
            <div className="text-gray-500 font-medium mb-2">ABOUT US</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our tour plan is to fulfil your <span className="text-[#E61C5D]">dream wish</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Understand to achieve anything requires faith and belief in yourself, vision, hard work, determination,
              and dedication.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#E61C5D]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection


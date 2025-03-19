import Image from "next/image"
import { Button } from "@/components/ui/button"

const TourPlansSection = () => {
  const tourTypes = [
    { name: "Vacations", percentage: 78, color: "from-blue-500 to-cyan-300" },
    { name: "Honeymoon", percentage: 55, color: "from-pink-500 to-red-300" },
    { name: "Musical Events", percentage: 30, color: "from-purple-500 to-indigo-300" },
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Images */}
          <div className="lg:w-1/2 relative">
            <div className="relative w-64 h-80 mx-auto">
              <div className="absolute top-0 left-0 w-48 h-64 bg-white p-3 shadow-lg rotate-[-5deg] z-10">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="https://s3.amazonaws.com/eit-planttoolbox-prod/media/images/FruitColors_COFFEA_A_sQuQhRXF3aXj.jfif"
                    alt="Ethiopian Coffee Ceremony"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-10 right-0 w-48 h-64 bg-white p-3 shadow-lg rotate-[5deg] z-20">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmkb__ukAkqYDIO8_nKBsgE2mIruOWtVLyw&s"
                    alt="Lalibela Church"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-10 w-48 h-32 bg-white p-3 shadow-lg rotate-[3deg] z-30">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyavgGNUQAejJvMr43eX7ZLziHL5sb2vRvIQ&s"
                    alt="Ethiopian Landscape"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-10 right-5 z-40">
                <svg width="100" height="50" viewBox="0 0 100 50" className="text-gray-800">
                  <path d="M10,25 Q30,5 50,25 T90,25" fill="none" stroke="currentColor" strokeWidth="2" />
                  <text x="50" y="45" textAnchor="middle" className="text-sm font-script">
                    Explore
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2">
            <div className="text-[#E61C5D] font-medium mb-2">TRENDS</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Popular Tour Plans</h2>
            <p className="text-gray-600 mb-8">
              At Ethiopia Travel, our most beloved tour packages combine incredible sights at competitive prices. From
              historical wonders to natural landscapes, we offer memorable methods of expert exploration in Ethiopia.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {tourTypes.map((tour, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * tour.percentage) / 100}
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" className={`stop-${tour.color.split(" ")[0]}`} />
                          <stop offset="100%" className={`stop-${tour.color.split(" ")[1]}`} />
                        </linearGradient>
                      </defs>
                      <text x="50" y="55" textAnchor="middle" className="text-2xl font-bold">
                        {tour.percentage}%
                      </text>
                    </svg>
                  </div>
                  <div className="text-center mt-2 uppercase text-sm font-medium text-gray-600">{tour.name}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">View All Tour Plans</Button>
              <Button variant="outline" className="border-[#E61C5D] text-[#E61C5D] rounded-full hover:bg-pink-50">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourPlansSection


import { Shield, AlertTriangle, Info, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const safetyData = [
  {
    category: "Health",
    level: "Moderate",
    score: 65,
    description:
      "Healthcare facilities are available in major cities but may be limited in rural areas. Carry basic medical supplies.",
    tips: [
      "Get recommended vaccinations before travel",
      "Drink only bottled or purified water",
      "Carry a basic first aid kit",
      "Have travel health insurance",
    ],
    icon: <Shield className="h-5 w-5" />,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    progressColor: "bg-amber-500",
  },
  {
    category: "Transportation",
    level: "Moderate",
    score: 60,
    description:
      "Road conditions vary significantly. Major highways are generally good, but rural roads may be challenging.",
    tips: [
      "Use reputable transportation services",
      "Avoid night driving when possible",
      "Always wear seatbelts",
      "Consider hiring a local driver for long journeys",
    ],
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    progressColor: "bg-amber-500",
  },
  {
    category: "Natural Hazards",
    level: "Low",
    score: 80,
    description:
      "Ethiopia has diverse terrain with some areas prone to seasonal flooding. The Danakil Depression has extreme heat.",
    tips: [
      "Check weather forecasts regularly",
      "Prepare for altitude in highland areas",
      "Carry sufficient water in hot regions",
      "Follow guide advice in extreme environments",
    ],
    icon: <Info className="h-5 w-5" />,
    color: "text-green-500",
    bgColor: "bg-green-50",
    progressColor: "bg-green-500",
  },
  {
    category: "Personal Security",
    level: "Moderate",
    score: 70,
    description:
      "Most tourist areas are safe, but take normal precautions against petty theft, especially in crowded areas.",
    tips: [
      "Keep valuables secure and out of sight",
      "Be cautious in crowded markets and public transport",
      "Avoid displaying expensive items",
      "Stay informed about local conditions",
    ],
    icon: <CheckCircle className="h-5 w-5" />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    progressColor: "bg-blue-500",
  },
]

const SafetyIndicatorsEnhanced = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-pink-500 mr-2" />
              <span className="text-pink-500 font-medium uppercase tracking-wider">Travel Safety</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stay <span className="text-pink-500">Safe</span> During Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Essential safety information and resources to ensure a secure and enjoyable experience in Ethiopia
            </p>
            <Button asChild className="mt-6 bg-pink-500 hover:bg-pink-600">
              <Link href="/safety">
                View Detailed Safety Information
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative h-64 w-full md:h-80 md:w-80 mx-auto">
              <div className="absolute top-0 left-0 w-48 h-48 bg-white p-3 shadow-lg rounded-lg rotate-[-5deg] z-10">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScm9X-8Lfb0q-U-XJuYwwmOSTwZobylFI03Q&s"
                    alt="Safety in Ethiopia"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white p-3 shadow-lg rounded-lg rotate-[5deg] z-20">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf27uF18tEozG7nKj_PInOe4JvXl86dqjd9w&s"
                    alt="Travel Safety"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safetyData.map((item) => (
            <Card
              key={item.category}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <CardHeader className={`pb-2 ${item.bgColor}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${item.bgColor}`}>
                      <div className={item.color}>{item.icon}</div>
                    </div>
                    <CardTitle className="ml-2">{item.category}</CardTitle>
                  </div>
                  <span className={`font-medium px-3 py-1 rounded-full text-sm ${item.bgColor} ${item.color}`}>
                    {item.level} Risk
                  </span>
                </div>
                <CardDescription className="mt-2">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Risk Level</span>
                    <span className="text-sm font-medium">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className={item.progressColor} />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Safety Tips:</h4>
                  <ul className="space-y-1">
                    {item.tips.map((tip, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="text-pink-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our safety information is regularly updated with the latest travel advisories and local conditions
          </p>
          <Button asChild className="bg-pink-500 hover:bg-pink-600">
            <Link href="/emergency-contacts">
              View Emergency Contacts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SafetyIndicatorsEnhanced


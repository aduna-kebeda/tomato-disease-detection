import { Shield, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Low":
      return "text-green-500"
    case "Moderate":
      return "text-amber-500"
    case "High":
      return "text-red-500"
    default:
      return "text-blue-500"
  }
}

const getProgressColor = (score: number) => {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-amber-500"
  return "bg-red-500"
}

const getIcon = (category: string) => {
  switch (category) {
    case "Health":
      return <Shield className="h-5 w-5" />
    case "Transportation":
      return <AlertTriangle className="h-5 w-5" />
    case "Natural Hazards":
      return <Info className="h-5 w-5" />
    case "Personal Security":
      return <CheckCircle className="h-5 w-5" />
    default:
      return <Info className="h-5 w-5" />
  }
}

const SafetyIndicators = () => {
  return (
    <section className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Travel Safety Information</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed about current safety conditions and recommendations for traveling in Ethiopia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyData.map((item) => (
            <Card key={item.category}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {getIcon(item.category)}
                    <CardTitle className="ml-2">{item.category}</CardTitle>
                  </div>
                  <span className={`font-medium ${getLevelColor(item.level)}`}>{item.level} Risk</span>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Risk Level</span>
                    <span className="text-sm font-medium">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className={getProgressColor(item.score)} />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Safety Tips:</h4>
                  <ul className="space-y-1">
                    {item.tips.map((tip, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/safety">View Detailed Safety Information</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SafetyIndicators


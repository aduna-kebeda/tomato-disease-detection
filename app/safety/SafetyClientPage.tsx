"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Info, CheckCircle } from "lucide-react"

const SafetyClientPage = () => {
  const safetyData = [
    {
      category: "Health",
      level: "Moderate",
      description:
        "Healthcare facilities are available in major cities but may be limited in rural areas. Carry basic medical supplies.",
      tips: [
        "Get recommended vaccinations before travel",
        "Drink only bottled or purified water",
        "Carry a basic first aid kit",
        "Have travel health insurance",
      ],
      icon: <Shield className="h-5 w-5" />,
    },
    {
      category: "Transportation",
      level: "Moderate",
      description:
        "Road conditions vary significantly. Major highways are generally good, but rural roads may be challenging.",
      tips: [
        "Use reputable transportation services",
        "Avoid night driving when possible",
        "Always wear seatbelts",
        "Consider hiring a local driver for long journeys",
      ],
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      category: "Natural Hazards",
      level: "Low",
      description:
        "Ethiopia has diverse terrain with some areas prone to seasonal flooding. The Danakil Depression has extreme heat.",
      tips: [
        "Check weather forecasts regularly",
        "Prepare for altitude in highland areas",
        "Carry sufficient water in hot regions",
        "Follow guide advice in extreme environments",
      ],
      icon: <Info className="h-5 w-5" />,
    },
    {
      category: "Personal Security",
      level: "Moderate",
      description:
        "Most tourist areas are safe, but take normal precautions against petty theft, especially in crowded areas.",
      tips: [
        "Keep valuables secure and out of sight",
        "Be cautious in crowded markets and public transport",
        "Avoid displaying expensive items",
        "Stay informed about local conditions",
      ],
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Safety Information</h1>
      <p className="text-muted-foreground mb-8">Essential safety information for traveling in Ethiopia.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyData.map((item) => (
          <Card key={item.category}>
            <CardHeader>
              <CardTitle>{item.category}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {item.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SafetyClientPage


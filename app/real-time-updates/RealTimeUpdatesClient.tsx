"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bell, AlertTriangle, CloudRain, Plane, Calendar, RefreshCw, ThumbsUp, ThumbsDown, Share2 } from "lucide-react"

// Mock data for updates
const updates = [
  {
    id: 1,
    type: "weather",
    title: "Heavy Rainfall in Addis Ababa",
    description:
      "Heavy rainfall expected in Addis Ababa and surrounding areas over the next 48 hours. Possible flash floods in low-lying areas.",
    location: "Addis Ababa",
    timestamp: "2 hours ago",
    severity: "moderate",
    icon: <CloudRain className="h-5 w-5" />,
  },
  {
    id: 2,
    type: "transportation",
    title: "Flight Delays at Bole International Airport",
    description:
      "Multiple flights delayed at Bole International Airport due to technical issues. Passengers advised to check with their airlines.",
    location: "Addis Ababa",
    timestamp: "5 hours ago",
    severity: "moderate",
    icon: <Plane className="h-5 w-5" />,
  },
  {
    id: 3,
    type: "alert",
    title: "Road Closure on Bole Road",
    description:
      "Temporary road closure on Bole Road due to construction. Expected to last until Friday. Alternative routes advised.",
    location: "Addis Ababa",
    timestamp: "1 day ago",
    severity: "low",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    id: 4,
    type: "event",
    title: "Meskel Festival Preparations",
    description:
      "Preparations for Meskel Festival underway in Meskel Square. Expect increased traffic and crowds in the area.",
    location: "Addis Ababa",
    timestamp: "2 days ago",
    severity: "info",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: 5,
    type: "alert",
    title: "Temporary Closure of Lalibela Churches",
    description: "Three churches in Lalibela temporarily closed for restoration work. Expected to reopen next month.",
    location: "Lalibela",
    timestamp: "3 days ago",
    severity: "moderate",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
]

export default function RealTimeUpdatesClient() {
  const [activeUpdates, setActiveUpdates] = useState(updates)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const refreshUpdates = () => {
    setIsRefreshing(true)

    // Simulate API call to refresh updates
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdated(new Date())
      // In a real app, we would fetch new updates here
    }, 1500)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500 text-white"
      case "moderate":
        return "bg-amber-500 text-white"
      case "low":
        return "bg-blue-500 text-white"
      case "info":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Real-time Updates</h1>
          <p className="text-muted-foreground">
            Stay informed with the latest travel updates and information for Ethiopia
          </p>
        </div>
        <div className="mt-4 flex items-center md:mt-0">
          <p className="text-sm text-muted-foreground mr-4">Last updated: {lastUpdated.toLocaleTimeString()}</p>
          <Button onClick={refreshUpdates} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Updates</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="transportation">Transportation</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {activeUpdates.map((update) => (
            <Card key={update.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {update.icon}
                    <CardTitle className="ml-2">{update.title}</CardTitle>
                  </div>
                  <Badge className={getSeverityColor(update.severity)}>
                    {update.severity.charAt(0).toUpperCase() + update.severity.slice(1)}
                  </Badge>
                </div>
                <CardDescription>
                  {update.location} • {update.timestamp}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{update.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="mr-1 h-4 w-4" />
                      Not Helpful
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          {activeUpdates
            .filter((update) => update.type === "alert")
            .map((update) => (
              <Card key={update.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {update.icon}
                      <CardTitle className="ml-2">{update.title}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(update.severity)}>
                      {update.severity.charAt(0).toUpperCase() + update.severity.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {update.location} • {update.timestamp}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{update.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        Not Helpful
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        {/* Similar structure for other tabs */}
        <TabsContent value="weather" className="space-y-6">
          {activeUpdates
            .filter((update) => update.type === "weather")
            .map((update) => (
              <Card key={update.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {update.icon}
                      <CardTitle className="ml-2">{update.title}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(update.severity)}>
                      {update.severity.charAt(0).toUpperCase() + update.severity.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {update.location} • {update.timestamp}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{update.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        Not Helpful
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="transportation" className="space-y-6">
          {activeUpdates
            .filter((update) => update.type === "transportation")
            .map((update) => (
              <Card key={update.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {update.icon}
                      <CardTitle className="ml-2">{update.title}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(update.severity)}>
                      {update.severity.charAt(0).toUpperCase() + update.severity.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {update.location} • {update.timestamp}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{update.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        Not Helpful
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          {activeUpdates
            .filter((update) => update.type === "event")
            .map((update) => (
              <Card key={update.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {update.icon}
                      <CardTitle className="ml-2">{update.title}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(update.severity)}>
                      {update.severity.charAt(0).toUpperCase() + update.severity.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {update.location} • {update.timestamp}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{update.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        Not Helpful
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose which types of updates you want to receive notifications for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Safety Alerts</p>
                    <p className="text-sm text-muted-foreground">Important safety information and warnings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    Push
                  </Button>
                  <Button variant="outline" size="sm">
                    SMS
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Weather Updates</p>
                    <p className="text-sm text-muted-foreground">Weather forecasts and severe weather alerts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    Push
                  </Button>
                  <Button variant="outline" size="sm">
                    SMS
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Plane className="h-5 w-5 text-indigo-500" />
                  <div>
                    <p className="font-medium">Transportation Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Flight delays, road closures, and transit information
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    Push
                  </Button>
                  <Button variant="outline" size="sm">
                    SMS
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Event Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Information about festivals, cultural events, and activities
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    Push
                  </Button>
                  <Button variant="outline" size="sm">
                    SMS
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Button className="mt-6">
            <Bell className="mr-2 h-4 w-4" />
            Save Notification Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


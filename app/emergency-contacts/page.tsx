import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Phone, Hospital, Shield, AlertTriangle, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Emergency Contacts | Ethiopia Travel Platform",
  description: "Important emergency contacts for travelers in Ethiopia",
}

const emergencyContacts = [
  {
    category: "General Emergency",
    contacts: [
      { name: "Police Emergency", number: "991", description: "National police emergency number" },
      { name: "Ambulance", number: "907", description: "Medical emergency services" },
      { name: "Fire Emergency", number: "939", description: "Fire department emergency number" },
    ],
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    category: "Tourist Assistance",
    contacts: [
      {
        name: "Tourist Police",
        number: "+251 11 551 8666",
        description: "Specialized police unit for tourist assistance",
      },
      {
        name: "Ethiopian Tourism Organization",
        number: "+251 11 552 6370",
        description: "For tourism-related inquiries and assistance",
      },
      {
        name: "Tourist Information Center",
        number: "+251 11 551 7804",
        description: "Information for tourists in Addis Ababa",
      },
    ],
    icon: <Info className="h-5 w-5" />,
  },
  {
    category: "Medical Services",
    contacts: [
      { name: "Nordic Medical Centre", number: "+251 11 661 0986", description: "Private hospital in Addis Ababa" },
      { name: "Korean Hospital", number: "+251 11 667 5066", description: "Hospital with English-speaking staff" },
      { name: "St. Gabriel Hospital", number: "+251 11 552 3444", description: "24-hour emergency services" },
    ],
    icon: <Hospital className="h-5 w-5" />,
  },
  {
    category: "Embassies",
    contacts: [
      { name: "U.S. Embassy", number: "+251 11 130 6000", description: "Embassy of the United States in Addis Ababa" },
      {
        name: "British Embassy",
        number: "+251 11 617 0100",
        description: "Embassy of the United Kingdom in Addis Ababa",
      },
      { name: "EU Delegation", number: "+251 11 661 2511", description: "European Union Delegation to Ethiopia" },
    ],
    icon: <Shield className="h-5 w-5" />,
  },
]

const cities = [
  { name: "Addis Ababa", value: "addis-ababa" },
  { name: "Lalibela", value: "lalibela" },
  { name: "Gondar", value: "gondar" },
  { name: "Axum", value: "axum" },
  { name: "Bahir Dar", value: "bahir-dar" },
  { name: "Harar", value: "harar" },
]

export default function EmergencyContactsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Emergency Contacts</h1>
        <p className="text-muted-foreground">
          Important contact information for emergencies while traveling in Ethiopia
        </p>
      </div>

      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search contacts..." className="pl-9" />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-grow md:flex-grow-0">
            Download PDF
          </Button>
          <Button className="flex-grow md:flex-grow-0">
            <Phone className="mr-2 h-4 w-4" />
            Save All Contacts
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          {cities.map((city) => (
            <TabsTrigger key={city.value} value={city.value}>
              {city.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {emergencyContacts.map((category) => (
            <Card key={category.category}>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  {category.icon}
                  <CardTitle className="ml-2">{category.category}</CardTitle>
                </div>
                <CardDescription>
                  {category.category === "General Emergency"
                    ? "National emergency numbers that work throughout Ethiopia"
                    : `Important ${category.category.toLowerCase()} contacts`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.contacts.map((contact) => (
                    <div key={contact.name} className="rounded-lg border p-4 hover:bg-muted transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{contact.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-primary">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-2 text-lg font-semibold">{contact.number}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {cities.map((city) => (
          <TabsContent key={city.value} value={city.value} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{city.name} Emergency Contacts</CardTitle>
                <CardDescription>Local emergency contacts specific to {city.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-4 hover:bg-muted transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Local Police Station</h3>
                        <p className="text-sm text-muted-foreground mt-1">Main police station in {city.name}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-primary">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-2 text-lg font-semibold">+251 11 123 4567</p>
                  </div>
                  <div className="rounded-lg border p-4 hover:bg-muted transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{city.name} Hospital</h3>
                        <p className="text-sm text-muted-foreground mt-1">Main medical facility</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-primary">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-2 text-lg font-semibold">+251 11 987 6543</p>
                  </div>
                  <div className="rounded-lg border p-4 hover:bg-muted transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Tourist Information</h3>
                        <p className="text-sm text-muted-foreground mt-1">Local tourism office</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-primary">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-2 text-lg font-semibold">+251 11 456 7890</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8 border-primary/50">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <CardTitle className="ml-2">Emergency Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Before an Emergency</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Save emergency numbers in your phone
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Register with your embassy or consulate
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Keep a copy of your passport and travel insurance
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Learn basic phrases in Amharic for emergencies
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">During an Emergency</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Stay calm and assess the situation
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Call the appropriate emergency number
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Contact your embassy if needed
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Follow instructions from local authorities
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


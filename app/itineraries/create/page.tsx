import type { Metadata } from "next"
import CreateItineraryClientPage from "./CreateItineraryClientPage"

export const metadata: Metadata = {
  title: "Create Itinerary | Ethiopia Travel Platform",
  description: "Create a new travel itinerary for your trip to Ethiopia",
}

export default function CreateItineraryPage() {
  return <CreateItineraryClientPage />
}


import type { Metadata } from "next"
import MapExplorer from "@/components/map/map-explorer"

export const metadata: Metadata = {
  title: "Interactive Map | Ethiopia Travel Platform",
  description: "Explore Ethiopia with our interactive map",
}

export default function MapPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Interactive Map</h1>
        <p className="text-muted-foreground">
          Explore Ethiopia's destinations, plan routes, and discover nearby attractions
        </p>
      </div>

      <MapExplorer />
    </div>
  )
}


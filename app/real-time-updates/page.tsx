import type { Metadata } from "next"
import RealTimeUpdatesClient from "./RealTimeUpdatesClient"

export const metadata: Metadata = {
  title: "Real-time Updates | Ethiopia Travel Platform",
  description: "Get the latest travel updates and information for Ethiopia",
}

export default function RealTimeUpdatesPage() {
  return <RealTimeUpdatesClient />
}


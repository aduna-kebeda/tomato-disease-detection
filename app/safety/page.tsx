import type { Metadata } from "next"
import SafetyClientPage from "./SafetyClientPage"

export const metadata: Metadata = {
  title: "Safety Information | Ethiopia Travel Platform",
  description: "Essential safety information for traveling in Ethiopia",
}

export default function SafetyPage() {
  return <SafetyClientPage />
}


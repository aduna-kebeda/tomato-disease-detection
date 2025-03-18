import type { Metadata } from "next"
import ChatbotClientPage from "./ChatbotClientPage"

export const metadata: Metadata = {
  title: "AI Chatbot | Ethiopia Travel Platform",
  description: "Get travel assistance and recommendations from our AI chatbot",
}

export default function ChatbotPage() {
  return <ChatbotClientPage />
}


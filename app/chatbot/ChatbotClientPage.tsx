"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2 } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your Ethiopia travel assistant. How can I help you plan your trip to Ethiopia?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export default function ChatbotClientPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call to chatbot service
    setTimeout(() => {
      // Sample responses based on keywords
      let botResponse =
        "I'm not sure how to help with that. Could you try asking about specific destinations, activities, or travel tips in Ethiopia?"

      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("lalibela") || lowerInput.includes("churches")) {
        botResponse =
          "Lalibela is famous for its rock-hewn churches, a UNESCO World Heritage site. The best time to visit is from October to March during the dry season. Would you like me to suggest an itinerary that includes Lalibela?"
      } else if (lowerInput.includes("danakil") || lowerInput.includes("depression")) {
        botResponse =
          "The Danakil Depression is one of the hottest places on Earth with colorful sulfur springs and salt formations. It's best visited from November to February. Due to extreme conditions, you should only visit with an experienced guide."
      } else if (lowerInput.includes("food") || lowerInput.includes("cuisine") || lowerInput.includes("eat")) {
        botResponse =
          "Ethiopian cuisine is known for injera (sourdough flatbread) and various stews called wot. Popular dishes include Doro Wot (chicken stew), Tibs (sautéed meat), and Kitfo (minced raw beef). Would you like restaurant recommendations?"
      } else if (lowerInput.includes("weather") || lowerInput.includes("climate") || lowerInput.includes("when")) {
        botResponse =
          "Ethiopia has diverse climates due to its varying elevations. Generally, the dry season (October to May) is the best time to visit. The highlands are cooler, while lowland areas can be very hot year-round."
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        botResponse =
          "Hello! I'm your Ethiopia travel assistant. I can help with information about destinations, accommodations, transportation, and cultural tips. What would you like to know about Ethiopia?"
      } else if (lowerInput.includes("hotel") || lowerInput.includes("stay") || lowerInput.includes("accommodation")) {
        botResponse =
          "Ethiopia offers a range of accommodations from luxury hotels in Addis Ababa to eco-lodges in natural areas. Popular options include the Sheraton Addis, Kuriftu Resorts, and Mountain View Hotel in Lalibela. Would you like specific recommendations for a particular city?"
      } else if (
        lowerInput.includes("transport") ||
        lowerInput.includes("travel") ||
        lowerInput.includes("get around")
      ) {
        botResponse =
          "Within Ethiopia, you can travel by domestic flights (Ethiopian Airlines), public buses, minibuses, or hire a private driver. For remote areas, 4x4 vehicles are recommended. Would you like more specific transportation advice?"
      }

      const botMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessageObj])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Travel Assistant</h1>
          <p className="text-muted-foreground">
            Ask our AI chatbot for travel recommendations, tips, and information about Ethiopia
          </p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 mb-4">
            <p className="text-sm text-muted-foreground">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setInput("Tell me about Lalibela")}>
                Lalibela
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("What's the best time to visit Ethiopia?")}>
                Best time to visit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("Ethiopian food recommendations")}>
                Ethiopian cuisine
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("How to get around in Ethiopia")}>
                Transportation
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("Safety tips for Ethiopia")}>
                Safety tips
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-0">
          <div className="h-[500px] overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                      {message.sender === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex flex-row">
                    <Avatar className="h-8 w-8 mr-2">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-grow"
        />
        <Button type="submit" className="bg-[#E61C5D] rounded-full" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  )
}


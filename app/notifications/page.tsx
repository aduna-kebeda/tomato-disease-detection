"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
// import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Heart,
  User,
  Clock,
  Check,
  Trash2,
  RefreshCw,
} from "lucide-react"

// export const metadata: Metadata = {
//   title: "Notifications | Ethiopia Travel Platform",
//   description: "View your notifications and updates",
// }  

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Safety Alert: Addis Ababa",
    message: "Heavy rainfall expected in Addis Ababa. Be cautious when traveling.",
    timestamp: "2 hours ago",
    read: false,
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  },
  {
    id: 2,
    type: "event",
    title: "Upcoming Event: Meskel Festival",
    message: "Meskel Festival is happening next week in Addis Ababa. Don't miss it!",
    timestamp: "1 day ago",
    read: false,
    icon: <Calendar className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: 3,
    type: "message",
    title: "New Message from Tour Guide",
    message: "Your tour guide has sent you a message regarding your upcoming trip.",
    timestamp: "2 days ago",
    read: true,
    icon: <MessageSquare className="h-5 w-5 text-green-500" />,
  },
  {
    id: 4,
    type: "like",
    title: "Someone liked your itinerary",
    message: "John Doe liked your 'Ethiopian Highlands Trek' itinerary.",
    timestamp: "3 days ago",
    read: true,
    icon: <Heart className="h-5 w-5 text-red-500" />,
  },
  {
    id: 5,
    type: "follow",
    title: "New Follower",
    message: "Sarah Johnson is now following you.",
    timestamp: "5 days ago",
    read: true,
    icon: <User className="h-5 w-5 text-blue-500" />,
  },
]

export default function NotificationsPage() {
  const [activeNotifications, setActiveNotifications] = useState(notifications)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const markAllAsRead = () => {
    setActiveNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const markAsRead = (id: number) => {
    setActiveNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: number) => {
    setActiveNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const refreshNotifications = () => {
    setIsRefreshing(true)

    // Simulate API call to refresh notifications
    setTimeout(() => {
      setIsRefreshing(false)
      // In a real app, we would fetch new notifications here
    }, 1500)
  }

  const unreadCount = activeNotifications.filter((n) => !n.read).length

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with the latest information and activities</p>
        </div>
        <div className="mt-4 flex space-x-2 md:mt-0">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <Button onClick={refreshNotifications} disabled={isRefreshing}>
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
          <TabsTrigger value="all">
            All
            {activeNotifications.length > 0 && <Badge className="ml-2 bg-primary">{activeNotifications.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && <Badge className="ml-2 bg-primary">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {activeNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  You don't have any notifications at the moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            activeNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={cn("transition-colors", !notification.read && "border-primary/50 bg-primary/5")}
              >
                <CardContent className="flex items-start justify-between p-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">{notification.icon}</div>
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-muted-foreground">{notification.message}</p>
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {activeNotifications.filter((n) => !n.read).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Check className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">All caught up!</h3>
                <p className="mt-2 text-center text-muted-foreground">You've read all your notifications.</p>
              </CardContent>
            </Card>
          ) : (
            activeNotifications
              .filter((n) => !n.read)
              .map((notification) => (
                <Card key={notification.id} className="border-primary/50 bg-primary/5">
                  <CardContent className="flex items-start justify-between p-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">{notification.icon}</div>
                      <div>
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-muted-foreground">{notification.message}</p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        {/* Similar structure for other tabs */}
        <TabsContent value="alerts" className="space-y-4">
          {activeNotifications
            .filter((n) => n.type === "alert")
            .map((notification) => (
              <Card
                key={notification.id}
                className={cn("transition-colors", !notification.read && "border-primary/50 bg-primary/5")}
              >
                <CardContent className="flex items-start justify-between p-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">{notification.icon}</div>
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-muted-foreground">{notification.message}</p>
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {activeNotifications
            .filter((n) => n.type === "event")
            .map((notification) => (
              <Card
                key={notification.id}
                className={cn("transition-colors", !notification.read && "border-primary/50 bg-primary/5")}
              >
                <CardContent className="flex items-start justify-between p-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">{notification.icon}</div>
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-muted-foreground">{notification.message}</p>
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          {activeNotifications
            .filter((n) => n.type === "like" || n.type === "follow" || n.type === "message")
            .map((notification) => (
              <Card
                key={notification.id}
                className={cn("transition-colors", !notification.read && "border-primary/50 bg-primary/5")}
              >
                <CardContent className="flex items-start justify-between p-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">{notification.icon}</div>
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-muted-foreground">{notification.message}</p>
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary p-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary p-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-muted p-1">
                  <div className="h-4 w-4 rounded-full bg-muted-foreground transition-transform"></div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Browser Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary p-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                </div>
              </div>
            </div>
          </div>

          <Button className="mt-6">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
}


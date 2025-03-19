"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, Bell, Globe, Lock, Shield, User, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true,
    },
    privacy: {
      profileVisibility: "public",
      shareActivity: true,
      allowLocationTracking: false,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
    },
    preferences: {
      language: "english",
      currency: "usd",
      distanceUnit: "km",
    },
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Simulate loading settings
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
      setIsSaving(false)
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#E61C5D]" />
          <p className="text-lg font-medium">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden rounded-xl shadow-lg border-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <div>
                    <User className="mr-2 h-4 w-4 text-[#E61C5D]" />
                    Profile
                  </div>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start bg-pink-50 text-[#E61C5D]">
                  <div>
                    <Shield className="mr-2 h-4 w-4 text-[#E61C5D]" />
                    Settings
                  </div>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <div>
                    <Bell className="mr-2 h-4 w-4 text-[#E61C5D]" />
                    Notifications
                  </div>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="notifications">
            <TabsList className="bg-pink-50 mb-6">
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
                Privacy
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white">
                Security
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-[#E61C5D] rounded-full data-[state=active]:text-white"
              >
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications">
              <Card className="overflow-hidden rounded-xl shadow-lg border-0">
                <CardHeader className="bg-pink-50">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-[#E61C5D]" />
                    <CardTitle>Notification Settings</CardTitle>
                  </div>
                  <CardDescription>Manage how you receive notifications and updates</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your account activity
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              email: checked,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              push: checked,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                      </div>
                      <Switch
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              sms: checked,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">
                          Receive our weekly newsletter with travel tips and offers
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.marketing}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              marketing: checked,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card className="overflow-hidden rounded-xl shadow-lg border-0">
                <CardHeader className="bg-pink-50">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-[#E61C5D]" />
                    <CardTitle>Privacy Settings</CardTitle>
                  </div>
                  <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select
                        value={settings.privacy.profileVisibility}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              profileVisibility: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Control who can see your profile and itineraries
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Share Activity</p>
                        <p className="text-sm text-muted-foreground">
                          Allow sharing your travel activities with other users
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.shareActivity}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              shareActivity: checked,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Location Tracking</p>
                        <p className="text-sm text-muted-foreground">
                          Allow the app to track your location for better recommendations
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.allowLocationTracking}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              allowLocationTracking: checked,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="overflow-hidden rounded-xl shadow-lg border-0">
                <CardHeader className="bg-pink-50">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-[#E61C5D]" />
                    <CardTitle>Security Settings</CardTitle>
                  </div>
                  <CardDescription>Manage your account security and authentication options</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" />
                      </div>
                      <Button className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">Update Password</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              twoFactorAuth: checked,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Login Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts when someone logs into your account
                        </p>
                      </div>
                      <Switch
                        checked={settings.security.loginAlerts}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              loginAlerts: checked,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="overflow-hidden rounded-xl shadow-lg border-0">
                <CardHeader className="bg-pink-50">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-[#E61C5D]" />
                    <CardTitle>Preferences</CardTitle>
                  </div>
                  <CardDescription>Customize your app experience and regional settings</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select
                        value={settings.preferences.language}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            preferences: {
                              ...settings.preferences,
                              language: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="amharic">Amharic</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select
                        value={settings.preferences.currency}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            preferences: {
                              ...settings.preferences,
                              currency: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="etb">ETB (Br)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Distance Unit</Label>
                      <Select
                        value={settings.preferences.distanceUnit}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            preferences: {
                              ...settings.preferences,
                              distanceUnit: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="km">Kilometers (km)</SelectItem>
                          <SelectItem value="mi">Miles (mi)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-[#E61C5D] hover:bg-pink-700 rounded-full">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Forgot Password | Ethiopia Travel Platform",
  description: "Reset your password for Ethiopia Travel Platform",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4">
      <div className="mb-4">
        <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" required />
          </div>

          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      </div>
    </div>
  )
}


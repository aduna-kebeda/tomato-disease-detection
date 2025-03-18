import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import LoginForm from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Ethiopia Travel Platform",
  description: "Login to your Ethiopia Travel account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] w-full">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center space-y-6 px-4 md:w-1/2 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/21/56/98/lake-wenchi.jpg?w=800&h=600&s=1"
            alt="Ethiopian Orthodox Church in Lalibela"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-2xl font-bold">Discover Ethiopia</h2>
            <p className="mt-2">Explore the ancient wonders and breathtaking landscapes of Ethiopia</p>
          </div>
        </div>
      </div>
    </div>
  )
}


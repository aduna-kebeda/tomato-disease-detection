import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import RegisterForm from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Ethiopia Travel Platform",
  description: "Create a new account on Ethiopia Travel Platform",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] w-full">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoeVLUZh9l-yW2tTwBjkiMGR_y6g1QCZVkFg&s"
            alt="Traditional Ethiopian Coffee Ceremony"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-primary/10" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-2xl font-bold">Join Our Community</h2>
            <p className="mt-2">Create an account to plan your perfect Ethiopian adventure</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center space-y-6 px-4 md:w-1/2 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Enter your details to get started with Ethiopia Travel</p>
          </div>
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


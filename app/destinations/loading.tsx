import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
        <p className="text-lg font-medium">Loading destinations...</p>
      </div>
    </div>
  )
}


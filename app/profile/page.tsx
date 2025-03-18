import type { Metadata } from "next"
import ProfileClientPage from "./ProfileClientPage"

export const metadata: Metadata = {
  title: "Profile | Ethiopia Travel Platform",
  description: "Manage your profile on Ethiopia Travel Platform",
}

export default function ProfilePage() {
  return <ProfileClientPage />
}


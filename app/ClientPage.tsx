"use client"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import PartnersSection from "@/components/partners-section"
import HomeContent from "@/components/home-content"

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100">
      <SiteHeader />
      <HomeContent />
      <PartnersSection />
      <SiteFooter />
    </div>
  )
}

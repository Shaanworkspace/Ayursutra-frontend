import React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Navbar from "@/pages/Home/components/navbar"
import Footer from "./components/Footer"
import { BriefcaseIcon, ClipboardDocumentCheckIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Navbar />

            {/* Main Section */}
            <main className="flex-1 pt-24 md:pt-32 bg-linear-to-br from-cyan-50/60 to-teal-100/50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm">
                {/* Hero Section */}
                <section className="container mx-auto text-center py-16 px-6 flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 leading-tight mb-4">
                        Reconnect with your <span className="text-cyan-700 dark:text-cyan-400">Inner Balance</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                        Experience the harmony of Ayurveda and modern wellness science.
                        Personalized therapy, certified healers, and holistic health — all in one place.
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <Button size="lg" className="bg-cyan-600 text-white hover:bg-cyan-700 shadow-md">
                            <span>Book a Session</span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="backdrop-blur-md">
                            Learn More
                        </Button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto py-20 px-6 grid md:grid-cols-3 gap-10 text-center">
  {[
    {
      title: "Experienced Professionals",
      desc: "Certified experts with years of industry knowledge and proven track records.",
      icon: <BriefcaseIcon className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Tailored Solutions",
      desc: "Customized strategies aligned with your business goals and operational needs.",
      icon: <ClipboardDocumentCheckIcon className="w-12 h-12 text-green-600 dark:text-green-400" />,
    },
    {
      title: "Global Standards",
      desc: "Processes and practices benchmarked against international quality frameworks.",
      icon: <GlobeAltIcon className="w-12 h-12 text-gray-700 dark:text-gray-300" />,
    },
  ].map((item) => (
    <div
      key={item.title}
      className="bg-white dark:bg-gray-900 rounded-xl p-10 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-center mb-6">{item.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        {item.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {item.desc}
      </p>
    </div>
  ))}
</section>


                {/* Call to Action Section */}
                <section className="container mx-auto py-20 px-6 text-center">
                    <div className="bg-white/70 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl shadow-md p-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                            Begin your <span className="text-cyan-600 dark:text-cyan-400">healing journey</span> today.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
                            Connect with our practitioners for a consultation and rediscover the power of Ayurveda in your life.
                        </p>
                        <Button size="lg" className="bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg">
                            Book Appointment
                        </Button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}
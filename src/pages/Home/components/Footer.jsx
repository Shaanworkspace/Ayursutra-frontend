/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
"use client"
import React from "react"
import { Link } from "react-router"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="mt-20 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border-t border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 transition-all duration-300">
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-cyan-700 dark:text-cyan-300">
                            Ayursutra
                        </h2>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed opacity-80">
                            Bringing ancient Ayurvedic wisdom to modern wellness.
                            Balance your mind, body, and soul with us.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-sm font-medium">
                        <NavLinks />
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <SocialIcon Icon={Facebook} href="https://facebook.com/" label="Facebook" />
                        <SocialIcon Icon={Instagram} href="https://instagram.com/" label="Instagram" />
                        <SocialIcon Icon={Twitter} href="https://twitter.com/" label="Twitter" />
                        <SocialIcon Icon={Mail} href="mailto:info@ayursutra.com" label="Email" />
                    </div>
                </div>

                <Separator className="my-6 bg-white/30" />

                <div className="flex flex-col md:flex-row items-center justify-between text-xs opacity-70 space-y-3 md:space-y-0">
                    <p>© {new Date().getFullYear()} Ayursutra. All rights reserved.</p>
                    <p>
                        Designed with <span className="text-cyan-600">♥</span> using Tailwind + Shadcn UI.
                    </p>
                </div>
            </div>
        </footer>
    )
}

function NavLinks() {
    const links = [
        { to: "/", label: "Home" },
        { to: "/therapists", label: "Therapists" },
        { to: "/appointments", label: "Appointments" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
    ]

    return (
        <>
            {links.map(({ to, label }) => (
                <Link
                    key={to}
                    to={to}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                    {label}
                </Link>
            ))}
        </>
    )
}

function SocialIcon({ Icon, href, label }) {
    return (
        <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors"
            aria-label={label}
        >
            <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="h-5 w-5" />
            </a>
        </Button>
    )
}
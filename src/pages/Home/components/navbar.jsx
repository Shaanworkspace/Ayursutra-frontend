"use client"
import React, { useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"  // simple icon set for burger menu

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-b border-white/20 dark:border-gray-700/30 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link to="/" className="text-2xl font-bold tracking-tight text-cyan-700 dark:text-cyan-300 hover:opacity-90">
                    Ayursutra
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6 text-gray-800 dark:text-gray-200 font-medium">
                    <NavLinks />
                    <Button variant="outline" size="sm" asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/50 dark:bg-gray-900/60 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/30 py-4 shadow-lg">
                    <div className="flex flex-col items-center space-y-4 font-medium text-gray-800 dark:text-gray-200">
                        <NavLinks onClick={() => setIsOpen(false)} />
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}

function NavLinks({ onClick }) {
    const links = [
        { to: "/", label: "Home" },
        { to: "/home/therapists", label: "Therapists" },
        { to: "/appointments", label: "Appointments" },
    ]

    return (
        <>
            {links.map(({ to, label }) => (
                <Link
                    key={to}
                    to={to}
                    onClick={onClick}
                    className="hover:text-cyan-600 transition-colors duration-200"
                >
                    {label}
                </Link>
            ))}
        </>
    )
}
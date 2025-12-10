/* eslint-disable no-unused-vars */
// File: patient/components/PatientFooter.jsx

import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    Heart,
    Phone,
    MapPin,
    Leaf,
} from "lucide-react";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { to: "/patient/dashboard", label: "Dashboard" },
        { to: "/patient/appointments", label: "Book Appointment" },
        { to: "/patient/health-records", label: "Health Records" },
        { to: "/patient/wellness", label: "Wellness Tips" },
        { to: "/patient/profile", label: "My Profile" },
    ];

    const resourceLinks = [
        { to: "/help", label: "Help Center" },
        { to: "/faq", label: "FAQ" },
        { to: "/privacy", label: "Privacy Policy" },
        { to: "/terms", label: "Terms of Service" },
        { to: "/about", label: "About Us" },
    ];

    const socialLinks = [
        { Icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
        { Icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
        { Icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
    ];

    const contactInfo = [
        {
            Icon: Phone,
            content: "+1 (555) 123-4567",
            href: "tel:+15551234567",
        },
        {
            Icon: Mail,
            content: "support@ayursutra.com",
            href: "mailto:support@ayursutra.com",
        },
        {
            Icon: MapPin,
            content: (
                <>
                    123 Wellness Street
                    <br />
                    Health City, HC 12345
                </>
            ),
            href: "https://maps.google.com",
        },
    ];

    return (
        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link
                            to="/patient/dashboard"
                            className="inline-flex items-center gap-2 mb-4 group"
                        >
                            <div className="p-2 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg group-hover:shadow-lg transition-shadow">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                                Ayursutra
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                            Your trusted partner in holistic health and
                            wellness. Experience the perfect blend of ancient
                            Ayurvedic wisdom and modern healthcare.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <SocialButton
                                    key={label}
                                    Icon={Icon}
                                    href={href}
                                    label={label}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <FooterHeading>Quick Links</FooterHeading>
                        <ul className="space-y-2">
                            {quickLinks.map(({ to, label }) => (
                                <FooterLink key={to} to={to}>
                                    {label}
                                </FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <FooterHeading>Resources</FooterHeading>
                        <ul className="space-y-2">
                            {resourceLinks.map(({ to, label }) => (
                                <FooterLink key={to} to={to}>
                                    {label}
                                </FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <FooterHeading>Contact Us</FooterHeading>
                        <ul className="space-y-3">
                            {contactInfo.map(
                                ({ Icon, content, href }, index) => (
                                    <ContactItem
                                        key={index}
                                        Icon={Icon}
                                        href={href}
                                    >
                                        {content}
                                    </ContactItem>
                                )
                            )}
                        </ul>

                        {/* Newsletter Signup (Optional Enhancement) */}
                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Stay Updated
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>© {currentYear} Ayursutra. All rights reserved.</p>

                    {/* Bottom Links */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/privacy"
                            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                            Privacy
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">
                            •
                        </span>
                        <Link
                            to="/terms"
                            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                            Terms
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">
                            •
                        </span>
                        <Link
                            to="/cookies"
                            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                            Cookies
                        </Link>
                    </div>

                    <p className="flex items-center gap-1.5">
                        Made with{" "}
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
                        for your wellness
                    </p>
                </div>
            </div>
        </footer>
    );
};

// ============================================
// Sub-components (properly named to avoid conflicts)
// ============================================

const FooterHeading = ({ children }) => (
    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
        {children}
    </h3>
);

const FooterLink = ({ to, children }) => (
    <li>
        <Link
            to={to}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group"
        >
            <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 transition-all duration-300" />
            {children}
        </Link>
    </li>
);

const ContactItem = ({ Icon, href, children }) => (
    <li>
        <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
        >
            <span className="p-1.5 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-colors">
                <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            <span className="pt-1">{children}</span>
        </a>
    </li>
);

const SocialButton = ({ Icon, href, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-teal-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-110"
    >
        <Icon className="w-4 h-4" />
    </a>
);

export default Footer;

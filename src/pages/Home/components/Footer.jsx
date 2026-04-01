/* eslint-disable no-unused-vars */
// File: patient/components/PatientFooter.jsx

import { Link } from "react-router-dom";
import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    Phone,
    MapPin,
    Leaf,
    Heart,
} from "lucide-react";

export default function PatientFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 border-t border-gray-800 text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <Link
                            to="/patient/dashboard"
                            className="flex items-center gap-2 mb-4"
                        >
                            <div className="p-2 bg-teal-600 rounded-lg">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-white">
                                Ayursutra
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Holistic healthcare platform blending Ayurveda with
                            modern wellness practices.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <SocialIcon
                                Icon={Facebook}
                                href="https://facebook.com"
                            />
                            <SocialIcon
                                Icon={Instagram}
                                href="https://instagram.com"
                            />
                            <SocialIcon
                                Icon={Twitter}
                                href="https://twitter.com"
                            />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <FooterLink to="/patient/dashboard">
                                Dashboard
                            </FooterLink>
                            <FooterLink to="/patient/appointments">
                                Appointments
                            </FooterLink>
                            <FooterLink to="/patient/health-records">
                                Health Records
                            </FooterLink>
                            <FooterLink to="/patient/profile">
                                Profile
                            </FooterLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                            Contact
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <ContactRow Icon={Phone} text="+91-78XXXXXX89" />
                            <ContactRow
                                Icon={Mail}
                                text="support@ayursutra.com"
                            />
                            <ContactRow
                                Icon={MapPin}
                                text="New Delhi, 110095"
                            />
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-800 my-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p>© {year} Ayursutra. All rights reserved.</p>

                    <div className="flex items-center gap-4">
                        <FooterInlineLink to="/privacy">
                            Privacy
                        </FooterInlineLink>
                        <FooterInlineLink to="/terms">Terms</FooterInlineLink>
                        <FooterInlineLink to="/cookies">
                            Cookies
                        </FooterInlineLink>
                    </div>

                    <p className="flex items-center gap-1">Made By Shaan</p>
                </div>
            </div>
        </footer>
    );
}

/* ---------- Small Components ---------- */

const FooterLink = ({ to, children }) => (
    <li>
        <Link to={to} className="hover:text-white transition-colors">
            {children}
        </Link>
    </li>
);

const FooterInlineLink = ({ to, children }) => (
    <Link to={to} className="hover:text-white transition-colors">
        {children}
    </Link>
);

const ContactRow = ({ Icon, text }) => (
    <li className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-teal-500" />
        <span>{text}</span>
    </li>
);

const SocialIcon = ({ Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-teal-600 transition-all"
    >
        <Icon className="w-4 h-4 text-gray-300 hover:text-white" />
    </a>
);

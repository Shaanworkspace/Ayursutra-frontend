/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Sparkles,
    Shield,
    Clock,
    Users,
    Star,
    CheckCircle,
} from "lucide-react";
import Navbar from "@/pages/Home/components/navbar";
import Footer from "./components/Footer";
import axios from "@/lib/axios";
import { toast } from "sonner";

export default function HomePage() {
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    useEffect(() => {
        let intervalId;
        let timeoutId;
        let isServerUp = false;

        const toastId = toast.loading(
            "Starting server… this may take up to 1 or 2 minutes (free tier) Render"
        );

        const checkServer = async () => {
            try {
                await axios.get(`${baseApi}/api/user/health`, {
                    timeout: 5000,
                });

                if (!isServerUp) {
                    isServerUp = true;
                    toast.success("Server is ready Now", { id: toastId });
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                }
            } catch (err) {
                // silently ignore while server is booting
            }
        };

        // Poll every 6 seconds
        intervalId = setInterval(checkServer, 6000);

        // Hard stop after 2 minutes
        timeoutId = setTimeout(() => {
            if (!isServerUp) {
                toast.error(
                    "Server is taking longer than expected. Please try again shortly.",
                    { id: toastId }
                );
                clearInterval(intervalId);
            }
        }, 120000);

        // Start immediately
        checkServer();

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Navbar />

            {/* Main Section */}
            <main className="flex-1  ">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-200/30 dark:bg-cyan-900/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200/30 dark:bg-teal-900/20 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Left Content */}
                            <div className="flex-1 text-center lg:text-left">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Ancient Wisdom, Modern Healing</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                                    Reconnect with your{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">
                                        Inner Balance
                                    </span>
                                </h1>

                                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8 leading-relaxed">
                                    Experience the harmony of Ayurveda and
                                    modern wellness science. Personalized
                                    therapy, certified healers, and holistic
                                    health — all in one place.
                                </p>

                                <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                                    <Link to="/login">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                                        >
                                            <span>Book a Session</span>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                    >
                                        Learn More
                                    </Button>
                                </div>

                                {/* Trust indicators */}
                                <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-medium"
                                            >
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">
                                                2,500+
                                            </span>{" "}
                                            happy clients
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Image/Illustration */}
                            <div className="flex-1 relative">
                                <div className="relative w-full max-w-lg mx-auto">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                                        <img
                                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop"
                                            alt="Wellness and meditation"
                                            className="w-full h-64 object-cover rounded-2xl"
                                        />
                                        {/* Floating card */}
                                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        100% Natural
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Ayurvedic Treatments
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: "15+", label: "Years Experience" },
                                { number: "50+", label: "Expert Healers" },
                                { number: "10K+", label: "Sessions Completed" },
                                { number: "98%", label: "Client Satisfaction" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                                        {stat.number}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-50 dark:bg-gray-800/50 py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Why Choose{" "}
                                <span className="text-cyan-600 dark:text-cyan-400">
                                    Healers
                                </span>
                                ?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                We combine traditional Ayurvedic practices with
                                modern healthcare standards to deliver
                                exceptional wellness experiences.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Certified Experts",
                                    desc: "All our practitioners are certified with extensive training in traditional Ayurveda.",
                                    icon: <Shield className="w-8 h-8" />,
                                    color: "cyan",
                                },
                                {
                                    title: "Personalized Care",
                                    desc: "Customized treatment plans based on your unique body constitution and health goals.",
                                    icon: <Users className="w-8 h-8" />,
                                    color: "teal",
                                },
                                {
                                    title: "Flexible Scheduling",
                                    desc: "Book sessions at your convenience with our easy online scheduling system.",
                                    icon: <Clock className="w-8 h-8" />,
                                    color: "emerald",
                                },
                                {
                                    title: "Holistic Approach",
                                    desc: "Address mind, body, and spirit for complete wellness transformation.",
                                    icon: <Sparkles className="w-8 h-8" />,
                                    color: "green",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="group bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div
                                        className={`w-14 h-14 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-900/50 flex items-center justify-center text-${item.color}-600 dark:text-${item.color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Preview */}
                <section className="bg-white dark:bg-gray-900 py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Our{" "}
                                <span className="text-cyan-600 dark:text-cyan-400">
                                    Services
                                </span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Discover our range of authentic Ayurvedic
                                treatments and wellness services.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Panchakarma Therapy",
                                    desc: "Deep cleansing and rejuvenation therapy to remove toxins and restore balance.",
                                    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=250&fit=crop",
                                    price: "From ₹2,500",
                                },
                                {
                                    title: "Abhyanga Massage",
                                    desc: "Traditional oil massage therapy for relaxation and improved circulation.",
                                    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop",
                                    price: "From ₹1,200",
                                },
                                {
                                    title: "Shirodhara",
                                    desc: "Calming treatment with warm oil flow on the forehead for mental clarity.",
                                    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=250&fit=crop",
                                    price: "From ₹1,800",
                                },
                            ].map((service) => (
                                <div
                                    key={service.title}
                                    className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm font-medium text-cyan-600 dark:text-cyan-400">
                                            {service.price}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {service.desc}
                                        </p>
                                        <Link to="/login">
                                            <Button
                                                variant="outline"
                                                className="w-full group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600 transition-all duration-300"
                                            >
                                                Book Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                What Our{" "}
                                <span className="text-cyan-600 dark:text-cyan-400">
                                    Clients Say
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Priya Sharma",
                                    role: "Software Engineer",
                                    content:
                                        "The Panchakarma therapy completely transformed my health. I feel more energetic and balanced than ever before.",
                                    rating: 5,
                                },
                                {
                                    name: "Rahul Verma",
                                    role: "Business Owner",
                                    content:
                                        "Excellent service and very professional staff. The personalized approach really makes a difference.",
                                    rating: 5,
                                },
                                {
                                    name: "Anita Patel",
                                    role: "Teacher",
                                    content:
                                        "I've been coming here for 6 months and the improvement in my overall wellness is remarkable.",
                                    rating: 5,
                                },
                            ].map((testimonial) => (
                                <div
                                    key={testimonial.name}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-white dark:bg-gray-900 py-20">
                    <div className="container mx-auto px-6">
                        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl p-12 md:p-16 text-center">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Begin your healing journey today
                                </h2>
                                <p className="text-cyan-100 max-w-2xl mx-auto mb-8 text-lg">
                                    Connect with our expert practitioners for a
                                    consultation and rediscover the power of
                                    Ayurveda in your life.
                                </p>
                                <div className="flex gap-4 justify-center flex-wrap">
                                    <Link to="/login">
                                        <Button
                                            size="lg"
                                            className="bg-white text-cyan-600 hover:bg-gray-100 shadow-lg transition-all duration-300 hover:scale-105"
                                        >
                                            Book Appointment
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white/10"
                                    >
                                        Contact Us
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

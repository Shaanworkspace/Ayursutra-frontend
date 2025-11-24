/* eslint-disable no-irregular-whitespace */
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import TherapistCard from "./components/TherapistCard";
import Navbar from "./components/navbar";

export default function TherapistPanel() {
	const [therapists, setTherapists] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const baseUrl = import.meta.env.VITE_API_GATEWAY_BASE_URL;
		axios
			.get(`${baseUrl}/api/therapists`)
			.then((res) => {
				setTherapists(res.data);
				console.log(`${baseUrl}/api/therapists`);
			})
			.catch((err) => {
				console.error("Error fetching therapists:", err);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50/60 to-teal-100/50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm">
				
				<div className="relative w-16 h-16">
					<div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"></div>
					<div className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-700 animate-[spin_2s_linear_infinite]"></div>
				</div>
				<p className="mt-6 text-lg font-semibold text-cyan-700 dark:text-cyan-300 animate-pulse tracking-wide">
					Fetching therapists…
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-cyan-50/80 to-teal-100/60 dark:from-gray-900 dark:to-gray-800 backdrop-blur-md pt-28 pb-20">
			<div className="container mx-auto px-6">
			<Navbar/>
				{/* Heading */}
				<div className="text-center mb-14">
					<h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
						Meet Our <span className="text-cyan-600 dark:text-cyan-400">Therapy Experts</span>
					</h1>
					<p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
						Certified Ayurvedic specialists ready to help you reconnect with your inner balance.
					</p>
					<div className="mt-6 h-1 w-24 bg-cyan-500 mx-auto rounded-full"></div>
				</div>
	
				{/* Data Section */}
				{therapists.length === 0 ? (
					<div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-sm transition-all duration-500">
						<div className="relative">
							<div className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-cyan-300 opacity-75"></div>
							<div className="relative text-6xl mb-4">🌿</div>
						</div>
						<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
							No Therapists Found
						</h2>
						<p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
							Things are a little quiet right now. New healers are joining soon — check back soon to meet our growing team of Ayurvedic experts.
						</p>
						<Button
							onClick={() => window.location.reload()}
							className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition-all duration-300 px-6 rounded-lg"
						>
							Refresh
						</Button>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
						{therapists.map((t) => (
							<div
								key={t.id}
								className="animate-fade-in-up transform hover:-translate-y-2 transition duration-300 ease-in-out"
							>
								<TherapistCard therapist={t} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

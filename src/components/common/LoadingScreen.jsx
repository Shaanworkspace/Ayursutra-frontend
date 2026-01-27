import React from "react";

export default function LoadingScreen({
    text = "Loading, please wait...",
    fullScreen = true,
}) {
    return (
        <div
            className={`${
                fullScreen ? "min-h-screen" : "h-full"
            } flex items-center justify-center bg-gray-950 text-gray-100`}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                </div>

                {/* Text */}
                <p className="text-sm text-gray-400 tracking-wide">{text}</p>
            </div>
        </div>
    );
}

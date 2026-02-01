import { Link } from "react-router-dom";
import { Home, LogIn } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

            {/* Card */}
            <div className="relative z-10 max-w-md w-full bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 text-center">
                {/* BIG EMOJI */}
                <div className="text-7xl animate-bounce mb-4">😵‍💫</div>

                {/* Title */}
                <h1 className="text-6xl font-extrabold tracking-tight text-cyan-400">
                    404
                </h1>

                <p className="mt-2 text-xl font-semibold">
                    Oops! You broke the internet
                </p>

                <p className="mt-3 text-sm text-gray-400">
                    Just kidding 😄 But the page you’re looking for doesn’t
                    exist… yet.
                </p>

                {/* Actions */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
                    >
                        <LogIn className="w-4 h-4" />
                        Login
                    </Link>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white transition"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                </div>

                {/* Dashboard hint */}
                <p className="mt-6 text-xs text-gray-500">Already signed in?</p>

                <Link
                    to="/patient/dashboard"
                    className="mt-1 inline-block text-sm text-cyan-400 hover:underline"
                >
                    Take me back to my dashboard →
                </Link>
            </div>
        </div>
    );
}

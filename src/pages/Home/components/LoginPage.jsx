/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

/**
 * Professional, accessible, and robust Login page.
 *
 * Improvements:
 * - Client-side validation with inline errors
 * - Loading state + disabled submit button + spinner
 * - Show / hide password toggle
 * - "Remember me" checkbox
 * - Focus management and accessible error announcements (aria-live)
 * - Better server error handling
 * - Redirect to dashboard on success (uses react-router's useNavigate)
 * - Clear comments about storing tokens (HttpOnly cookie preferred)
 *
 * Note: Keep using your backend's secure cookie-based auth when possible.
 */
export default function LoginPage() {
    const navigate = useNavigate()
    const emailRef = useRef(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [serverMessage, setServerMessage] = useState("")

    useEffect(() => {
        // focus the email input on mount
        emailRef.current?.focus()
    }, [])

    const validate = () => {
        const errs = {}
        if (!email) {
            errs.email = "Email is required."
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
        ) {
            errs.email = "Enter a valid email address."
        }

        if (!password) {
            errs.password = "Password is required."
        } else if (password.length < 8) {
            errs.password = "Password must be at least 8 characters."
        }

        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setServerMessage("")
        const validation = validate()
        if (Object.keys(validation).length) {
            setErrors(validation)
            // announce first error to screen readers by focusing the first invalid input
            if (validation.email) {
                emailRef.current?.focus()
            }
            return
        }

        setErrors({})
        setIsLoading(true)

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_GATEWAY_BASE_URL}/api/auth/login`,
                { email: email.trim(), password }
            )

            const token = res?.data?.token

            if (!token) {
                throw new Error("Authentication succeeded but no token returned.")
            }

            // NOTE: For best security, set an HttpOnly, Secure cookie from the server.
            // localStorage is used here only because the original code did so.
            if (rememberMe) {
                // Persist token across sessions (still consider server-set cookies instead)
                localStorage.setItem("token", token)
            } else {
                sessionStorage.setItem("token", token)
            }

            toast.success("Logged in successfully!", {
                description: "Redirecting to your dashboard...",
                duration: 2000,
            })

            // small delay to let toast show
            setTimeout(() => {
                navigate("/dashboard", { replace: true })
            }, 800)
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Unable to login. Please try again."

            setServerMessage(message)
            toast.error("Login failed", {
                description: message,
                duration: 4000,
            })
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="w-full max-w-md bg-white/60 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20 dark:border-gray-700/30">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-semibold text-cyan-700 dark:text-cyan-300">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Sign in to continue to your account
                    </p>
                </header>

                {/* Accessible server errors */}
                {serverMessage && (
                    <div
                        role="alert"
                        aria-live="assertive"
                        className="mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-300 p-3 rounded"
                    >
                        {serverMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            ref={emailRef}
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            required
                        />
                        {errors.email && (
                            <p id="email-error" className="mt-1 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                aria-invalid={errors.password ? "true" : "false"}
                                aria-describedby={errors.password ? "password-error" : undefined}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && (
                            <p id="password-error" className="mt-1 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="form-checkbox h-4 w-4 rounded"
                            />
                            <span>Remember me</span>
                        </label>

                        <a
                            href="/forgot-password"
                            className="text-sm text-cyan-600 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center gap-2"
                        disabled={isLoading}
                        aria-disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </form>

                <div className="mt-6 flex items-center gap-3">
                    <hr className="flex-1 border-gray-300 dark:border-gray-700" />
                    <span className="text-sm text-muted-foreground">or continue with</span>
                    <hr className="flex-1 border-gray-300 dark:border-gray-700" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            toast("Redirecting to Google...", { duration: 1500 })
                            // implement OAuth redirect
                            window.location.href = `${import.meta.env.VITE_API_GATEWAY_BASE_URL}/api/auth/google`
                        }}
                        className="flex items-center justify-center gap-2 rounded border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 533.5 544.3"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path fill="#4285f4" d="M533.5 278.4c0-18.3-1.6-36-4.7-53.1H272v100.6h147.1c-6.4 34.7-25.5 64.1-54.4 83.7v69.5h87.9c51.4-47.3 81.9-117 81.9-200.7z" />
                            <path fill="#34a853" d="M272 544.3c73.8 0 135.7-24.6 180.9-66.9l-87.9-69.5c-24.4 16.3-55.6 25.9-93 25.9-71.5 0-132.1-48.2-153.9-112.9H28.4v70.9C73.5 491.8 167 544.3 272 544.3z" />
                            <path fill="#fbbc04" d="M118.1 323.0c-10.9-32.6-10.9-67.6 0-100.2V151.9H28.4c-39.2 77.9-39.2 171.2 0 249.1l89.7-78.0z" />
                            <path fill="#ea4335" d="M272 107.1c39.9-.6 78.1 14.2 107.2 40.9l80.6-80.6C405.8 24.1 344 0 272 0 167 0 73.5 52.5 28.4 151.9l89.7 70.9C139.9 155.3 200.5 107.1 272 107.1z" />
                        </svg>
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            toast("Redirecting to GitHub...", { duration: 1500 })
                            // implement OAuth redirect
                            window.location.href = `${import.meta.env.VITE_API_GATEWAY_BASE_URL}/api/auth/github`
                        }}
                        className="flex items-center justify-center gap-2 rounded border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor" d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.7 3 8.7 7.2 10.1.5.1.7-.2.7-.5 0-.2 0-.9 0-1.7-2.9.6-3.5-1.4-3.5-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 1.6.8 1.6.9 1.6 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.3-.2-4.7-1.1-4.7-5 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3 1.1.9-.3 1.8-.4 2.7-.4s1.8.1 2.7.4c2.1-1.4 3-1.1 3-1.1.6 1.7.2 2.9.1 3.2.7.8 1.1 1.7 1.1 2.8 0 3.9-2.4 4.8-4.7 5 .4.3.7.9.7 1.8 0 1.3 0 2.4 0 2.7 0 .3.2.6.7.5 4.2-1.4 7.2-5.4 7.2-10.1C23.1 5.3 18.3.5 12 .5z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                <p className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-cyan-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}
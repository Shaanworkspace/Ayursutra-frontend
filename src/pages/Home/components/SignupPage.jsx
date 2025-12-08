import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

/**
 * Signup page
 *
 * - Prefills the form with the provided details:
 *   { firstName: "Rahul", lastName: "Sharma", age: 5, email: "r.12@gmail.com", password: "1234" }
 * - Adds accessible client-side validation.
 * - If age < 13, shows guardian/parent fields and requires consent.
 * - Loading state, inline errors, server error handling and success toast + redirect.
 *
 * Note: For production, prefer server-set HttpOnly cookies for auth tokens rather than localStorage.
 */
export default function SignupPage() {
  const navigate = useNavigate()
  const firstNameRef = useRef(null)

  // Prefilled details (as requested)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Guardian fields (required when age < 13)
  const [guardianName, setGuardianName] = useState("")
  const [guardianEmail, setGuardianEmail] = useState("")
  const [guardianConsent, setGuardianConsent] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverMessage, setServerMessage] = useState("")

  useEffect(() => {
    firstNameRef.current?.focus()
  }, [])

  const validate = () => {
    const errs = {}

    if (!firstName.trim()) errs.firstName = "First name is required."
    if (!lastName.trim()) errs.lastName = "Last name is required."

    if (!email.trim()) {
      errs.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Enter a valid email address."
    }

    if (!password) {
      errs.password = "Password is required."
    } else if (password.length < 4) {
      // minimum 4 for demo to accept provided password; recommend stronger in production
      errs.password = "Password must be at least 4 characters."
    }

    if (!age && age !== 0) {
      errs.age = "Age is required."
    } else if (age < 0) {
      errs.age = "Enter a valid age."
    }

    if (age < 13) {
      if (!guardianName.trim()) errs.guardianName = "Parent/guardian name is required for users under 13."
      if (!guardianEmail.trim()) {
        errs.guardianEmail = "Parent/guardian email is required for users under 13."
      } else if (!/\S+@\S+\.\S+/.test(guardianEmail)) {
        errs.guardianEmail = "Enter a valid guardian email address."
      }
      if (!guardianConsent) errs.guardianConsent = "Parental consent is required."
    }

    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerMessage("")
    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      const firstError = Object.keys(validation)[0]
      if (firstError === "firstName") firstNameRef.current?.focus()
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: Number(age),
        email: email.trim(),
        password,
        // include guardian info only when necessary
        ...(Number(age) < 13
          ? {
              guardian: {
                name: guardianName.trim(),
                email: guardianEmail.trim(),
                consent: guardianConsent,
              },
            }
          : {}),
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_GATEWAY_BASE_URL || ""}/api/auth/signup`,
        payload
      )

      // If backend returns token, store appropriately; prefer server-set cookies in real apps
      const token = res?.data?.token
      if (token) {
        // keep it in sessionStorage for current session; change to localStorage if "remember me" desired
        sessionStorage.setItem("token", token)
      }

      toast.success("Account created", {
        description: "Welcome! Redirecting to your dashboard...",
        duration: 3000,
      })

      // small delay so toast is visible before redirect
      setTimeout(() => {
        navigate("/dashboard", { replace: true })
      }, 900)
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Unable to create account. Please try again."
      setServerMessage(message)
      toast.error("Sign up failed", {
        description: message,
        duration: 4000,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-lg bg-white/60 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20 dark:border-gray-700/30">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-cyan-700 dark:text-cyan-300 mb-4">
          Create an account
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
          Sign up to access personalized plans and schedule your first session.
        </p>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                ref={firstNameRef}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                required
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-1 text-sm text-red-600">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                required
              />
              {errors.lastName && (
                <p id="lastName-error" className="mt-1 text-sm text-red-600">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={0}
                value={age}
                onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                aria-invalid={errors.age ? "true" : "false"}
                aria-describedby={errors.age ? "age-error" : undefined}
                required
              />
              {errors.age && (
                <p id="age-error" className="mt-1 text-sm text-red-600">
                  {errors.age}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
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
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Password should be at least 8 characters for best security. (Demo accepts shorter for the provided sample.)
            </p>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Guardian fields displayed when age < 13 */}
          {Number(age) < 13 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md border border-yellow-100 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                Because this account is for a child, a parent or guardian must provide consent and contact details.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianName">Parent / Guardian name</Label>
                  <Input
                    id="guardianName"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Parent or guardian full name"
                    aria-invalid={errors.guardianName ? "true" : "false"}
                    aria-describedby={errors.guardianName ? "guardianName-error" : undefined}
                  />
                  {errors.guardianName && (
                    <p id="guardianName-error" className="mt-1 text-sm text-red-600">
                      {errors.guardianName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="guardianEmail">Parent / Guardian email</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    placeholder="guardian@example.com"
                    aria-invalid={errors.guardianEmail ? "true" : "false"}
                    aria-describedby={errors.guardianEmail ? "guardianEmail-error" : undefined}
                  />
                  {errors.guardianEmail && (
                    <p id="guardianEmail-error" className="mt-1 text-sm text-red-600">
                      {errors.guardianEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2">
                <input
                  id="guardianConsent"
                  type="checkbox"
                  checked={guardianConsent}
                  onChange={(e) => setGuardianConsent(e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                <label htmlFor="guardianConsent" className="text-sm">
                  I confirm I am the parent or legal guardian and consent to this child registering for services.
                </label>
              </div>
              {errors.guardianConsent && (
                <p className="mt-1 text-sm text-red-600">{errors.guardianConsent}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center gap-2"
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-xs text-gray-500 mt-2">
            By creating an account you agree to our{" "}
            <a href="/terms" className="text-cyan-600 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-cyan-600 hover:underline">
              Privacy Policy
            </a>
            . We recommend using a strong, unique password for each account.
          </p>
        </form>
      </div>
    </div>
  )
}
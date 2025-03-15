import { FormEvent, useState } from "react"
import Input from "@/components/Input"
import Logo from "@/components/Logo"
import { useSession } from "@/contexts/SessionContext"
import { useNavigate } from "react-router-dom"
import RevealPasswordButton from "@/components/RevealPasswordButton"
import { CgSpinnerTwoAlt } from "react-icons/cg"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { signUp } = useSession()
  const navigate = useNavigate()

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate email and password match
    if (email !== confirmEmail) {
      setError("Emails do not match")
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
      )
      setLoading(false)
      return
    }

    try {
      await signUp(email, password)
      navigate("/signin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create an account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-72 flex-col gap-4 rounded-md border border-gray-300 bg-white p-4">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="flex w-full items-end justify-between">
          <h1 className="text-base leading-none text-secondary">SignUp</h1>
          <a
            href="/signin"
            className="text-sm font-bold leading-none text-blue-500 hover:underline"
          >
            SignIn
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            type="email"
            id="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            autoComplete="nope"
            required
          />
          <Input
            type="email"
            id="confirmEmail"
            value={confirmEmail}
            onChange={setConfirmEmail}
            placeholder="Confirm Email"
            autoComplete="nope"
            required
          />

          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            autoComplete="nope"
            required
          >
            <RevealPasswordButton
              showPassword={showPassword}
              setShowPassword={() => setShowPassword((prevState) => !prevState)}
            />
          </Input>
          <Input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
            autoComplete="nope"
            required
          >
            <RevealPasswordButton
              showPassword={showPassword}
              setShowPassword={() => setShowPassword((prevState) => !prevState)}
            />
          </Input>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-4 flex items-center justify-center rounded-sm text-sm cursor-pointer hover:scale-105 transition-all active:scale-100 bg-blue-300 p-2"
            disabled={loading}
          >
            {loading ? <CgSpinnerTwoAlt className="animate-spin" size={24} /> : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  )
}

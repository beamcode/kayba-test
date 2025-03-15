import { FormEvent, useState } from "react"
import Input from "@/components/Input"
import Logo from "@/components/Logo"
import { useSession } from "@/contexts/SessionContext"
import { useNavigate } from "react-router-dom"
import RevealPasswordButton from "@/components/RevealPasswordButton"
import { CgSpinnerTwoAlt } from "react-icons/cg"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { signIn } = useSession()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)

      navigate("/todos")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-72 flex-col gap-4 rounded-md border border-gray-300 bg-primary p-4">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="flex w-full items-end justify-between">
          <h1 className="leading-none text-secondary">SignIn</h1>
          <a
            href="/signup"
            className="text-sm font-bold leading-none text-blue-500 hover:underline"
          >
            SignUp
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-4 flex items-center justify-center rounded-sm text-sm cursor-pointer hover:scale-105 transition-all active:scale-100 bg-blue-300 p-2"
            disabled={loading}
          >
            {loading ? <CgSpinnerTwoAlt className="animate-spin" size={24} /> : "SignIn"}
          </button>
        </form>
      </div>
    </div>
  )
}

import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <Link to="/" className="flex gap-2">
      <svg
        width="30"
        height="35"
        viewBox="0 0 80 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer hover:scale-[1.5] transition-all active:scale-100"
      >
        <path
          d="M79 40.8703V101H1V40.8703C1 18.8506 18.4609 1 40 1C61.5388 1 79 18.8506 79 40.8703Z"
          stroke="#D3A086"
          stroke-width="4"
        />
      </svg>

      <div className="flex">
        <h1 className="text-2xl mt-1 font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Kayba Todo
        </h1>
      </div>
    </Link>
  )
}

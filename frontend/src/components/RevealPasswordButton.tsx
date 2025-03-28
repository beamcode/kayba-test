import { twMerge } from "tailwind-merge"

export default function RevealPasswordButton({
  showPassword,
  setShowPassword,
  className,
}: {
  showPassword: boolean
  setShowPassword: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => setShowPassword()}
      className={twMerge(
        "absolute right-3 top-[calc(50%-10px)] flex h-fit items-center text-sm text-zinc-600 outline-none dark:text-white cursor-pointer",
        className
      )}
    >
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="text-default-400 iconify iconify--solar pointer-events-none text-xl"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0" />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20c4.182 0 7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4C7.818 4 4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12m10-3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="pointer-events-none text-xl"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2.69 6.705a.75.75 0 0 0-1.38.59zm12.897 6.624l-.274-.698zm-6.546.409a.75.75 0 1 0-1.257-.818zm-2.67 1.353a.75.75 0 1 0 1.258.818zM22.69 7.295a.75.75 0 0 0-1.378-.59zM19 11.13l-.513-.547zm.97 2.03a.75.75 0 1 0 1.06-1.06zm-8.72 3.34a.75.75 0 0 0 1.5 0zm5.121-.591a.75.75 0 1 0 1.258-.818zm-10.84-4.25A.75.75 0 0 0 4.47 10.6zm-2.561.44a.75.75 0 0 0 1.06 1.06zM12 13.25c-3.224 0-5.539-1.605-7.075-3.26a13.637 13.637 0 0 1-1.702-2.28a11.707 11.707 0 0 1-.507-.946a3.903 3.903 0 0 1-.022-.049l-.004-.01l-.001-.001L2 7a76 76 0 0 0-.69.296h.001l.001.003l.003.006a3.837 3.837 0 0 0 .04.088a13.202 13.202 0 0 0 .58 1.084c.41.69 1.034 1.61 1.89 2.533C5.54 12.855 8.224 14.75 12 14.75zm3.313-.62c-.97.383-2.071.62-3.313.62v1.5c1.438 0 2.725-.276 3.862-.723zm-7.529.29l-1.413 2.17l1.258.818l1.412-2.171zM22 7l-.69-.296h.001v.002l-.007.013a8.017 8.017 0 0 1-.151.313a13.298 13.298 0 0 1-2.666 3.55l1.026 1.094a14.802 14.802 0 0 0 3.122-4.26l.039-.085l.01-.024l.004-.007v-.003h.001v-.001zm-3.513 3.582c-.86.806-1.913 1.552-3.174 2.049l.549 1.396c1.473-.58 2.685-1.444 3.651-2.351zm-.017 1.077l1.5 1.5l1.06-1.06l-1.5-1.5zM11.25 14v2.5h1.5V14zm3.709-.262l1.412 2.171l1.258-.818l-1.413-2.171zm-10.49-3.14l-1.5 1.5L4.03 13.16l1.5-1.5z"
          />
        </svg>
      )}
    </button>
  )
}

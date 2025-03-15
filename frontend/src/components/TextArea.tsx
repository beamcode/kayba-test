import React from "react"
import clsx from "classnames"

interface TextareaProps {
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  autoComplete?: string
  errorMessage?: string
  maxLength?: number
  minLength?: number
  disabled?: boolean
  readOnly?: boolean
  children?: React.ReactNode
  className?: string
  rows?: number
}

export default function Textarea({
  id,
  name,
  value,
  defaultValue = "",
  onChange = () => {},
  placeholder,
  required = false,
  autoComplete = "off",
  errorMessage = "",
  maxLength,
  minLength,
  disabled = false,
  readOnly = false,
  children,
  className,
  rows = 4,
}: TextareaProps) {
  const hasError = Boolean(errorMessage)

  const textareaClasses = clsx(
    "peer w-full appearance-none rounded-sm border border-gray-300 px-3.5 pt-[22px] pb-2 text-sm subpixel-antialiased transition-colors focus:outline-none",
    {
      "bg-pink-100 text-rose-600 focus:bg-pink-100 hover:bg-pink-200 dark:bg-red-950 dark:focus:bg-red-950 dark:hover:bg-red-900":
        hasError,
      "bg-secondary hover:bg-gray-200 dark:hover:bg-zinc-700": !hasError,
    },
    className
  )

  const labelClasses = clsx(
    "pointer-events-none absolute left-3.5 top-[15px] origin-top-left transform text-sm duration-150",
    {
      "text-rose-600": hasError,
      "text-gray-500 dark:text-gray-400": !hasError,
    },
    "-translate-y-2.5 scale-[0.85]",
    "placeholder-shown:translate-y-0 placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-[0.85]"
  )

  const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    autoComplete,
    id,
    name,
    maxLength,
    minLength,
    disabled,
    readOnly,
    required,
    placeholder: "",
    className: textareaClasses,
    rows,
    "aria-invalid": hasError ? "true" : "false",
    "aria-describedby": hasError ? `${id}-error` : undefined,
    onChange: (e) => onChange(e.target.value, e),
  }

  if (value !== undefined) {
    textareaProps.value = value
  } else {
    textareaProps.defaultValue = defaultValue
  }

  return (
    <div className="w-full">
      <div className="relative flex">
        <textarea {...textareaProps} />
        <label htmlFor={id} className={labelClasses}>
          {placeholder} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
      </div>
      {hasError && (
        <span id={`${id}-error`} className="block px-2 pt-1 text-xs leading-none text-rose-600">
          {errorMessage}
        </span>
      )}
    </div>
  )
}

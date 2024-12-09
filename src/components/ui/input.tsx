// src/components/ui/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils" // If this function is missing, please implement or remove it

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(( { className, type, ...props }, ref ) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"
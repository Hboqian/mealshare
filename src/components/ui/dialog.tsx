// src/components/ui/dialog.tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils" // Assuming cn function is available, implement a simple clsx function if not
// cn function is used to merge Tailwind class names, can be omitted if not needed

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  className?: string;
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(( { children, className, ...props }, ref ) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 w-full max-w-lg rounded-md bg-white p-4 shadow-lg",
        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none">
        <span className="sr-only">Close</span>
        ✕
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = "DialogContent"

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 flex flex-col space-y-1.5 text-left", className)} {...props} />
  )
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
  )
}

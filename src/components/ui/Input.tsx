import React from 'react'
import { cn } from "@/src/lib/utils"
// We import dynamically if lucide-react might not be there but we expect it to be installed
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, type, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[--color-primary] transition-colors pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg bg-[--color-base-300]/50 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40",
            "focus:outline-none focus:ring-2 focus:ring-[--color-primary]/50 focus:border-[--color-primary]/50 transition-all",
            Icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

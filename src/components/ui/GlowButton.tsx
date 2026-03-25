import React from "react"
import { cn } from "@/src/lib/utils"

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function GlowButton({ className, variant = 'primary', children, ...props }: GlowButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-all duration-300",
        variant === 'primary' && "bg-gradient-to-r from-[--color-primary] via-[--color-accent-pink] to-[--color-accent-warm] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]",
        variant === 'ghost' && "bg-transparent border border-white/10 hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

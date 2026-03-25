import React from 'react'
import { LanguageSwitcher } from '@/src/components/ui/LanguageSwitcher'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[--color-base-100]">
      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[--color-primary] opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-[--color-accent-pink] opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[20vw] h-[20vw] rounded-full bg-[--color-accent-blue] opacity-15 blur-[80px] pointer-events-none" />
      
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in-95 duration-500">
        {children}
      </div>
    </div>
  )
}

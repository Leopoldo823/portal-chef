import React from 'react'
import { LanguageSwitcher } from '@/src/components/ui/LanguageSwitcher'
import { createClient } from '@/src/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[--color-base-100]">
      {/* Background Glowing Orbs */}
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[--color-primary] opacity-10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-[--color-accent-blue] opacity-15 blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-[--color-accent-pink] opacity-10 blur-[150px] pointer-events-none mix-blend-screen" />
      
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 w-full px-6 flex justify-center animate-in zoom-in-95 duration-700">
        {children}
      </div>
    </div>
  )
}

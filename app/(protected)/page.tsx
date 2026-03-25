'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/src/lib/i18n/LanguageContext'
import { createClient } from '@/src/lib/supabase/client'
import { GlassCard } from '@/src/components/ui/GlassCard'
import { GlowButton } from '@/src/components/ui/GlowButton'

export default function WelcomePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const supabase = createClient()
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setFirstName(user.user_metadata?.first_name || '')
      }
    }
    fetchUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <GlassCard className="max-w-2xl w-full p-12 text-center relative overflow-hidden">
      {/* Decorative inner rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[--color-accent-pink]/30 animate-[spin_10s_linear_infinite] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[--color-primary]/20 animate-[spin_15s_linear_infinite_reverse] pointer-events-none mix-blend-screen" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[--color-primary]/20 text-[--color-primary-content] border border-[--color-primary]/30 text-sm font-medium mb-8 shadow-[0_0_15px_rgba(124,58,237,0.3)] animate-pulse">
          {t('comingSoonBadge')}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[--color-primary] via-[--color-accent-pink] to-[--color-accent-warm] mb-6">
          {t('welcomeTitle')}
        </h1>
        
        <p className="text-xl text-white/80 mb-2 font-medium">
          {t('helloUser', { firstName: firstName || 'Amigo' })}
        </p>

        <p className="text-white/60 mb-12 max-w-md mx-auto">
          {t('welcomeSubheading')}
          <br />
          <span className="text-sm mt-3 block text-white/40">{t('notifyDisclaimer')}</span>
        </p>

        <GlowButton variant="ghost" onClick={handleLogout} className="px-8 text-sm">
          {t('logoutButton')}
        </GlowButton>
      </div>
    </GlassCard>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Loader2 } from 'lucide-react'
import { useLanguage } from '@/src/lib/i18n/LanguageContext'
import { useToast } from '@/src/components/ui/ToastProvider'
import { createClient } from '@/src/lib/supabase/client'
import { GlassCard } from '@/src/components/ui/GlassCard'
import { GlowButton } from '@/src/components/ui/GlowButton'
import { Input } from '@/src/components/ui/Input'

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const { addToast } = useToast()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
      addToast(error.message, 'error')
    } else {
      addToast(t('recoveryEmailSentToast'), 'success')
      setEmail('')
    }
    
    setIsLoading(false)
  }

  return (
    <GlassCard className="p-8 w-full">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[--color-primary] to-[--color-accent-pink] text-center">
          {t('loginTitle')}
        </h1>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
        <Input
          icon={Mail}
          type="email"
          placeholder={t('emailLabel')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <GlowButton type="submit" variant="primary" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : t('forgotPasswordButton')}
        </GlowButton>

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-[--color-primary] hover:text-[--color-accent-pink] transition-colors">
            {t('backToLoginLink')}
          </Link>
        </div>
      </form>
    </GlassCard>
  )
}

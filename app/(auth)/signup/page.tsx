'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Loader2 } from 'lucide-react'
import { useLanguage } from '@/src/lib/i18n/LanguageContext'
import { useToast } from '@/src/components/ui/ToastProvider'
import { createClient } from '@/src/lib/supabase/client'
import { GlassCard } from '@/src/components/ui/GlassCard'
import { GlowButton } from '@/src/components/ui/GlowButton'
import { Input } from '@/src/components/ui/Input'

export default function SignupPage() {
  const { t } = useLanguage()
  const { addToast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${window.location.origin}/login?verified=true`,
      }
    })

    if (error) {
      addToast(error.message, 'error')
    } else {
      addToast(t('checkEmailToast'), 'success')
      router.push('/login')
    }
    
    setIsLoading(false)
  }

  return (
    <GlassCard className="p-8 w-full">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[--color-primary] to-[--color-accent-pink] text-center">
          {t('loginTitle')}
        </h1>
        <p className="text-white/60 text-sm mt-2 text-center">{t('loginTagline')}</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            icon={User}
            type="text"
            placeholder={t('firstNameLabel')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            icon={User}
            type="text"
            placeholder={t('lastNameLabel')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <Input
          icon={Mail}
          type="email"
          placeholder={t('emailLabel')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          icon={Lock}
          type="password"
          placeholder={t('passwordLabel')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <GlowButton type="submit" variant="primary" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : t('signupButton')}
        </GlowButton>

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-[--color-primary] hover:text-[--color-accent-pink] transition-colors">
            {t('alreadyHaveAccountLink')}
          </Link>
        </div>
      </form>
    </GlassCard>
  )
}

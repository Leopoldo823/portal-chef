'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { useLanguage } from '@/src/lib/i18n/LanguageContext'
import { useToast } from '@/src/components/ui/ToastProvider'
import { createClient } from '@/src/lib/supabase/client'
import { GlassCard } from '@/src/components/ui/GlassCard'
import { GlowButton } from '@/src/components/ui/GlowButton'
import { Input } from '@/src/components/ui/Input'

function LoginForm() {
  const { t } = useLanguage()
  const { addToast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchParams?.get('verified') === 'true') {
      addToast(t('verificationToast'), 'success')
      router.replace('/login')
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [searchParams, t, addToast, router, supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      addToast(error.message, 'error')
      setIsLoading(false)
    }
  }

  return (
    <GlassCard className="p-8 w-full">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[--color-primary] to-[--color-accent-pink] rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
          <span className="text-white font-bold text-2xl">M</span>
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[--color-primary] to-[--color-accent-pink] text-center">
          {t('loginTitle')}
        </h1>
        <p className="text-white/60 text-sm mt-2 text-center">{t('loginTagline')}</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
        
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-[--color-primary] hover:text-[--color-accent-pink] transition-colors">
            {t('forgotPasswordLink')}
          </Link>
        </div>

        <GlowButton type="submit" variant="primary" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : t('loginButton')}
        </GlowButton>

        <div className="text-center mt-6">
          <Link href="/signup" className="text-sm text-white/60 hover:text-white transition-colors">
            {t('noAccountLink')}
          </Link>
        </div>
      </form>
    </GlassCard>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<GlassCard className="p-8 w-full flex justify-center"><Loader2 className="animate-spin text-[--color-primary]" /></GlassCard>}>
      <LoginForm />
    </Suspense>
  )
}

'use client'
import { createClient } from '../../utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    if (error) console.error('Login error:', error.message)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div style={{padding: 50, fontFamily: 'system-ui'}}>
        <h1>Uber Next Clone</h1>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{padding: 50, fontFamily: 'system-ui'}}>
      <h1>Uber Next Clone</h1>
      {user ? (
        <div>
          <p>Welcome back: <strong>{user.email}</strong></p>
          <button 
            onClick={signOut}
            style={{
              padding: '12px 24px',
              fontSize: 16,
              marginTop: 16,
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>Sign in to continue</p>
          <button 
            onClick={signInWithGoogle}
            style={{
              padding: '12px 24px',
              fontSize: 16,
              marginTop: 16,
              cursor: 'pointer'
            }}
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  )
}
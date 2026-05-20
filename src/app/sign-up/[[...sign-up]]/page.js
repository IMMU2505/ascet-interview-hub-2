'use client'
import { SignUp } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function Page() {
  const [isFull, setIsFull] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/check-cap')
      .then(res => res.json())
      .then(data => {
        setIsFull(data.isFull)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <p>Loading...</p>
      </div>
    )
  }
  
  if (isFull) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', padding: '20px'}}>
        <h1 style={{fontSize: '2rem', marginBottom: '1rem'}}>Website is full</h1>
        <p style={{fontSize: '1.2rem', color: '#666'}}>We've reached our 10,000 user limit.</p>
        <p style={{fontSize: '1rem', color: '#666', marginTop: '0.5rem'}}>Existing users can still <a href="/sign-in" style={{color: 'blue'}}>log in here</a>.</p>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <SignUp />
    </div>
  )
}
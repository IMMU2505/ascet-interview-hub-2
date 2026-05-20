'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function PracticePage() {
  const [code, setCode] = useState('// Welcome to ASCET Interview Hub\nconsole.log("Hello World");')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setCode(docSnap.data().code)
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [router])

  const saveCode = async () => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { code: code })
      alert('Code saved!')
    }
  }

  const logout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh' }}>
      <div style={{ 
        padding: '12px', 
        backgroundColor: '#252526', 
        borderBottom: '1px solid #3e3e42',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '18px' }}>
          ASCET Interview Hub
        </h1>
        <div>
          <button 
            onClick={saveCode}
            style={{
              marginRight: '8px',
              padding: '6px 16px',
              backgroundColor: '#0e639c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save
          </button>
          <button 
            onClick={logout}
            style={{
              padding: '6px 16px',
              backgroundColor: '#5a5a5a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <div style={{ height: 'calc(100vh - 53px)', width: '100%' }}>
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false
          }}
        />
      </div>
    </div>
  )
}
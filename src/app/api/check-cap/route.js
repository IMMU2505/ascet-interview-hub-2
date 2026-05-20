import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const MAX_USERS = 10000

export async function GET() {
  try {
    const { totalCount } = await clerkClient.users.getUserList({ 
      limit: 1 
    })
    
    return NextResponse.json({ 
      isFull: totalCount >= MAX_USERS,
      count: totalCount 
    })
  } catch (error) {
    return NextResponse.json({ isFull: false, count: 0 })
  }
}
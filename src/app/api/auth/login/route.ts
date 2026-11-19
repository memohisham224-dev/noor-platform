import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
export async function POST(req:Request){ const {email,password}=await req.json(); const u=await prisma.user.findUnique({where:{email}}); if(!u) return NextResponse.json({error:'الايميل مش متسجل'},{status:401}); const ok=await bcrypt.compare(password,u.password); if(!ok) return NextResponse.json({error:'الباسورد غلط'},{status:401}); return NextResponse.json({ok:true,id:u.id,role:u.role,name:u.name}) }

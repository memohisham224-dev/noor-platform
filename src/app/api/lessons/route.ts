import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function POST(req:Request){ const b=await req.json(); const l=await prisma.recordedLesson.create({data:{title:b.title,description:b.description,subject:b.subject,grade:b.grade,videoUrl:b.videoUrl,duration:Number(b.duration)||0,price:Number(b.price)||0,isFreeTrial:!!b.isFreeTrial,status:'DRAFT',teacherId:b.teacherId}}); return NextResponse.json({ok:true,id:l.id}) }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcPrice } from '@/lib/utils'
export async function POST(req:Request){ const b=await req.json(); const {total}=calcPrice(b.plan,b.code); const p=await prisma.payment.create({data:{userId:b.userId,plan:b.plan,amount:total,method:b.method,code:b.code,status:'PENDING'}}); return NextResponse.json({ok:true,paymentId:p.id,total,next:'ابعتلنا صورة التحويل على واتساب للتأكيد'}) }

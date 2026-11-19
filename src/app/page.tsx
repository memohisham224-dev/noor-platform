import Link from 'next/link'
import { prisma } from '@/lib/prisma'
export default async function Home(){
  const teachers = await prisma.user.findMany({ where:{role:'TEACHER'}, take:6 })
  const lessons = await prisma.recordedLesson.findMany({ where:{status:'PUBLISHED'}, take:6, include:{teacher:{select:{name:true}}} })
  return <div dir='rtl' className='max-w-6xl mx-auto px-4'>
    <header className='flex justify-between py-5'><b className='text-xl'>منصة نور ✨</b><div className='flex gap-2'><Link href='/login' className='border px-4 py-2 rounded-xl'>دخول</Link><Link href='/register' className='bg-emerald-600 text-white px-4 py-2 rounded-xl'>ابدأ مجانا</Link></div></header>
    <section className='bg-emerald-600 text-white rounded-3xl p-8 md:p-12 text-center'><h1 className='text-3xl md:text-5xl font-bold'>ذاكر على مهلك .. من أي مكان</h1><p className='mt-3 text-emerald-100'>دروس مسجلة - تكمل من مكان ما وقفت - ملزمة + واجب + رد المدرس في 24 ساعة</p><div className='flex gap-3 justify-center mt-6'><Link href='/teachers' className='bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold'>اختار مدرسك →</Link><Link href='/register' className='border border-white px-6 py-3 rounded-xl font-bold'>جرب درس مجاني 🎁</Link></div><p className='text-sm mt-4'>اشتراك من 350 ج.م / شهر - كود NOOR10 خصم 10%</p></section>
    <section className='py-10'><h2 className='text-2xl font-bold mb-4'>👨‍🏫 المدرسين</h2><div className='grid md:grid-cols-3 gap-4'>{teachers.map(t=><Link key={t.id} href={`/teachers/${t.id}`} className='bg-white border rounded-2xl p-5'><p className='font-bold'>{t.name}</p><p className='text-sm text-gray-500'>{t.subject} - {t.grade}</p></Link>)}{teachers.length===0&&<p className='text-gray-500'>لسه مفيش مدرسين - شغل الـ seed</p>}</div></section>
    <section className='pb-10'><h2 className='text-2xl font-bold mb-4'>✨ دروس جديدة</h2><div className='grid md:grid-cols-3 gap-4'>{lessons.map(l=><Link key={l.id} href={`/lessons/${l.id}`} className='bg-white border rounded-2xl p-5'><p className='text-xs text-emerald-600 font-bold'>{l.subject}</p><p className='font-bold mt-1'>{l.title}</p><p className='text-sm text-gray-500'>{l.teacher.name} - {l.price===0?'مجاني':l.price+' ج.م'}</p></Link>)}</div></section>
  </div>
}

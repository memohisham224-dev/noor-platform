'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
type Role='STUDENT'|'TEACHER'|'PARENT'
export default function Register(){
  const router=useRouter(); const [role,setRole]=useState<Role>('STUDENT')
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [grade,setGrade]=useState('3 ثانوي'); const [school,setSchool]=useState(''); const [subject,setSubject]=useState('رياضيات'); const [experience,setExperience]=useState(''); const [childName,setChildName]=useState(''); const [childGrade,setChildGrade]=useState('3 ثانوي')
  const [err,setErr]=useState(''); const [loading,setLoading]=useState(false)
  async function submit(e:React.FormEvent){ e.preventDefault(); setErr(''); setLoading(true)
    const body:any={name,email,password,role,grade,subject,school,experience:experience?Number(experience):undefined,childName,childGrade}
    const res=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); const d=await res.json(); setLoading(false)
    if(!res.ok){ setErr(d.error||'حصل خطأ'); return } router.push('/dashboard')
  }
  const roles:[Role,string][]=[['STUDENT','طالب 🎓'],['TEACHER','مدرس 👨‍🏫'],['PARENT','ولي أمر 👪']]
  return <div dir='rtl' className='min-h-screen flex items-center justify-center px-4 py-8 text-right'><div className='w-full max-w-md mx-auto'>
    <form onSubmit={submit} className='bg-white border rounded-2xl w-full p-6 flex flex-col gap-4 text-right'>
      <h1 className='text-2xl font-bold text-center'>اعمل حسابك مجانا ✨</h1><p className='text-center text-gray-500 text-sm'>أول درس في كل كورس مجاني - جرب قبل ما تدفع</p>
      {err&&<p className='bg-red-50 text-red-600 p-3 rounded-xl text-sm'>{err}</p>}
      <div className='flex flex-row gap-2'>{roles.map(([r,label])=><button type='button' key={r} onClick={()=>setRole(r)} className={`flex-1 py-3 rounded-lg font-bold text-sm ${role===r?'bg-emerald-600 text-white':'border'}`}>{label}</button>)}</div>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder='الاسم بالكامل' className='w-full p-3 rounded-lg border' required/>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='الايميل' className='w-full p-3 rounded-lg border' required/>
      <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='الباسورد - 6 حروف على الأقل' className='w-full p-3 rounded-lg border' required/>
      {role==='STUDENT'&&<><select value={grade} onChange={e=>setGrade(e.target.value)} className='w-full p-3 rounded-lg border'><option>1 ثانوي</option><option>2 ثانوي</option><option>3 ثانوي</option><option>1 اعدادي</option><option>2 اعدادي</option><option>3 اعدادي</option></select><input value={school} onChange={e=>setSchool(e.target.value)} placeholder='المدرسة (اختياري)' className='w-full p-3 rounded-lg border'/></>}
      {role==='TEACHER'&&<><select value={subject} onChange={e=>setSubject(e.target.value)} className='w-full p-3 rounded-lg border'><option>رياضيات</option><option>فيزياء</option><option>كيمياء</option><option>أحياء</option><option>عربي</option><option>انجليزي</option></select><select value={grade} onChange={e=>setGrade(e.target.value)} className='w-full p-3 rounded-lg border'><option>1 ثانوي</option><option>2 ثانوي</option><option>3 ثانوي</option></select><input value={experience} onChange={e=>setExperience(e.target.value)} placeholder='سنين الخبرة' type='number' className='w-full p-3 rounded-lg border'/></>}
      {role==='PARENT'&&<><input value={childName} onChange={e=>setChildName(e.target.value)} placeholder='اسم ابنك / بنتك' className='w-full p-3 rounded-lg border' required/><select value={childGrade} onChange={e=>setChildGrade(e.target.value)} className='w-full p-3 rounded-lg border'><option>1 ثانوي</option><option>2 ثانوي</option><option>3 ثانوي</option></select></>}
      <button disabled={loading} className='w-full bg-black text-white p-3 rounded-lg font-bold'>{loading?'بنسجل...':'سجل وابدأ مجانا'}</button>
    </form>
    <Link href='/login' className='mt-4 block text-center text-sm text-emerald-600 font-bold'>عندك حساب؟ ادخل →</Link>
  </div></div>
}

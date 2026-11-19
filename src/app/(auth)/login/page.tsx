'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function Login(){
  const router = useRouter()
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState(''); const [loading,setLoading]=useState(false)
  async function submit(e:React.FormEvent){ e.preventDefault(); setErr(''); setLoading(true)
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
    const d = await res.json(); setLoading(false)
    if(!res.ok){ setErr(d.error||'الايميل أو الباسورد غلط'); return }
    router.push('/dashboard')
  }
  return <div dir='rtl' className='min-h-screen flex items-center justify-center px-4'><form onSubmit={submit} className='bg-white border rounded-2xl p-6 w-full max-w-md flex flex-col gap-3'>
    <h1 className='text-2xl font-bold text-center'>أهلا بيك تاني 👋</h1><p className='text-center text-gray-500 text-sm'>ادخل عشان تكمل من مكان ما وقفت</p>
    {err&&<p className='bg-red-50 text-red-600 p-3 rounded-xl text-sm'>{err}</p>}
    <label className='text-sm font-bold'>الايميل<input value={email} onChange={e=>setEmail(e.target.value)} placeholder='you@email.com' className='w-full border rounded-xl p-3 mt-1 font-normal' required/></label>
    <label className='text-sm font-bold'>الباسورد<input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='••••••••' className='w-full border rounded-xl p-3 mt-1 font-normal' required/></label>
    <button disabled={loading} className='bg-emerald-600 text-white py-3 rounded-xl font-bold'>{loading?'بندخلك...':'دخول'}</button>
    <Link href='/register' className='text-center text-sm text-emerald-600 font-bold'>معندكش حساب؟ سجل دلوقتي →</Link>
    <Link href='/' className='text-center text-sm text-gray-400'>← ارجع للهوم</Link>
  </form></div>
}

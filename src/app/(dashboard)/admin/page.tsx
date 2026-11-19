import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import UsersTable from './users-table'

export default async function Admin() {
  const drafts = await prisma.recordedLesson.findMany({
    where: { status: 'DRAFT' },
    include: { teacher: { select: { name: true } } },
  })
  const published = await prisma.recordedLesson.count({
    where: { status: 'PUBLISHED' },
  })
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      grade: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  const payments = await prisma.payment.count()
  const userRows = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }))

  return (
    <div dir="rtl" className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">👑 لوحة الأدمن</h1>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
          {users.length} مستخدم
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-black text-gray-900">{users.length}</p>
          <p className="mt-1 text-sm text-gray-500">مستخدم</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-black text-gray-900">{published}</p>
          <p className="mt-1 text-sm text-gray-500">درس منشور</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-black text-gray-900">{payments}</p>
          <p className="mt-1 text-sm text-gray-500">دفعة</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <UsersTable users={userRows} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">
          دروس مستنية الموافقة ({drafts.length})
        </h2>
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="mt-4 flex flex-col gap-3 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="text-right">
              <p className="font-bold text-gray-900">{draft.title}</p>
              <p className="mt-1 text-sm text-gray-500">
                {draft.teacher.name} - {draft.subject}
              </p>
            </div>
            <Link
              href={`/lessons/${draft.id}`}
              className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-bold text-white hover:bg-emerald-700"
            >
              راجع الدرس
            </Link>
          </div>
        ))}
        {drafts.length === 0 && (
          <p className="mt-3 text-gray-500">مفيش دروس مستنية</p>
        )}
      </div>
    </div>
  )
}
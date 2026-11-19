import { prisma } from '@/lib/prisma'
import StudentsTable from './students-table'

export default async function Students() {
  const teacher = await prisma.user.findFirst({ where: { role: 'TEACHER' } })
  if (!teacher) return <div dir="rtl">مفيش مدرس</div>

  const lessons = await prisma.recordedLesson.findMany({
    where: { teacherId: teacher.id },
    select: { id: true },
  })
  const progress = await prisma.progress.findMany({
    where: { lessonId: { in: lessons.map((lesson) => lesson.id) } },
    include: {
      user: {
        select: { name: true, email: true, grade: true },
      },
      lesson: { select: { title: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })
  const studentRows = progress.map((item) => ({
    id: item.id,
    name: item.user.name,
    email: item.user.email,
    grade: item.user.grade,
    lesson: item.lesson.title,
    completed: item.completed,
    watchedSec: item.watchedSec,
    updatedAt: item.updatedAt.toISOString(),
  }))

  return (
    <div dir="rtl" className="mx-auto max-w-6xl text-right">
      <h1 className="text-2xl font-bold">👥 طلابي - {teacher.name}</h1>
      <p className="mt-1 text-gray-500">
        {lessons.length} درس - {progress.length} تقدم
      </p>
      <StudentsTable students={studentRows} />
    </div>
  )
}

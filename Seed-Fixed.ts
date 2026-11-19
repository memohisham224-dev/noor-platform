import { PrismaClient, Role, LessonStatus, PaymentStatus } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Cleaning old data...");
  await prisma.payment.deleteMany();
  await prisma.accessCode.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.recordedLesson.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("123456", 10);

  console.log("👨‍🏫 Creating teachers...");
  const teachersData = [
    { name: "أحمد محمود", email: "ahmed.teacher@noor.com", subject: "الرياضيات", school: "مدرسة النور", experience: 8, grade: "3 ثانوي" },
    { name: "سارة علي", email: "sara.teacher@noor.com", subject: "اللغة العربية", school: "مدرسة النور", experience: 6, grade: "3 ثانوي" },
    { name: "محمد خالد", email: "mohamed.teacher@noor.com", subject: "اللغة الإنجليزية", school: "مدرسة النور", experience: 10, grade: "2 ثانوي" },
    { name: "نور الهدى", email: "noor.teacher@noor.com", subject: "العلوم", school: "مدرسة النور", experience: 5, grade: "1 ثانوي" },
  ];

  const teachers = [];
  for (const t of teachersData) {
    const teacher = await prisma.user.create({
      data: { ...t, password: hashedPassword, role: Role.TEACHER },
    });
    teachers.push(teacher);
  }

  console.log("👑 Creating admin...");
  const admin = await prisma.user.create({
    data: {
      name: "مدير المنصة",
      email: "admin@noor.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("🎓 Creating students...");
  const studentsData = [
    { name: "أحمد", email: "ahmed@test.com", grade: "3 ثانوي" },
    { name: "يوسف سامي", email: "youssef@student.com", grade: "3 ثانوي" },
    { name: "مريم أحمد", email: "mariam@student.com", grade: "2 ثانوي" },
    { name: "عمر خالد", email: "omar@student.com", grade: "3 ثانوي" },
    { name: "فاطمة علي", email: "fatma@student.com", grade: "1 ثانوي" },
    { name: "خالد محمود", email: "khaled@student.com", grade: "2 ثانوي" },
    { name: "نورهان سعيد", email: "norhan@student.com", grade: "3 ثانوي" },
    { name: "عبدالله حسن", email: "abdullah@student.com", grade: "1 ثانوي" },
    { name: "زينب محمد", email: "zeinab@student.com", grade: "2 ثانوي" },
    { name: "حسن إبراهيم", email: "hassan@student.com", grade: "3 ثانوي" },
  ];

  const students = [];
  for (const s of studentsData) {
    const student = await prisma.user.create({
      data: { ...s, password: hashedPassword, role: Role.STUDENT },
    });
    students.push(student);
  }

  console.log("📚 Creating lessons...");
  const lessonsData = [
    { title: "الجبر - المعادلات التربيعية", description: "شرح كامل للمعادلات التربيعية وحلها بالتحليل والقانون العام", subject: "الرياضيات", grade: "3 ثانوي", price: 150, duration: 45, teacherId: teachers[0].id, status: LessonStatus.PUBLISHED },
    { title: "الهندسة - الدائرة", description: "شرح الدائرة ونظرياتها والزوايا المركزية والمحيطية", subject: "الرياضيات", grade: "3 ثانوي", price: 120, duration: 38, teacherId: teachers[0].id, status: LessonStatus.PUBLISHED },
    { title: "النحو - كان وأخواتها", description: "شرح كان وأخواتها وإعرابها مع تدريبات", subject: "اللغة العربية", grade: "3 ثانوي", price: 100, duration: 40, teacherId: teachers[1].id, status: LessonStatus.PUBLISHED },
    { title: "البلاغة - التشبيه والاستعارة", description: "شرح التشبيه والاستعارة والكناية بأمثلة من النصوص", subject: "اللغة العربية", grade: "2 ثانوي", price: 0, duration: 30, isFreeTrial: true, teacherId: teachers[1].id, status: LessonStatus.PUBLISHED },
    { title: "Grammar - Present Perfect", description: "شرح زمن المضارع التام واستخداماته مع تدريبات", subject: "اللغة الإنجليزية", grade: "2 ثانوي", price: 130, duration: 42, teacherId: teachers[2].id, status: LessonStatus.PUBLISHED },
    { title: "Vocabulary - الثانوية العامة", description: "أهم كلمات الثانوية العامة مع النطق والأمثلة", subject: "اللغة الإنجليزية", grade: "3 ثانوي", price: 90, duration: 35, teacherId: teachers[2].id, status: LessonStatus.PUBLISHED },
    { title: "الكيمياء - التفاعلات الكيميائية", description: "شرح التفاعلات الكيميائية وأنواعها وموازنتها", subject: "العلوم", grade: "1 ثانوي", price: 110, duration: 50, teacherId: teachers[3].id, status: LessonStatus.PUBLISHED },
    { title: "الفيزياء - الحركة", description: "شرح الحركة والسرعة والعجلة وقوانين نيوتن", subject: "العلوم", grade: "1 ثانوي", price: 0, duration: 28, isFreeTrial: true, teacherId: teachers[3].id, status: LessonStatus.PUBLISHED },
    { title: "التفاضل - النهايات", description: "درس مسودة لم يتم نشره بعد", subject: "الرياضيات", grade: "3 ثانوي", price: 150, duration: 55, teacherId: teachers[0].id, status: LessonStatus.DRAFT },
  ];

  const lessons = [];
  for (const l of lessonsData) {
    const lesson = await prisma.recordedLesson.create({
      data: {
        ...l,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    });
    lessons.push(lesson);
  }

  console.log("💳 Creating payments...");
  const paidLessons = lessons.filter((l) => l.price > 0 && l.status === "PUBLISHED");
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const lesson = paidLessons[i % paidLessons.length];
    await prisma.payment.create({
      data: {
        userId: student.id,
        lessonId: lesson.id,
        plan: "SINGLE_LESSON",
        amount: lesson.price,
        method: i % 2 === 0 ? "VODAFONE_CASH" : "CASH",
        status: PaymentStatus.COMPLETED,
      },
    });
    // Extra payment for first 3 students
    if (i < 3) {
      const lesson2 = paidLessons[(i + 2) % paidLessons.length];
      await prisma.payment.create({
        data: {
          userId: student.id,
          lessonId: lesson2.id,
          plan: "SINGLE_LESSON",
          amount: lesson2.price,
          method: "INSTAPAY",
          status: PaymentStatus.COMPLETED,
        },
      });
    }
  }
  // One pending payment
  await prisma.payment.create({
    data: {
      userId: students[0].id,
      lessonId: paidLessons[0].id,
      plan: "SINGLE_LESSON",
      amount: paidLessons[0].id ? paidLessons[0].price : 150,
      method: "VODAFONE_CASH",
      status: PaymentStatus.PENDING,
    },
  });

  console.log("📈 Creating progress...");
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const lesson = lessons[i % lessons.length];
    await prisma.progress.create({
      data: {
        userId: student.id,
        lessonId: lesson.id,
        watchedSec: i % 3 === 0 ? lesson.duration * 60 : 600,
        completed: i % 3 === 0,
      },
    });
  }

  console.log("🎟️ Creating access codes...");
  for (const lesson of paidLessons.slice(0, 3)) {
    await prisma.accessCode.create({
      data: {
        code: `NOOR-${lesson.subject.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        lessonId: lesson.id,
        price: lesson.price,
        method: "CASH",
        generatedBy: admin.id,
      },
    });
  }
  // One used code
  await prisma.accessCode.create({
    data: {
      code: "NOOR-USED-1234",
      lessonId: paidLessons[0].id,
      price: paidLessons[0].price,
      method: "CASH",
      isUsed: true,
      usedById: students[0].id,
      generatedBy: admin.id,
      usedAt: new Date(),
    },
  });

  console.log("✅ Seed done!");
  console.log(`- Users: ${teachers.length + students.length + 1}`);
  console.log(`- Lessons: ${lessons.length} (${lessons.filter(l=>l.status==="PUBLISHED").length} published)`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

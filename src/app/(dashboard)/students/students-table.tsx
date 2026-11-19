"use client";

import { useMemo, useState } from "react";
import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

type StudentProgress = {
  id: string;
  name: string;
  email: string;
  grade: string | null;
  lesson: string;
  completed: boolean;
  watchedSec: number;
  updatedAt: string;
};

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, StudentProgress>();
const columns = columnHelper.columns([
  columnHelper.accessor("name", { header: "الطالب" }),
  columnHelper.accessor("email", { header: "الإيميل" }),
  columnHelper.accessor("grade", {
    header: "الصف",
    cell: ({ getValue }) => getValue() || "—",
  }),
  columnHelper.accessor("lesson", { header: "الدرس" }),
  columnHelper.accessor((student) => Number(student.completed), {
    id: "progress",
    header: "التقدم",
    cell: ({ row }) =>
      row.original.completed
        ? "✅ خلص"
        : `⏳ لسه - ${row.original.watchedSec} ث`,
  }),
  columnHelper.accessor("updatedAt", {
    header: "آخر تحديث",
    cell: ({ getValue }) =>
      new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium" }).format(
        new Date(getValue()),
      ),
  }),
]);

export default function StudentsTable({
  students,
}: {
  students: StudentProgress[];
}) {
  const [search, setSearch] = useState("");
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query),
    );
  }, [search, students]);

  const table = useTable({
    features,
    columns,
    data: filteredStudents,
    getRowId: (student) => student.id,
  });
  const rows = table.getRowModel().rows;

  return (
    <section dir="rtl" className="mt-4 w-full text-right">
      <label htmlFor="students-search" className="sr-only">
        بحث بالاسم أو الإيميل
      </label>
      <input
        id="students-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="ابحث بالاسم أو الإيميل"
        className="mb-4 w-full rounded-lg border p-3 text-right"
      />
      <div className="w-full overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse text-right">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      aria-sort={
                        sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : "none"
                      }
                      className="border-b px-3 py-3"
                    >
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex w-full items-center justify-between gap-2 text-right font-bold"
                      >
                        <table.FlexRender header={header} />
                        <span aria-hidden="true">
                          {sorted === "asc"
                            ? "↑"
                            : sorted === "desc"
                              ? "↓"
                              : "↕"}
                        </span>
                      </button>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b last:border-b-0">
                {row.getAllCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-3">
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-6 text-center text-gray-500"
                >
                  {students.length === 0
                    ? "لسه مفيش طلاب بدأوا"
                    : "مفيش نتائج مطابقة"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

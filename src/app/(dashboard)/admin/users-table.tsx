"use client";

import { useMemo, useState } from "react";
import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "PARENT" | "ADMIN";
  grade: string | null;
  createdAt: string;
};

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, AdminUser>();
const columns = columnHelper.columns([
  columnHelper.accessor("name", { header: "الاسم" }),
  columnHelper.accessor("email", { header: "الإيميل" }),
  columnHelper.accessor("role", {
    header: "الدور",
    cell: ({ getValue }) =>
      ({
        STUDENT: "طالب",
        TEACHER: "مدرس",
        PARENT: "ولي أمر",
        ADMIN: "أدمن",
      })[getValue()],
  }),
  columnHelper.accessor("grade", {
    header: "الصف",
    cell: ({ getValue }) => getValue() || "—",
  }),
  columnHelper.accessor("createdAt", {
    header: "تاريخ التسجيل",
    cell: ({ getValue }) =>
      new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium" }).format(
        new Date(getValue()),
      ),
  }),
]);

export default function UsersTable({ users }: { users: AdminUser[] }) {
  const [search, setSearch] = useState("");
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [search, users]);

  const table = useTable({
    features,
    columns,
    data: filteredUsers,
    getRowId: (user) => user.id,
  });
  const rows = table.getRowModel().rows;

  return (
    <section dir="rtl" className="w-full p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-gray-900">المستخدمين ({users.length})</h2>
        <label htmlFor="admin-user-search" className="sr-only">
          بحث بالاسم أو الإيميل
        </label>
        <input
          id="admin-user-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث بالاسم أو الإيميل"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-right text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-80"
        />
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w- border-collapse text-right text-sm">
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
                      className="border-b border-gray-200 px-4 py-3 text-right"
                    >
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex w-full items-center justify-between gap-2 text-right font-bold text-gray-900"
                      >
                        <table.FlexRender header={header} />
                        <span aria-hidden="true" className="shrink-0 text-gray-400">
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
              <tr key={row.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                {row.getAllCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700">
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-gray-500"
                >
                  {users.length === 0
                    ? "مفيش مستخدمين لسه"
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
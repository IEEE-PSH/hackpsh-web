"use client";

import {
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { cn } from "@/app/_lib/client-utils";
import { useState } from "react";
import { type AllUsers } from "@/server/dao/user";
import { columns } from "@/app/_components/settings/user-columns";
import UserOptionsSheet from "./user-options-sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { trpc } from "@/app/_trpc/react";
import { type TUserRole } from "@/db/drizzle/startup_seed";

interface UserTableProps {
  data: AllUsers;
  userUUID: string;
  className?: string;
}

export default function UserTable({
  data,
  userUUID,
  className,
}: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currRole, setCurrRole] = useState<TUserRole>("participant");

  const { data: currData = data } = trpc.user.get_users.useQuery({
    role: currRole,
  });

  const table = useReactTable({
    data: currData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="my-4 flex items-center justify-between space-x-4">
        <Input
          placeholder="Search a user"
          value={
            (table
              .getColumn("user_display_name")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("user_display_name")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          onValueChange={(value) => {
            setCurrRole(String(value) as TUserRole);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Participant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="participant">Participant</SelectItem>
            <SelectItem value="officer">Officer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className="flex justify-between">
                        <div className="my-auto">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>

                        {cell.column.id === "user_email_address" ? (
                          <UserOptionsSheet
                            userDisplayName={row.original.user_display_name!}
                            userUUID={userUUID}
                            targetUUID={row.original.user_uuid}
                            userRole={row.original.user_role}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

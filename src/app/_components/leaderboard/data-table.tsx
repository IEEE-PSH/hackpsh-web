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
import { columns } from "@/app/_components/leaderboard/columns";
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
import { type LeaderboardStandings } from "@/server/dao/leaderboard";
import { type TUserInfo } from "@/server/dao/user";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import TeamOptionsSheet from "./team-options-sheet";

interface DataTableProps {
  data: LeaderboardStandings;
  className?: string;
  userData: TUserInfo;
}

export default function DataTable({
  data,
  className,
  userData,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
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

  //move later
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [teamUUIDToEdit, setTeamUUIDToEdit] = useState<string | null>(null);

  return (
    <>
      {teamUUIDToEdit && (
        <TeamOptionsSheet
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          teamUUID={teamUUIDToEdit}
          userData={userData}
        />
      )}

      <div className={cn("w-full", className)}>
        <div className="flex items-center py-4">
          <Input
            placeholder="Search a team"
            value={
              (table.getColumn("team_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("team_name")?.setFilterValue(event.target.value)
            }
            className="sm:max-w-sm"
          />
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
                        <div className="flex h-6 items-center justify-between">
                          <div className="my-auto">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>

                          {cell.column.id === "team_total_points" ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setTeamUUIDToEdit(row.original.team_uuid);
                                setSheetOpen(true);
                              }}
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
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
                    No teams.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

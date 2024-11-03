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
import { columns } from "@/app/_components/teams/teams-columns";
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
import { type TUserInfo } from "@/server/dao/user";
import { Button } from "../ui/button";
import TeamInfoSheet from "./team-info-sheet";
import TeamCreateDialog from "./team-create-dialog";
import TeamDeleteDialog from "./team-delete-dialog";
import TeamJoinDialog from "./team-join-dialog";
import TeamLeaveDialog from "./team-leave-dialog";
import { Settings } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { type Teams } from "@/server/dao/team";

interface TeamsTableProps {
  data: Teams;
  className?: string;
  userData: TUserInfo;
}

export default function TeamsTable({
  data,
  className,
  userData,
}: TeamsTableProps) {
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

  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [teamUUID, setTeamUUID] = useState<string | null>(null);

  return (
    <>
      {teamUUID && (
        <TeamInfoSheet
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          teamUUID={teamUUID}
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
            className="mr-auto max-w-sm"
          />

          {userData?.user_team_uuid ? (
            <>
              <TeamLeaveDialog userUUID={userData.user_uuid} />
              <Link href={siteConfig.paths.team}>
                <Button variant="outline" className="ml-4 gap-2">
                  <Settings className="h-4 w-4 " />
                  <span className="text-nowrap">Settings</span>
                </Button>
              </Link>
            </>
          ) : (
            <TeamCreateDialog />
          )}
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

                          {cell.column.id === "team_member_count" && (
                            <div className="flex items-center gap-2">
                              {row.original.team_uuid !==
                                userData?.user_team_uuid && (
                                <TeamJoinDialog
                                  teamName={row.original.team_name}
                                />
                              )}

                              <Button
                                variant="secondary"
                                className="h-8"
                                onClick={() => {
                                  setSheetOpen(true);
                                  setTeamUUID(row.original.team_uuid);
                                }}
                              >
                                View
                              </Button>
                              <TeamDeleteDialog
                                teamUUID={row.original.team_uuid}
                                userData={userData}
                              />
                            </div>
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

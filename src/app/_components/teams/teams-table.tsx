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
import { useEffect, useState } from "react";
import { type TUserInfo } from "@/server/dao/user";
import { Button } from "../ui/button";
import TeamInfoSheet from "./team-info-sheet";
import TeamCreateDialog from "./team-create-dialog";
import TeamDeleteDialog from "./team-delete-dialog";
import TeamJoinDialog from "./team-join-dialog";
import TeamLeaveDialog from "./team-leave-dialog";
import { RefreshCcw, Settings } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { type Teams } from "@/server/dao/team";
import { Icons } from "../ui/icons";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";

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

  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [teamUUID, setTeamUUID] = useState<string>("");
  const [teamsData, setTeamsData] = useState<Teams>(data);
  const [userTeamUUID, setUserTeamUUID] = useState<string | null>(
    userData!.user_team_uuid,
  );

  const table = useReactTable({
    data: teamsData,
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

  const { isRefetching, refetch: getTeams } = trpc.team.get_teams.useQuery(
    undefined,
    {
      enabled: false,
      onSuccess: (teams) => {
        void (async () => {
          await getUserClientData();
          setTeamsData(teams);
        })();
      },
    },
  );

  const { refetch: getUserClientData } = trpc.user.get_user_info.useQuery(
    {
      user_uuid: userData!.user_uuid,
    },
    {
      enabled: false,
      onSuccess: (userClientData) => {
        setUserTeamUUID(userClientData.user_team_uuid);
      },
      onError: () => {
        setUserTeamUUID(null);
      },
    },
  );

  return (
    <>
      {teamUUID && (
        <TeamInfoSheet
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          teamUUID={teamUUID}
          getTeams={getTeams}
        />
      )}

      <div className={cn("w-full", className)}>
        <div className="flex flex-col items-center justify-between gap-y-4 py-4 sm:flex-row">
          <div className="order-2 flex w-full sm:order-1">
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
            <Button
              size="icon"
              variant="outline"
              className="ml-4 mr-auto flex-shrink-0"
              onClick={() => getTeams()}
              disabled={isRefetching}
            >
              {isRefetching ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="order-1 flex sm:order-2">
            {userTeamUUID ? (
              <>
                <TeamLeaveDialog
                  userUUID={userData!.user_uuid}
                  getTeams={getTeams}
                />
                <Link href={siteConfig.paths.team}>
                  <Button variant="outline" className="ml-4 gap-2">
                    <Settings className="h-4 w-4 " />
                    <span className="text-nowrap">Settings</span>
                  </Button>
                </Link>
              </>
            ) : (
              <TeamCreateDialog
                userRole={userData!.user_role}
                getTeams={getTeams}
              />
            )}
          </div>
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
                              {row.original.team_uuid !== userTeamUUID && (
                                <TeamJoinDialog
                                  teamName={row.original.team_name}
                                  getTeams={getTeams}
                                />
                              )}

                              <Button
                                variant="secondary"
                                className="h-8"
                                onClick={() => {
                                  setTeamUUID(row.original.team_uuid);
                                  setSheetOpen(true);
                                }}
                              >
                                View
                              </Button>
                              {userData?.user_role !== "participant" && (
                                <TeamDeleteDialog
                                  teamUUID={row.original.team_uuid}
                                  getTeams={getTeams}
                                />
                              )}
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

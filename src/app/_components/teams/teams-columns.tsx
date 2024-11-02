"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { type TeamStanding } from "@/server/dao/leaderboard";
import { trpc } from "@/app/_trpc/react";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";

export const columns: ColumnDef<TeamStanding>[] = [
  {
    accessorKey: "team_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <p className="ml-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {row.getValue("team_name")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "team_size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const teamInfo = trpc.team.get_team_info.useQuery({
        team_uuid: row.original.team_uuid,
      });

      if (teamInfo.data?.team_members)
        return (
          <div className="ml-4 font-medium">
            {teamInfo.data.team_members.length}/4
          </div>
        );
      else {
        return <Skeleton className="ml-4 h-5 w-10" />;
      }
    },
  },
];

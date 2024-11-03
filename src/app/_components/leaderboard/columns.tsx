"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { type TeamStanding } from "@/server/dao/leaderboard";

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
    accessorKey: "team_total_points",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4 font-medium">
          {row.getValue("team_total_points")}
        </div>
      );
    },
  },
];

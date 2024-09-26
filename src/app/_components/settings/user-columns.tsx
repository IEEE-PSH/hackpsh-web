"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { type User } from "@/server/dao/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user_display_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <p className="ml-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {row.getValue("user_display_name")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "user_email_address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4 font-medium">
          {row.getValue("user_email_address")}
        </div>
      );
    },
  },
];

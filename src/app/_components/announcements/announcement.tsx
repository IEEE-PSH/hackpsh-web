"use client";
import { useEffect, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";

export default function Announcement({ data }: { data: PartialBlock[] }) {
  //const { theme } = useTheme();
  const announcement: BlockNoteEditor = useBlockNote({
    editable: false,
    initialContent: data,
  });
  return <BlockNoteView editor={announcement} />;
}

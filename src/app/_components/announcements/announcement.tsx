"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

type AnnouncementProps = {
  data: PartialBlock[];
  theme: "light" | "dark";
};
export default function Announcement({ data, theme }: AnnouncementProps) {
  //const { theme } = useTheme();
  const announcement: BlockNoteEditor = useBlockNote({
    editable: false,
    initialContent: data,
  });
  return <BlockNoteView editor={announcement} theme={theme} />;
}

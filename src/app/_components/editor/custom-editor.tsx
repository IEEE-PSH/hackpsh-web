"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "@/app/markdown.module.css";
import { Input } from "../ui/input";
import CustomToolbar from "./custom-toolbar";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

type CustomEditorProps = {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onChange: (richText: string) => void;
};
export default function CustomEditor({
  setContent,
  onChange,
}: CustomEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Underline, Highlight],
    editorProps: {
      attributes: {
        class:
          "min-h-[12rem] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      const data = editor.getHTML();
      onChange(data);
      setContent(data);
    },
  });
  return (
    <>
      <CustomToolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}

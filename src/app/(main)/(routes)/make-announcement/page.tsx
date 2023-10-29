"use client";
import React, { useState, useEffect } from "react";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { Button } from "@/app/_components/ui/button";
import Announcement from "@/app/_components/announcements/announcement";
import { useTheme } from "next-themes";

export default function MakeAnnouncement() {
  const editor: BlockNoteEditor = useBlockNote({});
  const [arr, setArr] = useState<Array<PartialBlock[]>>([]);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  function saveBlocks() {
    setArr([...arr, editor.topLevelBlocks]);
  }

  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "light" || theme === "dark") {
      setCurrentTheme(theme);
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, [theme]);

  return (
    <>
      <ProtectedSiteHeader />
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="flex flex-col space-y-4">
          <p className="text-center text-xl">Create an Announcement</p>
          <BlockNoteView
            editor={editor}
            className="w-[40rem]"
            theme={currentTheme}
          />
          <Button onClick={saveBlocks} className="ml-auto w-[6rem]">
            Submit
          </Button>
          {arr.map((item, i) => (
            <Announcement key={"ann-" + i} data={item} theme={currentTheme} />
          ))}
        </div>
      </div>
    </>
  );
}

import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Highlighter,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Toggle } from "@/app/_components/ui/toggle";

type CustomToolbarProps = {
  editor: Editor | null;
};
export default function CustomToolbar({ editor }: CustomToolbarProps) {
  if (!editor) return;
  return (
    <div className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      <Toggle
        className="h-10 w-10"
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold />
      </Toggle>
      <Toggle
        className="h-10 w-10"
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic />
      </Toggle>
      <Toggle
        className="h-10 w-10"
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <Underline />
      </Toggle>
      <Toggle
        className="h-10 w-10"
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough />
      </Toggle>
      <Toggle
        className="h-10 w-10"
        size="sm"
        pressed={editor.isActive("highlight")}
        onPressedChange={() => {
          editor.chain().focus().toggleHighlight().run();
        }}
      >
        <Highlighter />
      </Toggle>
      <Toggle
        className="h-10 w-10"
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => {
          editor.chain().focus().toggleCode().run();
        }}
      >
        <Code />
      </Toggle>
    </div>
  );
}

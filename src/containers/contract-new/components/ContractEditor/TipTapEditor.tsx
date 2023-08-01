import React from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  Heading1,
  Heading2,
  ItalicIcon,
  List,
  StrikethroughIcon,
  Code2Icon,
} from "lucide-react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight/lib/core";
import { cn } from "@/lib/utils";

export const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2],
      }),
      BulletList,
      ListItem,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "js",
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "w-full rounded-none text-base focus-visible:outline-none prose",
      },
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex gap-2 rounded-lg bg-gray-900 px-1 py-2">
            <button
              aria-label="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn("rounded-md p-3", {
                "text-dark bg-gray-100": editor.isActive("bold"),
                "text-white": !editor.isActive("bold"),
              })}
            >
              <BoldIcon className="h-4 w-4 text-lg" />
            </button>

            <button
              aria-label="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn("rounded-md p-3", {
                "text-dark bg-gray-100": editor.isActive("italic"),
                "text-white": !editor.isActive("italic"),
              })}
            >
              <ItalicIcon className="h-4 w-4 text-lg" />
            </button>

            <button
              aria-label="Strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn("rounded-md p-3", {
                "text-dark bg-gray-100": editor.isActive("strike"),
                "text-white": !editor.isActive("strike"),
              })}
            >
              <StrikethroughIcon className="h-4 w-4 text-lg" />
            </button>

            <button
              aria-label="H1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn("rounded-md p-3", {
                "text-dark bg-gray-100": editor?.isActive("heading", {
                  level: 1,
                }),
                "text-white": !editor?.isActive("heading", { level: 1 }),
              })}
            >
              <Heading1 className="h-4 w-4 text-lg" />
            </button>

            <button
              aria-label="H2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn("rounded-md p-3", {
                "text-dark bg-gray-100": editor?.isActive("heading", {
                  level: 2,
                }),
                "text-white": !editor?.isActive("heading", { level: 2 }),
              })}
            >
              <Heading2 className="h-4 w-4 text-lg" />
            </button>

            <button
              aria-label="BulletList"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn("rounded-md p-3", {
                "text-dark bg-gray-100": editor.isActive("bulletList"),
                "text-white": !editor.isActive("bulletList"),
              })}
            >
              <List className="h-4 w-4 text-lg" />
            </button>

            <button
              aria-label="codeBlock"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={cn("rounded-md p-3", {
                "text-dark bg-gray-100": editor.isActive("codeBlock"),
                "text-white": !editor.isActive("codeBlock"),
              })}
            >
              <Code2Icon className="h-4 w-4 text-lg" />
            </button>

            {/* 
            <Button
              size="icon"
              aria-label="CodeBlock"
              icon={<RiCodeSSlashLine />}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              bg={editor.isActive("codeBlock") ? "gray.100" : ""}
              variant="ghost"
              size="sm"
              colorScheme={"gray"}
              color={!editor.isActive("codeBlock") ? "white" : "gray.900"}
              _hover={{
                color: "gray.900",
                bg: "gray.100",
              }}
            /> */}
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </>
  );
};

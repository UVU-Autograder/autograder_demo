"use client";

import { useRef } from "react";
import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  placeholder?: string;
  readOnly?: boolean;
  minimap?: boolean;
  theme?: "vs-dark" | "light";
}

export function CodeEditor({
  value,
  onChange,
  language = "python",
  height = "400px",
  placeholder = "# Write your code here...",
  readOnly = false,
  minimap = true,
  theme = "light",
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function handleEditorChange(value: string | undefined) {
    onChange(value || "");
  }

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200 shadow-md">
      <Editor
        height={height}
        language={language}
        value={value || placeholder}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          readOnly,
          minimap: { enabled: minimap },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: "full",
          bracketPairColorization: {
            enabled: true,
          },
          padding: {
            top: 16,
            bottom: 16,
          },
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
          suggest: {
            showKeywords: true,
            showSnippets: true,
          },
        }}
      />
    </div>
  );
}

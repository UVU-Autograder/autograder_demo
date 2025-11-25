import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { CodeEditor } from "@/components/code-editor";
import { Upload, FileCode, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorPanelProps {
  code: string;
  fileName: string;
  language: string;
  onCodeChange: (code: string) => void;
  onFileDrop: (files: File[]) => void;
  onRemoveFile: () => void;
}

export function CodeEditorPanel({
  code,
  fileName,
  language,
  onCodeChange,
  onFileDrop,
  onRemoveFile,
}: CodeEditorPanelProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileDrop,
    accept: {
      "text/*": [".py", ".java", ".cpp", ".js", ".ts"],
    },
    multiple: false,
  });

  return (
    <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Code Editor</span>
          {fileName && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal text-slate-600 flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                {fileName}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveFile}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* File Upload Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50/50"
              : "border-slate-300 hover:border-blue-400 hover:bg-slate-50/50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload
            className={`h-8 w-8 mx-auto mb-2 ${
              isDragActive ? "text-blue-500" : "text-slate-400"
            }`}
          />
          <p className="text-slate-600 font-medium text-sm mb-1">
            {isDragActive ? "Drop the file here" : "Drag & drop a code file"}
          </p>
          <p className="text-xs text-slate-500">
            or click to browse (.py, .java, .cpp, .js, .ts)
          </p>
        </div>

        {/* Code Editor - Always Visible */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <CodeEditor
            value={code}
            onChange={onCodeChange}
            language={language}
            height="500px"
            placeholder={`# Paste your ${language} code here or upload a file above...\n\ndef solution():\n    pass`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

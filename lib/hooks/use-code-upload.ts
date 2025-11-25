import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseCodeUploadProps {
  onCodeChange: (code: string) => void;
  onFileNameChange: (fileName: string) => void;
}

export function useCodeUpload({ onCodeChange, onFileNameChange }: UseCodeUploadProps) {
  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const validExtensions = [".py", ".java", ".cpp", ".js", ".ts"];
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));

    if (!validExtensions.includes(fileExtension)) {
      toast.error("Invalid file type. Please upload a code file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onCodeChange(content);
      onFileNameChange(file.name);
      toast.success(`File "${file.name}" uploaded successfully!`);
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
    };
    reader.readAsText(file);
  }, [onCodeChange, onFileNameChange]);

  const handleRemoveFile = useCallback(() => {
    onCodeChange("");
    onFileNameChange("");
    toast.info("File removed");
  }, [onCodeChange, onFileNameChange]);

  return {
    handleFileDrop,
    handleRemoveFile,
  };
}

import { Submission, BulkUploadResult } from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service for handling submission uploads and parsing
 */
export class SubmissionService {
  /**
   * Parse student ID from filename
   * Supports patterns: studentid_assignment.py, studentid.py, 12345_hw1.py
   */
  parseStudentIdFromFilename(filename: string): string | null {
    // Remove extension
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    // Try pattern: studentid_something
    const underscoreMatch = nameWithoutExt.match(/^(\d+)_/);
    if (underscoreMatch) {
      return underscoreMatch[1];
    }
    
    // Try pattern: just numbers
    const numberMatch = nameWithoutExt.match(/^(\d+)$/);
    if (numberMatch) {
      return numberMatch[1];
    }
    
    // Try pattern: something_studentid
    const reverseMatch = nameWithoutExt.match(/_(\d+)$/);
    if (reverseMatch) {
      return reverseMatch[1];
    }
    
    return null;
  }

  /**
   * Create submission object from file data
   */
  createSubmission(
    assignmentId: string,
    studentId: string,
    code: string,
    filename: string,
    language: string
  ): Submission {
    return {
      id: uuidv4(),
      assignmentId,
      studentId,
      code,
      language,
      submittedAt: new Date(),
      status: 'pending',
      maxScore: 100,
      filename,
      fileSize: new Blob([code]).size,
      attemptNumber: 1,
      isLate: false,
    };
  }

  /**
   * Parse ZIP file containing multiple submissions
   * Expected structure: studentid_assignment.ext or folder/studentid.ext
   */
  async parseZipFile(
    zipFile: File,
    assignmentId: string,
    language: string
  ): Promise<BulkUploadResult> {
    const result: BulkUploadResult = {
      total: 0,
      successful: 0,
      failed: 0,
      submissions: [],
      errors: [],
    };

    try {
      // Dynamic import of JSZip
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      const contents = await zip.loadAsync(zipFile);

      // Get valid code files
      const fileExtensions: Record<string, string> = {
        python: '.py',
        javascript: '.js',
        typescript: '.ts',
        java: '.java',
        cpp: '.cpp',
        c: '.c',
      };

      const validExtension = fileExtensions[language.toLowerCase()] || '.py';

      for (const [filename, file] of Object.entries(contents.files)) {
        // Skip directories and hidden files
        if (file.dir || filename.startsWith('.') || filename.includes('__MACOSX')) {
          continue;
        }

        // Check file extension
        if (!filename.toLowerCase().endsWith(validExtension)) {
          continue;
        }

        result.total++;

        try {
          // Extract just the filename from path
          const basename = filename.split('/').pop() || filename;
          
          // Parse student ID
          const studentId = this.parseStudentIdFromFilename(basename);
          
          if (!studentId) {
            result.failed++;
            result.errors.push({
              filename: basename,
              error: `Could not parse student ID from filename. Expected format: studentid_assignment${validExtension}`,
            });
            continue;
          }

          // Read file content
          const code = await file.async('text');

          if (!code.trim()) {
            result.failed++;
            result.errors.push({
              filename: basename,
              error: 'File is empty',
            });
            continue;
          }

          // Create submission
          const submission = this.createSubmission(
            assignmentId,
            studentId,
            code,
            basename,
            language
          );

          result.submissions.push(submission);
          result.successful++;
        } catch (error) {
          result.failed++;
          result.errors.push({
            filename,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      if (result.total === 0) {
        result.errors.push({
          filename: zipFile.name,
          error: `No ${validExtension} files found in ZIP`,
        });
      }
    } catch (error) {
      result.errors.push({
        filename: zipFile.name,
        error: `Failed to parse ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }

    return result;
  }

  /**
   * Parse CSV file with student_id and code columns
   */
  async parseCsvFile(
    csvContent: string,
    assignmentId: string,
    language: string
  ): Promise<BulkUploadResult> {
    const result: BulkUploadResult = {
      total: 0,
      successful: 0,
      failed: 0,
      submissions: [],
      errors: [],
    };

    try {
      const lines = csvContent.trim().split('\n');
      
      if (lines.length < 2) {
        result.errors.push({
          filename: 'CSV',
          error: 'CSV file must have at least a header row and one data row',
        });
        return result;
      }

      // Parse header
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      const studentIdIndex = header.findIndex(h => h === 'student_id' || h === 'studentid');
      const codeIndex = header.findIndex(h => h === 'code' || h === 'solution');

      if (studentIdIndex === -1 || codeIndex === -1) {
        result.errors.push({
          filename: 'CSV',
          error: 'CSV must have "student_id" and "code" columns',
        });
        return result;
      }

      // Parse data rows
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        result.total++;

        try {
          const columns = line.split(',');
          const studentId = columns[studentIdIndex]?.trim();
          const code = columns[codeIndex]?.trim();

          if (!studentId || !code) {
            result.failed++;
            result.errors.push({
              filename: `Row ${i + 1}`,
              error: 'Missing student_id or code',
            });
            continue;
          }

          const submission = this.createSubmission(
            assignmentId,
            studentId,
            code,
            `${studentId}_submission.${language}`,
            language
          );

          result.submissions.push(submission);
          result.successful++;
        } catch (error) {
          result.failed++;
          result.errors.push({
            filename: `Row ${i + 1}`,
            error: error instanceof Error ? error.message : 'Parse error',
          });
        }
      }
    } catch (error) {
      result.errors.push({
        filename: 'CSV',
        error: `Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }

    return result;
  }
}

export const submissionService = new SubmissionService();

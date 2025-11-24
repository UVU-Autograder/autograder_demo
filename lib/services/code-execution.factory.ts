import { ICodeExecutionService } from './code-execution.interface';
import { Judge0Service } from './judge0.service';

/**
 * Factory for creating code execution service instances
 * Add new providers here when needed (Piston, JDoodle, etc.)
 */

type ExecutionProvider = 'judge0' | 'piston' | 'jdoodle';

const EXECUTION_PROVIDER = (process.env.CODE_EXECUTION_PROVIDER || 'judge0') as ExecutionProvider;

/**
 * Creates the appropriate code execution service based on configuration
 * To switch providers: Set CODE_EXECUTION_PROVIDER in .env.local
 */
export function createCodeExecutionService(): ICodeExecutionService {
  switch (EXECUTION_PROVIDER) {
    case 'judge0':
      return new Judge0Service();
    
    // Future providers can be added here:
    // case 'piston':
    //   return new PistonService();
    // case 'jdoodle':
    //   return new JDoodleService();
    
    default:
      console.warn(`Unknown provider: ${EXECUTION_PROVIDER}, falling back to Judge0`);
      return new Judge0Service();
  }
}

/**
 * Singleton instance - use this throughout the app
 */
export const codeExecutionService = createCodeExecutionService();

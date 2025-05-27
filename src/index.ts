// Core proof-of-work functionality
export {
  generateChallenge,
  solveChallenge,
  verifySolution,
  isValidHash,
  estimateSolveTime,
  getDifficultyDescription,
  type Challenge,
  type Solution,
  type ProofOfWorkResult
} from './lib/proof-of-work';

// React components
export { default as ProofOfWorkChallenge } from './components/proof-of-work-challenge';

// Import types and functions for use in interfaces
import type { Challenge, Solution } from './lib/proof-of-work';
import { verifySolution } from './lib/proof-of-work';

// Type definitions for component props
export interface ProofOfWorkChallengeProps {
  difficulty?: number;
  onSuccess?: (challenge: Challenge, solution: Solution) => void;
  onError?: (error: string) => void;
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  showProgress?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

// Utility functions for integration
export const createVerificationEndpoint = () => {
  return {
    async POST(request: Request) {
      try {
        const body = await request.json();
        const { challenge, solution } = body;

        if (!challenge || !solution) {
          return new Response(
            JSON.stringify({ error: 'Missing challenge or solution' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // Check if challenge is not too old (5 minutes)
        const maxAge = 5 * 60 * 1000;
        const challengeAge = Date.now() - challenge.timestamp;
        
        if (challengeAge > maxAge) {
          return new Response(
            JSON.stringify({ error: 'Challenge expired' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // Verify the solution
        const isValid = verifySolution(challenge, solution);

        if (isValid) {
          return new Response(
            JSON.stringify({
              success: true,
              message: 'Proof of work verified successfully',
              timestamp: Date.now()
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        } else {
          return new Response(
            JSON.stringify({ error: 'Invalid proof of work solution' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch {
        return new Response(
          JSON.stringify({ error: 'Internal server error' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  };
}; 
import { sha256 } from 'js-sha256';

export interface Challenge {
  data: string;
  difficulty: number;
  timestamp: number;
}

export interface Solution {
  nonce: number;
  hash: string;
  timestamp: number;
}

export interface ProofOfWorkResult {
  challenge: Challenge;
  solution: Solution;
  isValid: boolean;
}

/**
 * Generate a new proof-of-work challenge
 */
export function generateChallenge(difficulty: number = 4): Challenge {
  const timestamp = Date.now();
  const randomData = Math.random().toString(36).substring(2, 15);
  const data = `${timestamp}-${randomData}`;
  
  return {
    data,
    difficulty,
    timestamp
  };
}

/**
 * Check if a hash meets the difficulty requirement
 */
export function isValidHash(hash: string, difficulty: number): boolean {
  const target = '0'.repeat(difficulty);
  return hash.startsWith(target);
}

/**
 * Solve a proof-of-work challenge
 */
export async function solveChallenge(
  challenge: Challenge,
  onProgress?: (nonce: number, hash: string) => void
): Promise<Solution> {
  return new Promise((resolve) => {
    let nonce = 0;
    
    const solve = () => {
      const batchSize = 1000; // Process in batches to avoid blocking UI
      
      for (let i = 0; i < batchSize; i++) {
        const input = `${challenge.data}-${nonce}`;
        const hash = sha256(input);
        
        if (onProgress && nonce % 100 === 0) {
          onProgress(nonce, hash);
        }
        
        if (isValidHash(hash, challenge.difficulty)) {
          resolve({
            nonce,
            hash,
            timestamp: Date.now()
          });
          return;
        }
        
        nonce++;
      }
      
      // Continue solving in next tick to avoid blocking
      setTimeout(solve, 0);
    };
    
    solve();
  });
}

/**
 * Verify a proof-of-work solution
 */
export function verifySolution(challenge: Challenge, solution: Solution): boolean {
  const input = `${challenge.data}-${solution.nonce}`;
  const hash = sha256(input);
  
  return hash === solution.hash && isValidHash(hash, challenge.difficulty);
}

/**
 * Calculate estimated time to solve based on difficulty
 */
export function estimateSolveTime(difficulty: number): number {
  // Rough estimation: each additional difficulty bit doubles the time
  const baseTime = 100; // milliseconds for difficulty 1
  return baseTime * Math.pow(2, difficulty - 1);
}

/**
 * Get difficulty description for user display
 */
export function getDifficultyDescription(difficulty: number): string {
  if (difficulty <= 2) return 'Very Easy';
  if (difficulty <= 4) return 'Easy';
  if (difficulty <= 6) return 'Medium';
  if (difficulty <= 8) return 'Hard';
  return 'Very Hard';
}

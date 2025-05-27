'use client';

import { useState, useEffect } from 'react';
import { 
  generateChallenge, 
  solveChallenge, 
  verifySolution, 
  estimateSolveTime,
  getDifficultyDescription,
  type Challenge, 
  type Solution 
} from '@/lib/proof-of-work';

interface ProofOfWorkChallengeProps {
  difficulty?: number;
  onSuccess?: (challenge: Challenge, solution: Solution) => void;
  onError?: (error: string) => void;
}

export default function ProofOfWorkChallenge({ 
  difficulty = 4, 
  onSuccess, 
  onError 
}: ProofOfWorkChallengeProps) {
  const [, setChallenge] = useState<Challenge | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ nonce: 0, hash: '' });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Update elapsed time
  useEffect(() => {
    if (!startTime || isComplete) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);
    
    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  const startChallenge = async () => {
    try {
      setIsLoading(true);
      setIsComplete(false);
      setSolution(null);
      setProgress({ nonce: 0, hash: '' });
      
      const newChallenge = generateChallenge(difficulty);
      setChallenge(newChallenge);
      setStartTime(Date.now());
      
      const newSolution = await solveChallenge(newChallenge, (nonce, hash) => {
        setProgress({ nonce, hash });
      });
      
      setSolution(newSolution);
      setIsComplete(true);
      setIsLoading(false);
      
      // Verify the solution
      const isValid = verifySolution(newChallenge, newSolution);
      if (isValid) {
        onSuccess?.(newChallenge, newSolution);
      } else {
        onError?.('Solution verification failed');
      }
    } catch (error) {
      setIsLoading(false);
      onError?.(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatHash = (hash: string) => {
    if (!hash) return '';
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const estimatedTime = estimateSolveTime(difficulty);
  const difficultyDesc = getDifficultyDescription(difficulty);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🔒 Proof of Work Challenge
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete this challenge to verify you&apos;re human
        </p>
      </div>

      <div className="space-y-4">
        {/* Challenge Info */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Difficulty:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {difficulty} ({difficultyDesc})
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Estimated Time:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {formatTime(estimatedTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        {isLoading && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Computing...</span>
              <span className="text-gray-900 dark:text-white">
                {formatTime(elapsedTime)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 animate-pulse"
                style={{ width: '100%' }}
              />
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div>Nonce: {progress.nonce.toLocaleString()}</div>
              <div>Current Hash: {formatHash(progress.hash)}</div>
            </div>
          </div>
        )}

        {/* Success State */}
        {isComplete && solution && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-green-600 dark:text-green-400 text-lg mr-2">✅</span>
              <span className="font-medium text-green-800 dark:text-green-200">
                Challenge Completed!
              </span>
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <div>Solution found in {formatTime(elapsedTime)}</div>
              <div>Nonce: {solution.nonce.toLocaleString()}</div>
              <div>Hash: {formatHash(solution.hash)}</div>
            </div>
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={startChallenge}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {isLoading ? 'Computing...' : isComplete ? 'Start New Challenge' : 'Start Challenge'}
        </button>

        {/* Info */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          This proof-of-work challenge helps protect against automated bots while allowing legitimate users to access the content.
        </div>
      </div>
    </div>
  );
} 
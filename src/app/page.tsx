'use client';

import { useState } from 'react';
import ProofOfWorkChallenge from '../components/proof-of-work-challenge';
import { type Challenge, type Solution } from '../lib/proof-of-work';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState(4);

  const handleSuccess = async (challenge: Challenge, solution: Solution) => {
    try {
      // Send to server for verification
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ challenge, solution }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsVerified(true);
        setVerificationResult('✅ Server verification successful! You have proven you are human.');
      } else {
        setVerificationResult(`❌ Server verification failed: ${result.error}`);
      }
    } catch (error) {
      setVerificationResult(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleError = (error: string) => {
    setVerificationResult(`❌ Challenge failed: ${error}`);
  };

  const resetDemo = () => {
    setIsVerified(false);
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🐺 Mayavi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A lightweight proof-of-work challenge system to protect against AI crawlers and bots.
            Inspired by the original{' '}
            <a 
              href="https://github.com/TecharoHQ/anubis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Anubis project
            </a>.
          </p>
        </div>

        {/* Main Content */}
        {!isVerified ? (
          <div className="space-y-6">
            {/* Difficulty Selector */}
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Challenge Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value={2}>Easy (2 leading zeros)</option>
                <option value={3}>Medium (3 leading zeros)</option>
                <option value={4}>Hard (4 leading zeros)</option>
                <option value={5}>Very Hard (5 leading zeros)</option>
              </select>
            </div>

            {/* Challenge Component */}
            <ProofOfWorkChallenge
              difficulty={difficulty}
              onSuccess={handleSuccess}
              onError={handleError}
            />

            {/* Verification Result */}
            {verificationResult && (
              <div className="max-w-2xl mx-auto p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-center text-gray-900 dark:text-white">
                  {verificationResult}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Protected Content */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                  🎉 Access Granted!
                </h2>
                                 <p className="text-gray-600 dark:text-gray-400">
                   You have successfully completed the proof-of-work challenge and gained access to the protected content.
                 </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3>What is Anubis?</h3>
                <p>
                  Anubis is a proof-of-work challenge system designed to protect websites from AI crawlers and automated bots. 
                  It works by requiring visitors to solve a computational puzzle before accessing content.
                </p>

                <h3>How it works:</h3>
                <ul>
                  <li><strong>Challenge Generation:</strong> The server generates a unique challenge with a specific difficulty level</li>
                  <li><strong>Client-side Solving:</strong> Your browser computes SHA-256 hashes until it finds one that meets the difficulty requirement</li>
                  <li><strong>Server Verification:</strong> The solution is verified on the server to ensure it&apos;s valid</li>
                  <li><strong>Access Granted:</strong> Once verified, you gain access to the protected content</li>
                </ul>

                <h3>Benefits:</h3>
                <ul>
                  <li>Lightweight and efficient</li>
                  <li>Blocks most automated scrapers and bots</li>
                  <li>Minimal impact on legitimate users</li>
                  <li>No external dependencies or services required</li>
                </ul>

                <h3>Technical Details:</h3>
                <p>
                  This implementation uses SHA-256 hashing with configurable difficulty levels. The difficulty determines 
                  how many leading zeros the hash must have, with each additional zero roughly doubling the computation time.
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <code className="text-sm">
                    Target: {Array(difficulty).fill('0').join('')}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  </code>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={resetDemo}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Try Another Challenge
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS. 
            Original Anubis by{' '}
            <a 
              href="https://github.com/TecharoHQ/anubis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              TecharoHQ
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

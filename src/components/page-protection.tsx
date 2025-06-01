'use client';

import { ReactNode } from 'react';
import ProofOfWorkChallenge from './proof-of-work-challenge';
import { useMayaviProtection } from '../lib/use-mayavi-protection';
import type { Challenge, Solution } from '../lib/proof-of-work';

interface PageProtectionProps {
  children: ReactNode;
  difficulty?: number;
  sessionKey?: string;
  title?: string;
  description?: string;
  className?: string;
  onSuccess?: (challenge: Challenge, solution: Solution) => void;
  onError?: (error: string) => void;
  onVerified?: () => void;
  loadingComponent?: ReactNode;
  protectionMode?: 'overlay' | 'replace';
}

export default function PageProtection({
  children,
  difficulty = 4,
  sessionKey = 'mayavi_verified',
  title = '🔒 Verification Required',
  description = 'Please complete this challenge to access the content',
  className = '',
  onSuccess,
  onError,
  onVerified,
  loadingComponent,
  protectionMode = 'overlay'
}: PageProtectionProps) {
  const { isVerified, showChallenge, error } = useMayaviProtection({
    difficulty,
    sessionKey,
    onSuccess,
    onError,
    onVerified
  });

  // Show challenge if not verified and should show
  if (showChallenge && !isVerified) {
    if (protectionMode === 'replace') {
      // Replace the entire page content with challenge
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md">
            <ProofOfWorkChallenge
              difficulty={difficulty}
              sessionKey={sessionKey}
              title={title}
              description={description}
              onSuccess={onSuccess}
              onError={onError}
              onVerified={onVerified}
              className="relative bg-transparent"
            />
          </div>
        </div>
      );
    } else {
      // Overlay mode (default)
      return (
        <>
          {children}
          <ProofOfWorkChallenge
            difficulty={difficulty}
            sessionKey={sessionKey}
            title={title}
            description={description}
            onSuccess={onSuccess}
            onError={onError}
            onVerified={onVerified}
            className={className}
          />
        </>
      );
    }
  }

  // Show loading component if provided
  if (!isVerified && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verification Failed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // User is verified, show the protected content
  return <>{children}</>;
} 
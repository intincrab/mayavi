import { useState, useEffect } from 'react';
import type { Challenge, Solution } from './proof-of-work';

interface UseMayaviProtectionOptions {
  difficulty?: number;
  sessionKey?: string;
  autoStart?: boolean;
  onSuccess?: (challenge: Challenge, solution: Solution) => void;
  onError?: (error: string) => void;
  onVerified?: () => void;
}

interface MayaviProtectionState {
  isVerified: boolean;
  isLoading: boolean;
  showChallenge: boolean;
  error: string | null;
  reset: () => void;
}

export function useMayaviProtection(options: UseMayaviProtectionOptions = {}): MayaviProtectionState {
  const {
    sessionKey = 'mayavi_verified',
    onSuccess,
    onError,
    onVerified
  } = options;

  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verified = sessionStorage.getItem(sessionKey) === 'true';
      if (verified) {
        setIsVerified(true);
        setShowChallenge(false);
        onVerified?.();
      } else {
        setShowChallenge(true);
      }
    }
  }, [sessionKey, onVerified]);

  const handleSuccess = (challenge: Challenge, solution: Solution) => {
    setIsVerified(true);
    setIsLoading(false);
    setError(null);
    onSuccess?.(challenge, solution);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    onError?.(errorMessage);
  };

  const handleVerified = () => {
    setShowChallenge(false);
    onVerified?.();
  };

  const reset = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(sessionKey);
    }
    setIsVerified(false);
    setShowChallenge(true);
    setError(null);
    setIsLoading(false);
  };

  return {
    isVerified,
    isLoading,
    showChallenge,
    error,
    reset
  };
} 
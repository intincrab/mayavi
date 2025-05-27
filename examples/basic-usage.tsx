import React, { useState } from 'react';
import { ProofOfWorkChallenge } from 'mayavi';

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleSuccess = async (challenge: any, solution: any) => {
    try {
      // Send to your server for verification
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
        setVerificationResult('✅ Verification successful! You are human.');
      } else {
        setVerificationResult(`❌ Verification failed: ${result.error}`);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {!isVerified ? (
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Protected Content
              </h1>
              <p className="text-gray-600">
                Complete the challenge below to access the content
              </p>
            </div>

            <ProofOfWorkChallenge
              difficulty={4}
              onSuccess={handleSuccess}
              onError={handleError}
            />

            {verificationResult && (
              <div className="p-4 rounded-lg bg-gray-100 border">
                <p className="text-center text-gray-900">
                  {verificationResult}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-6 bg-white rounded-lg shadow-lg border">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                🎉 Access Granted!
              </h2>
              <p className="text-gray-600 mb-4">
                You have successfully completed the proof-of-work challenge.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Protected Content:</h3>
                <p className="text-gray-700">
                  This is the content that was protected by the Mayavi proof-of-work challenge.
                  Only verified users can see this!
                </p>
              </div>
            </div>
            
            <button
              onClick={resetDemo}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 
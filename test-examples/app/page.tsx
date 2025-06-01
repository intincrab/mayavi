'use client';

import { useState } from 'react';
import { PageProtection, useMayaviProtection } from 'mayavi';
import type { Challenge, Solution } from 'mayavi';
import Link from 'next/link';

export default function TestPage() {
  const [result, setResult] = useState<string | null>(null);

  const handleSuccess = async (challenge: Challenge, solution: Solution) => {
    setResult(`✅ Auto-challenge completed! Nonce: ${solution.nonce}, Hash: ${solution.hash.substring(0, 16)}...`);
    
    // In a real app, you would send this to your server for verification
    console.log('Challenge:', challenge);
    console.log('Solution:', solution);
  };

  const handleError = (error: string) => {
    setResult(`❌ Error: ${error}`);
  };

  const handleVerified = () => {
    console.log('User has been verified and can now access the content!');
  };

  return (
    <PageProtection
      difficulty={3}
      sessionKey="test_page_auto"
      title="🧪 Auto-Starting Test Challenge"
      description="This challenge started automatically when you opened the page!"
      onSuccess={handleSuccess}
      onError={handleError}
      onVerified={handleVerified}
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🎉 Mayavi Auto-Protection Examples
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              You successfully completed the automatic verification! Explore different protected layouts below.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
              <div className="text-green-600 text-3xl mb-2">🔒</div>
              <p className="text-green-800 font-semibold">Challenge completed automatically in background</p>
              <p className="text-green-600 text-sm">No user interaction required!</p>
            </div>
          </div>

          {/* Example Pages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Blog Example */}
            <Link href="/blog" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                  <div className="text-4xl mb-3">📖</div>
                  <h3 className="text-xl font-bold mb-2">Blog Page</h3>
                  <p className="text-blue-100">Content protection with easy difficulty</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Difficulty: 2</span>
                    <span className="text-gray-500 text-sm">~25ms solve time</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    A realistic blog layout with articles, navigation, and footer. Perfect for content sites that need light protection.
                  </p>
                  <div className="text-blue-600 group-hover:text-blue-800 font-medium text-sm">
                    View Blog Example →
                  </div>
                </div>
              </div>
            </Link>

            {/* Dashboard Example */}
            <Link href="/dashboard" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-white">
                  <div className="text-4xl mb-3">🎛️</div>
                  <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
                  <p className="text-gray-300">High-security admin interface</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">Difficulty: 4</span>
                    <span className="text-gray-500 text-sm">~200ms solve time</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Complete admin dashboard with stats, charts, and activity feeds. Demonstrates higher security for sensitive areas.
                  </p>
                  <div className="text-blue-600 group-hover:text-blue-800 font-medium text-sm">
                    View Dashboard Example →
                  </div>
                </div>
              </div>
            </Link>

            {/* Shop Example */}
            <Link href="/shop" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
                  <div className="text-4xl mb-3">🛒</div>
                  <h3 className="text-xl font-bold mb-2">E-commerce Shop</h3>
                  <p className="text-purple-100">Product catalog protection</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">Difficulty: 3</span>
                    <span className="text-gray-500 text-sm">~50ms solve time</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Full e-commerce layout with product grids, categories, and shopping cart. Ideal for protecting against price scrapers.
                  </p>
                  <div className="text-blue-600 group-hover:text-blue-800 font-medium text-sm">
                    View Shop Example →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Current Page Results */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Test Results */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-green-600">✅ Current Page Results</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>Auto-protection activated on page load</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>Challenge solved automatically</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>Protected content now accessible</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-3">✅</span>
                  <span>Session stored (won't repeat on refresh)</span>
                </div>
              </div>
              
              {result && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <p className="font-mono text-sm text-gray-800">{result}</p>
                </div>
              )}
            </div>

            {/* Implementation Guide */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-blue-600">🚀 How It Works</h2>
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <strong className="text-blue-800">Step 1:</strong> Wrap your page content with <code className="bg-white px-2 py-1 rounded">PageProtection</code>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <strong className="text-green-800">Step 2:</strong> Challenge starts automatically when page loads
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <strong className="text-purple-800">Step 3:</strong> User sees loading overlay while solving
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <strong className="text-orange-800">Step 4:</strong> Content appears after verification (2-5 seconds)
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <strong className="text-pink-800">Step 5:</strong> Session stored - no repeat challenges
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">📝 Code Examples</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-gray-800">Basic Usage</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { PageProtection } from 'mayavi';

export default function MyPage() {
  return (
    <PageProtection difficulty={3}>
      <div>Your protected content!</div>
    </PageProtection>
  );
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-gray-800">Advanced Configuration</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<PageProtection
  difficulty={4}
  sessionKey="admin_access"
  title="🔒 Admin Access"
  onVerified={() => {
    console.log('Verified!');
  }}
>
  <AdminContent />
</PageProtection>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Difficulty Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">⚙️ Protection Levels</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🟢</div>
                <h4 className="font-semibold text-green-600">Easy (2)</h4>
                <p className="text-sm text-gray-600">~25ms</p>
                <p className="text-xs text-gray-500">Blog posts, public content</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🟡</div>
                <h4 className="font-semibold text-yellow-600">Medium (3)</h4>
                <p className="text-sm text-gray-600">~50ms</p>
                <p className="text-xs text-gray-500">E-commerce, product pages</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🟠</div>
                <h4 className="font-semibold text-orange-600">Hard (4)</h4>
                <p className="text-sm text-gray-600">~200ms</p>
                <p className="text-xs text-gray-500">Admin panels, sensitive data</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔴</div>
                <h4 className="font-semibold text-red-600">Extreme (5+)</h4>
                <p className="text-sm text-gray-600">~800ms+</p>
                <p className="text-xs text-gray-500">High-security systems</p>
              </div>
            </div>
          </div>

          {/* Test Controls */}
          <div className="text-center">
            <TestControls />
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              🔄 Refresh this page - you won't see the challenge again because you're verified!<br/>
              🆕 Try opening in a new tab - same session, no challenge needed<br/>
              🧪 Use the reset button to test the challenge again<br/>
              🎯 Visit the example pages above to see different protection scenarios
            </p>
          </div>
        </div>
      </div>
    </PageProtection>
  );
}

// Test controls component
function TestControls() {
  const { reset, isVerified } = useMayaviProtection({ 
    sessionKey: 'test_page_auto' 
  });
  
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 inline-block">
      <h3 className="font-semibold text-yellow-800 mb-3">🧪 Testing Controls</h3>
      <p className="text-sm text-yellow-700 mb-4">
        Current Status: {isVerified ? '✅ Verified' : '⏳ Not Verified'}
      </p>
      <button
        onClick={reset}
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors mr-4"
      >
        Reset All Verifications
      </button>
      <p className="text-xs text-yellow-600 mt-3">
        Click reset, then refresh to see the auto-challenge again
      </p>
    </div>
  );
} 
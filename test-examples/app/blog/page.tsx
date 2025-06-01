'use client';

import { PageProtection } from 'mayavi';

export default function BlogPage() {
  return (
    <PageProtection
      difficulty={2}
      sessionKey="blog_access"
      title="📖 Blog Access Verification"
      description="Quick verification to access our blog content"
      onVerified={() => {
        console.log('User verified for blog access');
      }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tech Blog</h1>
                <p className="text-gray-600">Latest insights and tutorials</p>
              </div>
              <nav className="flex space-x-6">
                <a href="#" className="text-blue-600 hover:text-blue-800">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-800">Articles</a>
                <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
                <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Featured Article */}
          <article className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop" 
              alt="Featured article"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Featured</span>
                <span className="text-gray-500 text-sm ml-4">March 15, 2024</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Building Scalable Web Applications with Modern Technologies
              </h2>
              <p className="text-gray-600 mb-4">
                Discover the latest techniques for building robust, scalable web applications using cutting-edge 
                frameworks and best practices. Learn about performance optimization, security considerations, 
                and deployment strategies.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                    alt="Author"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                    <p className="text-xs text-gray-500">Senior Developer</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </article>

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Article 1 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop" 
                alt="React article"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">React</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">
                  React 19 New Features
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Explore the exciting new features coming in React 19 and how they'll improve your development workflow.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">5 min read</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read →
                  </button>
                </div>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop" 
                alt="TypeScript article"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">TypeScript</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">
                  Advanced TypeScript Patterns
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Master advanced TypeScript patterns to write more maintainable and type-safe code.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 min read</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read →
                  </button>
                </div>
              </div>
            </article>

            {/* Article 3 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop" 
                alt="Performance article"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Performance</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">
                  Web Performance Optimization
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Learn proven techniques to optimize your web application's performance and user experience.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">12 min read</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read →
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Success Message */}
          <div className="mt-12 text-center bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-green-600 text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Welcome to Our Protected Blog!
            </h3>
            <p className="text-green-700">
              You've successfully completed the verification challenge and can now access all our premium content.
              The challenge was automatically solved in the background - no clicks required!
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Tech Blog</h4>
                <p className="text-gray-300">
                  Your source for the latest insights in web development, programming, and technology trends.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">React & Next.js</a></li>
                  <li><a href="#" className="hover:text-white">TypeScript</a></li>
                  <li><a href="#" className="hover:text-white">Web Performance</a></li>
                  <li><a href="#" className="hover:text-white">DevOps</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">GitHub</a></li>
                  <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white">Newsletter</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Tech Blog. Protected by Mayavi auto-verification system.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageProtection>
  );
} 
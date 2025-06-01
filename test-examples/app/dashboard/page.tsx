'use client';

import { PageProtection, useMayaviProtection } from 'mayavi';

export default function DashboardPage() {
  return (
    <PageProtection
      difficulty={4}
      sessionKey="dashboard_access"
      title="🎛️ Admin Dashboard Access"
      description="Secure verification required for dashboard access"
      onVerified={() => {
        console.log('Admin verified for dashboard access');
      }}
    >
      <div className="min-h-screen bg-gray-100">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
                <div className="hidden md:block ml-10">
                  <div className="flex space-x-8">
                    <a href="#" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                      Overview
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                      Analytics
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                      Users
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                      Settings
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, Admin</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                    alt="Admin avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-sm min-h-screen">
            <div className="p-4">
              <nav className="space-y-2">
                <a href="#" className="bg-blue-50 text-blue-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  📊 Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  👥 Users
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  📈 Analytics
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  💰 Revenue
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  ⚙️ Settings
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  🔒 Security
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    👥
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">12,543</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm">↗️ +12% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    💰
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">$48,257</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm">↗️ +23% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    📦
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">1,247</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-red-600 text-sm">↘️ -3% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    📈
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Conversion</p>
                    <p className="text-2xl font-semibold text-gray-900">3.2%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm">↗️ +0.8% from last month</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">📊</div>
                    <p>Revenue chart would be here</p>
                    <p className="text-sm">Interactive chart with monthly data</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">👥</div>
                    <p>User activity chart would be here</p>
                    <p className="text-sm">Real-time user engagement data</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New user registration</p>
                      <p className="text-xs text-gray-500">john@example.com - 2 minutes ago</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">New</span>
                </div>

                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment received</p>
                      <p className="text-xs text-gray-500">$299.00 from Premium Plan - 5 minutes ago</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Payment</span>
                </div>

                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Server maintenance scheduled</p>
                      <p className="text-xs text-gray-500">Planned downtime: 2:00 AM - 4:00 AM UTC</p>
                    </div>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">System</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className="text-green-600 text-2xl mr-3">🔒</div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Secure Dashboard Access</h3>
                  <p className="text-green-700">
                    This dashboard is protected by Mayavi's auto-verification system (Difficulty: 4). 
                    You were automatically verified when accessing this page - no manual interaction required!
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <TestControls sessionKey="dashboard_access" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageProtection>
  );
}

function TestControls({ sessionKey }: { sessionKey: string }) {
  const { reset, isVerified } = useMayaviProtection({ sessionKey });
  
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-green-700">
        Status: {isVerified ? '✅ Verified' : '⏳ Pending'}
      </span>
      <button
        onClick={reset}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
      >
        Reset (Test)
      </button>
    </div>
  );
} 
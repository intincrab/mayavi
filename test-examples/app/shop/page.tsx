'use client';

import { PageProtection } from 'mayavi';

export default function ShopPage() {
  return (
    <PageProtection
      difficulty={3}
      sessionKey="shop_access"
      title="🛒 Shop Access Verification"
      description="Verifying access to our product catalog"
      onVerified={() => {
        console.log('Customer verified for shop access');
      }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">TechShop Pro</h1>
                <nav className="hidden md:ml-10 md:flex space-x-8">
                  <a href="#" className="text-blue-600 font-medium">Shop</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Categories</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Deals</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Support</a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  🔍 Search
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  🛒 Cart (3)
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Premium Tech Products</h2>
            <p className="text-xl mb-8">Discover the latest gadgets and electronics at unbeatable prices</p>
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">💻</div>
                <h4 className="font-semibold text-gray-900">Laptops</h4>
                <p className="text-gray-600 text-sm">245 products</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="font-semibold text-gray-900">Smartphones</h4>
                <p className="text-gray-600 text-sm">189 products</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🎧</div>
                <h4 className="font-semibold text-gray-900">Audio</h4>
                <p className="text-gray-600 text-sm">156 products</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">⌚</div>
                <h4 className="font-semibold text-gray-900">Wearables</h4>
                <p className="text-gray-600 text-sm">89 products</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Featured Products</h3>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">View All →</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" 
                    alt="Laptop"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">MacBook Pro 16"</h4>
                  <p className="text-gray-600 text-sm mb-3">M3 Pro chip, 18GB RAM, 512GB SSD</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">$2,299</span>
                      <span className="text-sm text-gray-500 line-through ml-2">$2,499</span>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop" 
                    alt="iPhone"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">iPhone 15 Pro</h4>
                  <p className="text-gray-600 text-sm mb-3">256GB, Titanium Blue</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">$1,199</span>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" 
                    alt="Headphones"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Sony WH-1000XM5</h4>
                  <p className="text-gray-600 text-sm mb-3">Noise Cancelling Headphones</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">$399</span>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop" 
                    alt="Apple Watch"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Popular</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Apple Watch Ultra 2</h4>
                  <p className="text-gray-600 text-sm mb-3">GPS + Cellular, 49mm</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">$799</span>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Protection Notice */}
        <section className="bg-blue-50 border-t py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-blue-600 text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Shop Protected by Mayavi</h3>
            <p className="text-blue-800 max-w-2xl mx-auto">
              This e-commerce site is automatically protected against bots and scrapers using Mayavi's 
              proof-of-work challenge system. You were verified when you accessed the page - 
              no interruption to your shopping experience!
            </p>
            <div className="mt-6 flex justify-center space-x-4 text-sm text-blue-700">
              <span>✅ Anti-scraping protection</span>
              <span>✅ Bot prevention</span>
              <span>✅ Zero user friction</span>
              <span>✅ Automatic verification</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">TechShop Pro</h4>
                <p className="text-gray-300">Your trusted source for premium technology products.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Laptops</a></li>
                  <li><a href="#" className="hover:text-white">Smartphones</a></li>
                  <li><a href="#" className="hover:text-white">Audio</a></li>
                  <li><a href="#" className="hover:text-white">Accessories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-white">Returns</a></li>
                  <li><a href="#" className="hover:text-white">Warranty</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Newsletter</a></li>
                  <li><a href="#" className="hover:text-white">Social Media</a></li>
                  <li><a href="#" className="hover:text-white">Reviews</a></li>
                  <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 TechShop Pro. Protected by Mayavi verification system.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageProtection>
  );
} 
# 🎯 Mayavi Auto-Protection Examples

This directory contains comprehensive examples demonstrating the **Mayavi NPM package** with **auto-starting page protection**.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Visit:** http://localhost:3001

## 📋 Available Examples

### 🏠 **Main Page** (`/`)
- **Protection:** Medium (Difficulty 3, ~50ms)
- **Features:** Overview of all examples with navigation
- **Use Case:** Landing page with moderate protection

### 📖 **Blog Page** (`/blog`)
- **Protection:** Easy (Difficulty 2, ~25ms)
- **Features:** Complete blog layout with articles, navigation
- **Use Case:** Content sites needing light bot protection

### 🎛️ **Admin Dashboard** (`/dashboard`)
- **Protection:** Hard (Difficulty 4, ~200ms)
- **Features:** Full admin interface with stats, charts, activity feeds
- **Use Case:** High-security admin panels and sensitive data

### 🛒 **E-commerce Shop** (`/shop`)
- **Protection:** Medium (Difficulty 3, ~50ms)
- **Features:** Product catalog, categories, shopping cart
- **Use Case:** Retail sites protecting against price scrapers

## ✨ Key Features Demonstrated

### 🔄 **Auto-Starting Protection**
- ✅ Challenges start automatically when page loads
- ✅ No user interaction required (no buttons to click)
- ✅ Beautiful overlay with real-time progress
- ✅ Session management - won't repeat on refresh

### 🛡️ **Different Protection Levels**
- 🟢 **Easy (2):** ~25ms - Blog posts, public content
- 🟡 **Medium (3):** ~50ms - E-commerce, standard pages
- 🟠 **Hard (4):** ~200ms - Admin panels, sensitive data
- 🔴 **Extreme (5+):** ~800ms+ - High-security systems

### 🔧 **Session Management**
- Each page uses different `sessionKey` for separate verification scopes
- Verified users can access content immediately on subsequent visits
- Works across browser tabs and page refreshes

## 🧪 Testing Features

### Core Functionality Test
```bash
npm run test-core
```
**Expected Output:**
```
🧪 Testing Mayavi Core Functionality

1. Testing Challenge Generation...
   ✅ Challenge generated: [timestamp and data]

2. Testing Challenge Solving...
   ✅ Solution found: Nonce: 2002, Hash: 000ff02f...
   Solve time: 10ms

3. Testing Solution Verification...
   ✅ Solution verification: VALID

🎉 All tests completed successfully!
```

### Reset Testing
- Use the **"Reset Verification"** button on any page
- Refresh to see the auto-challenge again
- Perfect for testing and demonstrations

## 💻 Code Usage

### Basic Implementation
```tsx
import { PageProtection } from 'mayavi';

export default function MyPage() {
  return (
    <PageProtection difficulty={3}>
      <div>Your protected content here!</div>
    </PageProtection>
  );
}
```

### Advanced Configuration
```tsx
<PageProtection
  difficulty={4}
  sessionKey="admin_access"
  title="🔒 Admin Access Required"
  description="Verifying administrative permissions"
  onVerified={() => {
    console.log('Admin verified!');
    // Analytics, logging, etc.
  }}
>
  <AdminDashboard />
</PageProtection>
```

### Custom Hook Usage
```tsx
import { useMayaviProtection } from 'mayavi';

function MyComponent() {
  const { isVerified, reset } = useMayaviProtection({
    sessionKey: 'my_page',
    difficulty: 3
  });

  return (
    <div>
      Status: {isVerified ? '✅ Verified' : '⏳ Pending'}
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## 🎯 Real-World Use Cases

| **Page Type** | **Difficulty** | **Use Case** | **Example** |
|---------------|----------------|--------------|-------------|
| **Blog/Content** | 2-3 | Light bot protection | `/blog` example |
| **E-commerce** | 3-4 | Anti-scraping for products | `/shop` example |
| **Admin Panel** | 4-5 | Secure sensitive interfaces | `/dashboard` example |
| **API Docs** | 3 | Prevent automated crawling | Documentation sites |
| **Premium Content** | 4 | Gate exclusive features | Subscription content |

## 🔧 Configuration Options

### Session Keys
Create separate verification scopes:
```tsx
<PageProtection sessionKey="blog_access" />     // Blog verification
<PageProtection sessionKey="shop_access" />     // Shop verification  
<PageProtection sessionKey="admin_access" />    // Admin verification
```

### Protection Modes
```tsx
// Overlay mode (default) - Shows challenge over content
<PageProtection protectionMode="overlay">

// Replace mode - Replaces content entirely until verified
<PageProtection protectionMode="replace">
```

## 🚨 Performance Notes

- **Difficulty 2-3:** Nearly instant (25-50ms) - Good for public content
- **Difficulty 4:** Quick (200ms) - Good for important content
- **Difficulty 5+:** Longer (800ms+) - Only for high-security needs

## 🔗 Links

- **NPM Package:** `npm install mayavi`
- **GitHub:** [https://github.com/intincrab/mayavi](https://github.com/intincrab/mayavi)
- **Documentation:** Check `examples/` directory in main repo

## ✅ Production Checklist

1. ✅ Choose appropriate difficulty levels
2. ✅ Use descriptive titles and descriptions
3. ✅ Implement proper error handling
4. ✅ Add analytics/logging for verification events
5. ✅ Test with different session keys
6. ✅ Monitor performance and user experience

---

**🎉 Result:** Complete auto-starting page protection with zero user friction! Perfect for protecting any content while maintaining excellent user experience. 
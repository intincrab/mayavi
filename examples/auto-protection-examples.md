# 🔒 Auto-Starting Page Protection Examples

These examples show how to protect any page with automatic challenges that appear only for first-time visitors.

## 🚀 Quick Setup

The new auto-starting protection makes it incredibly easy to add verification to any page without requiring user interaction.

### Basic Page Protection

```tsx
// Any page component
'use client';

import { PageProtection } from 'mayavi';

export default function ProtectedPage() {
  return (
    <PageProtection
      difficulty={3}
      title="🛡️ Security Check"
      description="Verifying you're human before accessing this page"
    >
      <div>
        <h1>Protected Content</h1>
        <p>This content is only visible after completing the challenge!</p>
        {/* Your page content here */}
      </div>
    </PageProtection>
  );
}
```

**✅ Features:**
- Automatically starts when page loads
- Only shows for first-time visitors (uses sessionStorage)
- Full-screen overlay that disappears after verification
- No button clicks required

### Multiple Protection Levels

```tsx
// Different pages can have different difficulty levels
import { PageProtection } from 'mayavi';

// Public blog post - Easy protection
export function BlogPost() {
  return (
    <PageProtection difficulty={2} sessionKey="blog_verified">
      <article>
        <h1>My Blog Post</h1>
        <p>Content here...</p>
      </article>
    </PageProtection>
  );
}

// Admin dashboard - Hard protection  
export function AdminDashboard() {
  return (
    <PageProtection difficulty={5} sessionKey="admin_verified">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Sensitive admin content...</p>
      </div>
    </PageProtection>
  );
}

// Premium content - Medium protection
export function PremiumContent() {
  return (
    <PageProtection difficulty={4} sessionKey="premium_verified">
      <div>
        <h1>Premium Features</h1>
        <p>Exclusive content...</p>
      </div>
    </PageProtection>
  );
}
```

### Replace Mode (Full Page Challenge)

```tsx
// Show challenge instead of page content
import { PageProtection } from 'mayavi';

export default function ExclusivePage() {
  return (
    <PageProtection
      protectionMode="replace" // Replace entire page
      difficulty={4}
      title="🎯 Exclusive Access"
      description="Complete verification to access exclusive content"
      onVerified={() => {
        console.log('User gained access to exclusive content');
      }}
    >
      <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-400">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🌟 Exclusive Content Area
          </h1>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to the VIP Section!</h2>
            <p>This content is only available to verified users.</p>
          </div>
        </div>
      </div>
    </PageProtection>
  );
}
```

### Custom Hook Usage

```tsx
// Use the hook for custom implementations
import { useMayaviProtection, ProofOfWorkChallenge } from 'mayavi';

export default function CustomProtectedPage() {
  const { isVerified, showChallenge, reset } = useMayaviProtection({
    difficulty: 3,
    sessionKey: 'custom_page',
    onVerified: () => {
      console.log('Custom verification completed!');
      // Custom analytics, redirects, etc.
    }
  });

  // Custom loading state
  if (showChallenge && !isVerified) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="text-center py-16">
          <h1 className="text-3xl mb-4">🔐 Secure Area</h1>
          <p className="mb-8">Completing security verification...</p>
        </div>
        <ProofOfWorkChallenge 
          difficulty={3}
          sessionKey="custom_page"
          title="Security Verification"
          description="Please wait while we verify your access"
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>You have been verified!</p>
      <button onClick={reset} className="bg-red-500 text-white px-4 py-2 rounded">
        Reset Verification (for testing)
      </button>
    </div>
  );
}
```

### Layout-Level Protection

```tsx
// Protect entire sections of your app
// app/layout.tsx or layouts/protected-layout.tsx

import { PageProtection } from 'mayavi';

export default function ProtectedLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>
        <PageProtection
          difficulty={3}
          sessionKey="app_access"
          title="🏠 Welcome"
          description="Verifying access to our application"
          onVerified={() => {
            // Track user verification
            console.log('User verified for app access');
          }}
        >
          <header>
            <nav>Navigation here...</nav>
          </header>
          <main>{children}</main>
          <footer>Footer here...</footer>
        </PageProtection>
      </body>
    </html>
  );
}
```

### Next.js App Router Examples

```tsx
// app/protected/page.tsx - Automatic protection
'use client';

import { PageProtection } from 'mayavi';

export default function ProtectedRoute() {
  return (
    <PageProtection
      difficulty={4}
      sessionKey="protected_route"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Protected Route</h1>
        <p>This entire route is automatically protected!</p>
      </div>
    </PageProtection>
  );
}

// app/dashboard/layout.tsx - Protect all dashboard pages
import { PageProtection } from 'mayavi';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageProtection
      difficulty={4}
      sessionKey="dashboard_access"
      title="🎛️ Dashboard Access"
      description="Verifying dashboard permissions"
    >
      <div className="dashboard-layout">
        <aside>Dashboard sidebar...</aside>
        <main>{children}</main>
      </div>
    </PageProtection>
  );
}
```

### Server Verification Integration

```tsx
// Combine with server-side verification
import { PageProtection } from 'mayavi';
import type { Challenge, Solution } from 'mayavi';

export default function ServerVerifiedPage() {
  const handleSuccess = async (challenge: Challenge, solution: Solution) => {
    try {
      // Send to your server for additional verification
      const response = await fetch('/api/verify-advanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          challenge, 
          solution,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        }),
      });

      if (response.ok) {
        console.log('Server verification successful');
        // Additional server-side checks passed
      } else {
        console.error('Server verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  return (
    <PageProtection
      difficulty={4}
      onSuccess={handleSuccess}
      title="🔐 Secure Zone"
      description="Multi-layer verification in progress"
    >
      <div>
        <h1>Highly Secure Content</h1>
        <p>This content has been verified both client and server-side.</p>
      </div>
    </PageProtection>
  );
}
```

## ⚙️ Configuration Options

### Session Keys
Use different session keys to create separate verification scopes:

```tsx
// Each gets its own verification session
<PageProtection sessionKey="blog_access" />      // For blog
<PageProtection sessionKey="shop_access" />      // For shop  
<PageProtection sessionKey="admin_access" />     // For admin
<PageProtection sessionKey="premium_access" />   // For premium
```

### Difficulty Levels

| Difficulty | Use Case | Typical Time |
|------------|----------|--------------|
| 2 | Public content, light protection | ~25ms |
| 3 | Standard pages, moderate protection | ~50ms |
| 4 | Important content, good protection | ~200ms |
| 5 | Sensitive data, strong protection | ~800ms |
| 6+ | Critical systems, maximum protection | ~3s+ |

### Protection Modes

```tsx
// Overlay mode (default) - Shows over existing content
<PageProtection protectionMode="overlay">
  {/* Content rendered but hidden behind overlay */}
</PageProtection>

// Replace mode - Replaces content entirely
<PageProtection protectionMode="replace">
  {/* Content not rendered until verified */}
</PageProtection>
```

## 🎯 Use Cases

### ✅ Perfect For:

1. **Blog Protection**: Light verification for content access
2. **E-commerce**: Protect product pages from scrapers
3. **Admin Dashboards**: Secure sensitive interfaces
4. **Premium Content**: Gate exclusive features
5. **API Documentation**: Prevent automated access
6. **Download Pages**: Verify before file access

### ❌ Not Recommended For:

1. **User Registration/Login**: Use proper authentication
2. **Payment Pages**: Use SSL and proper security
3. **Public APIs**: Use API keys instead
4. **SEO-Critical Pages**: May impact search indexing

## 🧪 Testing Your Implementation

```tsx
// Add a reset button for testing
import { useMayaviProtection } from 'mayavi';

function TestControls() {
  const { reset } = useMayaviProtection({ sessionKey: 'test_page' });
  
  return (
    <button onClick={reset} className="bg-red-500 text-white px-4 py-2 rounded">
      Reset Verification (Testing)
    </button>
  );
}
```

**Test Scenarios:**
1. First visit - Should show challenge automatically
2. Refresh page - Should not show challenge again
3. New tab - Should not show challenge (same session)
4. Different session key - Should show challenge again
5. Clear sessionStorage - Should show challenge again

## 🚀 Production Tips

1. **Choose Appropriate Difficulty**: Balance security vs user experience
2. **Use Descriptive Titles**: Help users understand why verification is needed
3. **Monitor Performance**: Higher difficulties take longer
4. **Session Management**: Different keys for different protection levels
5. **Error Handling**: Implement proper error states
6. **Analytics**: Track verification success rates

---

**🎉 Result**: Your pages are now automatically protected with zero user interaction required! The challenge appears as a smooth overlay, completes automatically, and never shows again for verified users.

**✅ Benefits:**
- Zero friction for legitimate users
- Automatic bot protection
- Session-based verification
- Configurable difficulty levels
- Beautiful, responsive UI
- TypeScript support
- Production-ready 
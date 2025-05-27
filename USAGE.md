# Mayavi Usage Guide

This guide shows you how to integrate Mayavi proof-of-work challenges into your website.

## Installation

```bash
npm install mayavi
# or
yarn add mayavi
# or
pnpm add mayavi
```

## Quick Start

### 1. Basic React Component Usage

```tsx
import React, { useState } from 'react';
import { ProofOfWorkChallenge } from 'mayavi';

function ProtectedPage() {
  const [isVerified, setIsVerified] = useState(false);

  const handleSuccess = (challenge, solution) => {
    console.log('Challenge completed!', { challenge, solution });
    setIsVerified(true);
  };

  const handleError = (error) => {
    console.error('Challenge failed:', error);
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ProofOfWorkChallenge
          difficulty={4}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>This content is protected from bots!</p>
    </div>
  );
}

export default ProtectedPage;
```

### 2. Server-Side Verification (Next.js)

```typescript
// pages/api/verify.ts or app/api/verify/route.ts
import { createVerificationEndpoint } from 'mayavi';

export const { POST } = createVerificationEndpoint();
```

### 3. Custom Server Verification

```typescript
import { verifySolution, type Challenge, type Solution } from 'mayavi';

// Express.js example
app.post('/api/verify', (req, res) => {
  const { challenge, solution }: { challenge: Challenge; solution: Solution } = req.body;

  // Check if challenge is not too old (5 minutes)
  const maxAge = 5 * 60 * 1000;
  const challengeAge = Date.now() - challenge.timestamp;
  
  if (challengeAge > maxAge) {
    return res.status(400).json({ error: 'Challenge expired' });
  }

  // Verify the solution
  const isValid = verifySolution(challenge, solution);

  if (isValid) {
    res.json({
      success: true,
      message: 'Proof of work verified successfully',
      timestamp: Date.now()
    });
  } else {
    res.status(400).json({ error: 'Invalid proof of work solution' });
  }
});
```

## Advanced Usage

### Custom Styling

```tsx
import { ProofOfWorkChallenge } from 'mayavi';

<ProofOfWorkChallenge
  difficulty={4}
  className="my-custom-challenge"
  title="🛡️ Security Verification"
  description="Please complete this verification to continue"
  buttonText="Verify I'm Human"
  showProgress={true}
  theme="dark"
  onSuccess={handleSuccess}
  onError={handleError}
/>
```

### Programmatic Challenge Generation

```typescript
import { generateChallenge, solveChallenge, verifySolution } from 'mayavi';

// Generate a challenge
const challenge = generateChallenge(4);

// Solve it (this happens automatically in the component)
const solution = await solveChallenge(challenge, (nonce, hash) => {
  console.log(`Progress: ${nonce} attempts, current hash: ${hash}`);
});

// Verify the solution
const isValid = verifySolution(challenge, solution);
console.log('Solution is valid:', isValid);
```

### Middleware Protection (Next.js)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const powToken = request.cookies.get('mayavi-verified');
  
  if (!powToken) {
    return NextResponse.redirect(new URL('/challenge', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*', '/admin/:path*']
};
```

### Session Management

```typescript
const handleSuccess = async (challenge, solution) => {
  const response = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challenge, solution }),
  });

  if (response.ok) {
    // Set cookie for 24 hours
    document.cookie = `mayavi-verified=true; max-age=86400; path=/; secure; samesite=strict`;
    setIsVerified(true);
  }
};
```

## Configuration Options

### Difficulty Levels

| Difficulty | Leading Zeros | Avg. Time | Use Case |
|------------|---------------|-----------|----------|
| 1          | 0             | ~10ms     | Development/Testing |
| 2          | 00            | ~25ms     | Light protection |
| 3          | 000           | ~50ms     | Basic protection |
| 4          | 0000          | ~200ms    | Standard protection |
| 5          | 00000         | ~800ms    | High protection |
| 6          | 000000        | ~3.2s     | Maximum protection |

### Component Props

```typescript
interface ProofOfWorkChallengeProps {
  difficulty?: number;                    // Default: 4
  onSuccess?: (challenge, solution) => void;
  onError?: (error: string) => void;
  className?: string;                     // Custom CSS classes
  title?: string;                         // Custom title
  description?: string;                   // Custom description
  buttonText?: string;                    // Custom button text
  showProgress?: boolean;                 // Show progress indicator
  theme?: 'light' | 'dark' | 'auto';    // Theme preference
}
```

## Integration Examples

### Contact Form Protection

```tsx
function ContactForm() {
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Please complete the verification first');
      return;
    }
    // Submit form...
  };

  return (
    <div>
      {!isVerified && (
        <ProofOfWorkChallenge
          difficulty={3}
          onSuccess={() => setIsVerified(true)}
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          disabled={!isVerified}
        />
        {/* More form fields... */}
        <button type="submit" disabled={!isVerified}>
          Send Message
        </button>
      </form>
    </div>
  );
}
```

### API Rate Limiting

```typescript
// Custom hook for API protection
function useProtectedAPI() {
  const [isVerified, setIsVerified] = useState(false);
  
  const makeProtectedRequest = async (url, options = {}) => {
    if (!isVerified) {
      throw new Error('Verification required');
    }
    
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'X-Mayavi-Verified': 'true'
      }
    });
  };

  return { isVerified, setIsVerified, makeProtectedRequest };
}
```

### Download Protection

```tsx
function ProtectedDownload({ fileUrl, fileName }) {
  const [isVerified, setIsVerified] = useState(false);

  const handleDownload = () => {
    if (isVerified) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    }
  };

  return (
    <div>
      {!isVerified ? (
        <ProofOfWorkChallenge
          difficulty={4}
          title="Download Verification"
          description="Complete this challenge to download the file"
          onSuccess={() => setIsVerified(true)}
        />
      ) : (
        <button onClick={handleDownload}>
          Download {fileName}
        </button>
      )}
    </div>
  );
}
```

## Styling

### Default Styles
Mayavi comes with built-in Tailwind CSS classes. If you're not using Tailwind, you can override with custom CSS:

```css
.mayavi-challenge {
  /* Your custom styles */
}

.mayavi-progress {
  /* Progress bar styles */
}

.mayavi-button {
  /* Button styles */
}
```

### Dark Mode Support
```tsx
<ProofOfWorkChallenge
  theme="dark"
  className="dark:bg-gray-900 dark:text-white"
/>
```

## Performance Tips

1. **Choose appropriate difficulty**: Start with difficulty 4 and adjust based on your needs
2. **Cache verification**: Store successful verifications in cookies/localStorage
3. **Progressive enhancement**: Show fallback content for users with JavaScript disabled
4. **Monitor performance**: Track completion rates and adjust difficulty accordingly

## Security Considerations

1. **Always verify server-side**: Never trust client-side verification alone
2. **Set challenge expiration**: Prevent replay attacks with timestamp validation
3. **Rate limiting**: Implement additional rate limiting on your API endpoints
4. **HTTPS only**: Always use HTTPS in production
5. **Monitor abuse**: Track failed attempts and implement additional protections if needed

## Troubleshooting

### Common Issues

1. **"Module not found" error**: Make sure you've installed the package correctly
2. **TypeScript errors**: Ensure you have the latest TypeScript version
3. **Styling issues**: Check if Tailwind CSS is properly configured
4. **Performance issues**: Try reducing the difficulty level

### Debug Mode

```typescript
import { generateChallenge, solveChallenge } from 'mayavi';

// Enable debug logging
const challenge = generateChallenge(2); // Use low difficulty for testing
console.log('Challenge:', challenge);

const solution = await solveChallenge(challenge, (nonce, hash) => {
  if (nonce % 1000 === 0) {
    console.log(`Progress: ${nonce} attempts`);
  }
});

console.log('Solution:', solution);
```

## Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/yourusername/mayavi/issues)
2. Review this documentation
3. Create a new issue with detailed information about your problem

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details. 
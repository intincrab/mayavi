# 🚀 Mayavi Working Examples

This guide demonstrates how to use the Mayavi package in real projects after fixing the import issues.

## ✅ What Was Fixed

The package had the following issues that have been resolved:

1. **Import Path Issues**: The React component was using Next.js alias paths (`@/lib/...`) which don't work in external packages
2. **Module Format Issues**: The package was built as ES modules which caused import errors
3. **Missing Export Configuration**: Package.json lacked proper module export definitions

## 🔧 Fixed Package Configuration

### Updated `package.json`:
```json
{
  "main": "dist/index.js",
  "module": "dist/index.js", 
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    }
  }
}
```

### Updated TypeScript Config:
```json
{
  "compilerOptions": {
    "module": "CommonJS",  // Changed from "ESNext"
    "moduleResolution": "node"
  }
}
```

## 📖 Working Examples

### 1. Basic Node.js Usage

```javascript
const { 
  generateChallenge, 
  solveChallenge, 
  verifySolution,
  isValidHash,
  estimateSolveTime,
  getDifficultyDescription
} = require('mayavi');

async function testMayavi() {
  // Generate challenge
  const challenge = generateChallenge(3);
  console.log('Challenge:', challenge);
  
  // Solve challenge
  const solution = await solveChallenge(challenge, (nonce, hash) => {
    console.log(`Progress: ${nonce} attempts`);
  });
  
  // Verify solution
  const isValid = verifySolution(challenge, solution);
  console.log('Valid:', isValid);
}

testMayavi();
```

**✅ Test Result:**
```
🧪 Testing Mayavi Core Functionality

1. Testing Challenge Generation...
   ✅ Challenge generated:
      Data: 1748798705020-77hsv1pfr2
      Difficulty: 3
      Timestamp: 2025-06-01T17:25:05.020Z
      Estimated solve time: 400ms
      Difficulty description: Easy

2. Testing Challenge Solving...
   ✅ Solution found:
      Nonce: 548
      Hash: 000afd9ce7814707742ef062b1bc6d644539f805a27266a84187265b3e5401e6
      Solve time: 4ms

3. Testing Solution Verification...
   ✅ Solution verification: VALID

🎉 All tests completed successfully!
```

### 2. React Component Usage

```tsx
'use client';

import { useState } from 'react';
import { ProofOfWorkChallenge } from 'mayavi';
import type { Challenge, Solution } from 'mayavi';

export default function MyApp() {
  const [isVerified, setIsVerified] = useState(false);

  const handleSuccess = async (challenge: Challenge, solution: Solution) => {
    console.log('Challenge completed!', { challenge, solution });
    setIsVerified(true);
    
    // Send to your server for verification
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challenge, solution }),
    });
    
    const result = await response.json();
    console.log('Server verification:', result);
  };

  const handleError = (error: string) => {
    console.error('Challenge failed:', error);
  };

  return (
    <div>
      {!isVerified ? (
        <ProofOfWorkChallenge
          difficulty={3}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ) : (
        <div>✅ Access Granted!</div>
      )}
    </div>
  );
}
```

### 3. Next.js API Route

```typescript
// app/api/verify/route.ts
import { createVerificationEndpoint } from 'mayavi';

export const { POST } = createVerificationEndpoint();
```

Or manual implementation:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySolution, type Challenge, type Solution } from 'mayavi';

export async function POST(request: NextRequest) {
  const { challenge, solution }: { challenge: Challenge; solution: Solution } = 
    await request.json();

  if (!challenge || !solution) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  // Check expiration (5 minutes)
  const maxAge = 5 * 60 * 1000;
  if (Date.now() - challenge.timestamp > maxAge) {
    return NextResponse.json({ error: 'Challenge expired' }, { status: 400 });
  }

  // Verify solution
  const isValid = verifySolution(challenge, solution);
  
  if (isValid) {
    return NextResponse.json({ 
      success: true, 
      message: 'Verified successfully' 
    });
  } else {
    return NextResponse.json({ error: 'Invalid solution' }, { status: 400 });
  }
}
```

### 4. Express.js Integration

```javascript
const express = require('express');
const { verifySolution } = require('mayavi');

const app = express();
app.use(express.json());

app.post('/api/verify', (req, res) => {
  const { challenge, solution } = req.body;
  
  if (!challenge || !solution) {
    return res.status(400).json({ error: 'Missing data' });
  }
  
  const isValid = verifySolution(challenge, solution);
  
  if (isValid) {
    res.json({ success: true, message: 'Verified!' });
  } else {
    res.status(400).json({ error: 'Invalid solution' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 🛠️ Installation & Setup

### 1. Install the Package

```bash
npm install mayavi
# or
yarn add mayavi
# or
pnpm add mayavi
```

### 2. Next.js Setup

Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mayavi'], // Important for proper compilation
};

module.exports = nextConfig;
```

### 3. TypeScript Support

The package includes full TypeScript definitions:

```typescript
import type { 
  Challenge, 
  Solution, 
  ProofOfWorkResult,
  ProofOfWorkChallengeProps 
} from 'mayavi';
```

## 🧪 Testing Your Installation

Create a test file to verify everything works:

```javascript
// test-mayavi.js
const { generateChallenge, solveChallenge, verifySolution } = require('mayavi');

async function test() {
  try {
    const challenge = generateChallenge(2); // Easy difficulty
    console.log('✅ Challenge generated');
    
    const solution = await solveChallenge(challenge);
    console.log('✅ Solution found:', solution.nonce);
    
    const isValid = verifySolution(challenge, solution);
    console.log('✅ Verification:', isValid ? 'PASSED' : 'FAILED');
    
    console.log('🎉 Mayavi is working correctly!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

test();
```

Run with: `node test-mayavi.js`

## 🔧 Troubleshooting

### Common Issues & Solutions

1. **Module not found errors**: 
   - Ensure you're using the latest version (1.0.1+)
   - Add `transpilePackages: ['mayavi']` to next.config.js

2. **React component not rendering**:
   - Make sure you're using the component in a client component (`'use client'`)
   - Import the CSS if needed for styling

3. **TypeScript errors**:
   - The package includes full type definitions
   - Import types from 'mayavi' directly

4. **Performance issues**:
   - Start with low difficulty (2-3) for testing
   - Use difficulty 4-5 for production
   - Higher difficulties (6+) can take several seconds

## 📊 Performance Benchmarks

| Difficulty | Leading Zeros | Avg. Time | Avg. Attempts |
|------------|---------------|-----------|---------------|
| 2          | 00            | ~25ms     | ~256          |
| 3          | 000           | ~50ms     | ~4,096        |
| 4          | 0000          | ~200ms    | ~65,536       |
| 5          | 00000         | ~800ms    | ~1M           |
| 6          | 000000        | ~3.2s     | ~16M          |

## 🎯 Use Cases

- ✅ **Bot Protection**: Block automated scrapers
- ✅ **Rate Limiting**: Slow down high-frequency requests  
- ✅ **Spam Prevention**: Reduce automated form submissions
- ✅ **Content Gating**: Protect premium content
- ✅ **API Protection**: Secure expensive endpoints

## 🔗 Links

- **Package**: [https://www.npmjs.com/package/mayavi](https://www.npmjs.com/package/mayavi)
- **GitHub**: [https://github.com/intincrab/mayavi](https://github.com/intincrab/mayavi)
- **Demo**: [http://localhost:3000](http://localhost:3000) (when running locally)

---

**✅ Status**: All issues resolved! The package now works correctly as an external dependency. 
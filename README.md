# Mayavi

A lightweight proof-of-work challenge system to protect against AI crawlers and bots. Built with TypeScript, Next.js, and inspired by the original [Anubis project](https://github.com/TecharoHQ/anubis).

## 🚀 Features

- **Proof-of-Work Challenges**: SHA-256 based computational puzzles
- **Configurable Difficulty**: Adjustable challenge complexity
- **Real-time Progress**: Live updates during challenge solving
- **Server Verification**: Backend validation of solutions
- **Modern UI**: Beautiful, responsive interface with dark mode
- **TypeScript**: Full type safety and excellent developer experience
- **Lightweight**: Minimal dependencies and efficient implementation

## 🛡️ How It Works

1. **Challenge Generation**: Server generates a unique challenge with timestamp and difficulty
2. **Client-side Solving**: Browser computes SHA-256 hashes until finding one with required leading zeros
3. **Server Verification**: Solution is verified on the server to ensure validity
4. **Access Control**: Successful verification grants access to protected content

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/intincrab/mayavi
cd mayavi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Basic Implementation

```typescript
import { generateChallenge, solveChallenge, verifySolution } from '@/lib/proof-of-work';

// Generate a challenge
const challenge = generateChallenge(4); // difficulty = 4

// Solve the challenge (client-side)
const solution = await solveChallenge(challenge, (nonce, hash) => {
  console.log(`Progress: ${nonce} attempts, current hash: ${hash}`);
});

// Verify the solution (server-side)
const isValid = verifySolution(challenge, solution);
```

### React Component

```tsx
import ProofOfWorkChallenge from '@/components/proof-of-work-challenge';

function MyPage() {
  const handleSuccess = (challenge, solution) => {
    console.log('Challenge completed!', { challenge, solution });
  };

  return (
    <ProofOfWorkChallenge
      difficulty={4}
      onSuccess={handleSuccess}
      onError={(error) => console.error(error)}
    />
  );
}
```

### API Verification

```typescript
// POST /api/verify
const response = await fetch('/api/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ challenge, solution }),
});

const result = await response.json();
```

## ⚙️ Configuration

### Difficulty Levels

| Difficulty | Leading Zeros | Avg. Time | Description |
|------------|---------------|-----------|-------------|
| 2          | 00            | ~25ms     | Very Easy   |
| 3          | 000           | ~50ms     | Easy        |
| 4          | 0000          | ~200ms    | Medium      |
| 5          | 00000         | ~800ms    | Hard        |
| 6          | 000000        | ~3.2s     | Very Hard   |

### Environment Variables

```env
# Optional: Configure challenge expiration time (default: 5 minutes)
CHALLENGE_EXPIRY_MS=300000

# Optional: Default difficulty level
DEFAULT_DIFFICULTY=4
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/verify/          # Server-side verification endpoint
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main demo page
├── components/
│   └── proof-of-work-challenge.tsx  # React challenge component
└── lib/
    └── proof-of-work.ts     # Core proof-of-work logic
```

## 🔧 API Reference

### Core Functions

#### `generateChallenge(difficulty: number): Challenge`
Generates a new proof-of-work challenge.

#### `solveChallenge(challenge: Challenge, onProgress?: Function): Promise<Solution>`
Solves a challenge by finding a valid nonce.

#### `verifySolution(challenge: Challenge, solution: Solution): boolean`
Verifies that a solution is valid for the given challenge.

#### `isValidHash(hash: string, difficulty: number): boolean`
Checks if a hash meets the difficulty requirement.

### Types

```typescript
interface Challenge {
  data: string;
  difficulty: number;
  timestamp: number;
}

interface Solution {
  nonce: number;
  hash: string;
  timestamp: number;
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

## 🛡️ Security Considerations

- **Challenge Expiration**: Challenges expire after 5 minutes to prevent replay attacks
- **Server Verification**: Always verify solutions on the server side
- **Rate Limiting**: Consider implementing rate limiting for challenge generation
- **HTTPS**: Use HTTPS in production to prevent man-in-the-middle attacks

## 🎯 Use Cases

- **Bot Protection**: Block automated scrapers and crawlers
- **Rate Limiting**: Slow down high-frequency requests
- **Spam Prevention**: Reduce automated form submissions
- **Resource Protection**: Protect expensive API endpoints
- **Content Gating**: Require proof-of-work before accessing premium content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original [Anubis project](https://github.com/TecharoHQ/anubis) by TecharoHQ
- [js-sha256](https://github.com/emn178/js-sha256) for SHA-256 implementation
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📚 Learn More

- [Original Anubis Documentation](https://github.com/TecharoHQ/anubis)
- [Proof of Work Explained](https://en.wikipedia.org/wiki/Proof_of_work)
- [SHA-256 Algorithm](https://en.wikipedia.org/wiki/SHA-2)
- [Next.js Documentation](https://nextjs.org/docs)

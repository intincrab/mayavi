# 🎉 Mayavi v1.0.2 - Auto-Starting Page Protection

**Published to NPM**: [mayavi@1.0.2](https://www.npmjs.com/package/mayavi)  
**GitHub Release**: [v1.0.2](https://github.com/intincrab/mayavi/releases/tag/v1.0.2)

## ✨ New Features

### 🚀 **Zero-Friction Auto Protection**
- **Auto-starting challenges** that begin immediately when page loads
- **No user interaction required** - challenges solve in background
- **Beautiful overlay UI** with real-time progress indicators
- **Session management** - challenges only show for first-time visitors

### 🛡️ **New Components**

#### **PageProtection Component**
```tsx
import { PageProtection } from 'mayavi';

export default function MyPage() {
  return (
    <PageProtection difficulty={3}>
      <div>Your protected content!</div>
    </PageProtection>
  );
}
```

#### **useMayaviProtection Hook**
```tsx
import { useMayaviProtection } from 'mayavi';

function MyComponent() {
  const { isVerified, reset } = useMayaviProtection({
    sessionKey: 'my_page',
    difficulty: 3
  });
  
  return <div>Status: {isVerified ? '✅ Verified' : '⏳ Pending'}</div>;
}
```

### 🎯 **Advanced Configuration**
- **Multiple protection modes**: overlay, replace
- **Separate session keys** for different protection scopes
- **Configurable difficulty levels** (2-5+ with different solve times)
- **Custom titles and descriptions** for better UX
- **Event callbacks** for verification, success, and error handling

## 🛠️ Technical Improvements

### ✅ **Fixed External Package Issues**
- **Fixed import paths** to work correctly as external NPM package
- **Changed from ES modules to CommonJS** for better compatibility
- **Enhanced TypeScript definitions** with complete type safety
- **Improved package export structure** for better tree-shaking

### 🚀 **Enhanced Core Features**
- **Enhanced ProofOfWorkChallenge** component with auto-start capabilities
- **Session storage integration** for first-time-only verification
- **Real-time progress tracking** with hash updates
- **Cross-tab session persistence**

## 📖 Documentation & Examples

### 🏗️ **Complete Working Examples**
- **📖 Blog Page** (Difficulty 2, ~25ms) - Content protection
- **🎛️ Admin Dashboard** (Difficulty 4, ~200ms) - High-security interface
- **🛒 E-commerce Shop** (Difficulty 3, ~50ms) - Anti-scraping protection
- **🏠 Main Page** (Difficulty 3, ~50ms) - Landing page protection

### 📚 **Comprehensive Documentation**
- **Auto-protection usage guide** with real-world examples
- **Performance benchmarks** for different difficulty levels
- **Best practices** for production deployment
- **Integration guides** for Next.js, React, and other frameworks

## 🎯 Use Cases & Performance

| **Difficulty** | **Solve Time** | **Use Case** | **Example** |
|----------------|----------------|--------------|-------------|
| **2 (Easy)** | ~25ms | Blog posts, public content | Content sites |
| **3 (Medium)** | ~50ms | E-commerce, product pages | Retail sites |
| **4 (Hard)** | ~200ms | Admin panels, sensitive data | Admin dashboards |
| **5+ (Extreme)** | ~800ms+ | High-security systems | Banking, finance |

## 🚀 Installation & Usage

### Install
```bash
npm install mayavi
# or
yarn add mayavi
# or
pnpm add mayavi
```

### Basic Usage
```tsx
import { PageProtection } from 'mayavi';

export default function ProtectedPage() {
  return (
    <PageProtection
      difficulty={3}
      sessionKey="page_access"
      title="🔒 Verification Required"
      description="Checking access permissions..."
      onVerified={() => console.log('Access granted!')}
    >
      <YourProtectedContent />
    </PageProtection>
  );
}
```

## 📦 Package Information

- **Package Size**: 14.2 kB (compressed)
- **Unpacked Size**: 53.5 kB
- **TypeScript**: Full type definitions included
- **Dependencies**: Minimal (js-sha256, react)
- **Compatibility**: React 16.8+, Next.js 12+

## 🔗 Links

- **NPM Package**: [https://www.npmjs.com/package/mayavi](https://www.npmjs.com/package/mayavi)
- **GitHub Repository**: [https://github.com/intincrab/mayavi](https://github.com/intincrab/mayavi)
- **Live Examples**: See `test-examples/` directory
- **Documentation**: [README.md](./README.md)

## 🙏 Acknowledgments

- Original [Anubis project](https://github.com/TecharoHQ/anubis) by TecharoHQ
- [js-sha256](https://github.com/emn178/js-sha256) for SHA-256 implementation
- Community feedback and testing

---

**🎉 Ready for Production**: This release represents a complete, production-ready auto-protection system with zero user friction and comprehensive documentation. Perfect for protecting any web content while maintaining excellent user experience! 
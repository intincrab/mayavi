# 📦 Publish Mayavi to GitHub Packages

This guide explains how to publish the Mayavi package to **GitHub Packages** in addition to NPM, so it appears in your GitHub repository's "Packages" section.

## 🎯 Current Status

- ✅ **NPM Registry**: [mayavi@1.0.2](https://www.npmjs.com/package/mayavi) - Published
- ❌ **GitHub Packages**: Not yet published (why you see "No packages published")

## 📝 Why GitHub Packages?

GitHub's "Packages" section only shows packages published to **GitHub Packages** (GitHub's own registry), not NPM packages. To make your package appear there, you need to publish to both registries.

## 🚀 How to Publish to GitHub Packages

### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Select scopes:
   - ✅ `write:packages` (to publish packages)
   - ✅ `read:packages` (to read packages)
   - ✅ `repo` (if repository is private)
4. Copy the token

### Step 2: Configure NPM for GitHub Packages

```bash
# Add GitHub Packages registry for @intincrab scope
echo "@intincrab:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Authenticate with GitHub Packages
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

### Step 3: Update package.json for GitHub Packages

Create a separate `package.json` configuration for GitHub Packages:

```json
{
  "name": "@intincrab/mayavi",
  "version": "1.0.2",
  "description": "A lightweight proof-of-work challenge system to protect against AI crawlers and bots",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/intincrab/mayavi.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Step 4: Publish to GitHub Packages

```bash
# Build the package
npm run build-package

# Create scoped package for GitHub
cp package.json package.json.backup
jq '.name = "@intincrab/mayavi" | .publishConfig = {"registry": "https://npm.pkg.github.com"}' package.json > package.github.json
mv package.github.json package.json

# Publish to GitHub Packages
npm publish

# Restore original package.json
mv package.json.backup package.json
```

### Step 5: Alternative Script Method

Create a script to automate this:

```bash
#!/bin/bash
# publish-github.sh

echo "📦 Publishing Mayavi to GitHub Packages..."

# Backup original package.json
cp package.json package.json.backup

# Create GitHub Packages version
cat package.json | \
  jq '.name = "@intincrab/mayavi"' | \
  jq '.publishConfig = {"registry": "https://npm.pkg.github.com"}' \
  > package.github.json

# Replace package.json temporarily
mv package.json.backup package.json.npm
mv package.github.json package.json

# Build and publish
npm run build-package
npm publish --registry=https://npm.pkg.github.com

# Restore original package.json
mv package.json.npm package.json

echo "✅ Published to GitHub Packages!"
echo "📦 Package will appear at: https://github.com/intincrab/mayavi/packages"
```

## 🎯 Expected Result

After publishing to GitHub Packages, you'll see:

### GitHub Repository Packages Section:
```
📦 Packages
@intincrab/mayavi  v1.0.2
A lightweight proof-of-work challenge system
```

### Installation Options:
```bash
# From NPM (unchanged)
npm install mayavi@1.0.2

# From GitHub Packages  
npm install @intincrab/mayavi@1.0.2 --registry=https://npm.pkg.github.com
```

## 🔗 Links After Publishing

- **NPM Package**: https://www.npmjs.com/package/mayavi
- **GitHub Package**: https://github.com/intincrab/mayavi/packages
- **GitHub Release**: https://github.com/intincrab/mayavi/releases/tag/v1.0.2

## ⚠️ Important Notes

1. **Scoped Package**: GitHub Packages requires scoped packages (`@username/package`)
2. **Authentication**: Users need GitHub token to install from GitHub Packages
3. **Dual Publishing**: You can publish to both NPM and GitHub Packages
4. **Visibility**: Package appears in GitHub UI only after publishing to GitHub Packages

## 🎯 Quick Commands

```bash
# Set up authentication (one time)
echo "@intincrab:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc

# Publish to GitHub Packages
npm run build-package
npm publish --registry=https://npm.pkg.github.com
```

---

**✅ Result**: After following this guide, your package will appear in GitHub's "Packages" section! 
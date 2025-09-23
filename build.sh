#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status.

echo "=== Starting Optimized Build Process ==="

# Build frontend first (ใช้ cache ให้มากขึ้น)
echo "📦 Building frontend..."
cd frontend

echo "Installing frontend dependencies with cache..."
npm ci --prefer-offline --no-audit --silent

echo "Building frontend application..."
npm run build --silent

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "❌ Frontend build directory was not created!"
    exit 1
fi

echo "✅ Frontend build completed successfully!"

# Build backend (เร็วขึ้น)
echo "⚡ Building backend..."
cd ../backend

echo "Installing backend dependencies with cache..."
npm ci --prefer-offline --no-audit --silent

echo "✅ Backend build completed successfully!"
echo "=== Build process completed ==="
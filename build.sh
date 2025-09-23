#!/bin/bash

echo "=== Starting Build Process ==="

# Build frontend
echo "Building frontend..."
cd frontend

echo "Installing frontend dependencies..."
if ! npm install; then
    echo "❌ Frontend npm install failed!"
    exit 1
fi

echo "Building frontend application..."
if ! npm run build; then
    echo "❌ Frontend build failed!"
    exit 1
fi

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "❌ Frontend build directory was not created!"
    exit 1
fi

echo "✅ Frontend build completed successfully!"

# Build backend
echo "Building backend..."
cd ../backend

echo "Installing backend dependencies..."
if ! npm install; then
    echo "❌ Backend npm install failed!"
    exit 1
fi

echo "✅ Backend build completed successfully!"
echo "=== Build process completed ==="
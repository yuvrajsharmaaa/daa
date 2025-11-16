#!/bin/bash

# Disaster Relief App - Quick Start Script

echo "🚀 Starting Disaster Relief Application..."
echo ""

# Start Backend
echo "📦 Starting Backend Server..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start Frontend
echo "🌐 Starting Frontend Server..."
cd frontend
python3 -m http.server 8080 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application is running!"
echo ""
echo "📡 Backend API:  http://localhost:3000"
echo "🌐 Frontend UI:  http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

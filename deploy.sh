#!/bin/bash

echo "Deploying backend to Vercel..."
cd backend
vercel
cd ..
echo ""
echo "Backend deployment complete!"
echo ""
echo "Copy your backend URL from above."
echo "You'll need it for the next step."
echo ""
read -p "Press Enter to continue..."
echo ""
echo "Deploying frontend to Vercel..."
cd frontend
vercel
cd ..
echo ""
echo "Deployment complete!"
echo ""
read -p "Press Enter to exit..."

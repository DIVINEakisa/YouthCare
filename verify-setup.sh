#!/bin/bash
# YouthCare+ - Complete Setup and Verification Script
# Run this script to verify all files are in place and working

echo "=========================================="
echo "YouthCare+ - Project Verification"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check backend files
echo "Checking Backend Files..."
echo ""

files_backend=(
  "backend/server.js"
  "backend/package.json"
  "backend/.env.example"
  "backend/config/db.js"
  "backend/models/User.js"
  "backend/models/Chat.js"
  "backend/models/CycleTracker.js"
  "backend/controllers/authController.js"
  "backend/controllers/chatController.js"
  "backend/controllers/cycleTrackerController.js"
  "backend/routes/auth.js"
  "backend/routes/chat.js"
  "backend/routes/cycleTracker.js"
  "backend/middleware/auth.js"
)

for file in "${files_backend[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (MISSING)"
  fi
done

echo ""
echo "Checking Frontend Files..."
echo ""

files_frontend=(
  "frontend/package.json"
  "frontend/.env.example"
  "frontend/tailwind.config.js"
  "frontend/postcss.config.js"
  "frontend/public/index.html"
  "frontend/src/App.js"
  "frontend/src/App.css"
  "frontend/src/index.js"
  "frontend/src/index.css"
  "frontend/src/components/Navbar.js"
  "frontend/src/components/ProtectedRoute.js"
  "frontend/src/context/AuthContext.js"
  "frontend/src/utils/api.js"
  "frontend/src/pages/Login.js"
  "frontend/src/pages/Register.js"
  "frontend/src/pages/Dashboard.js"
  "frontend/src/pages/Chat.js"
  "frontend/src/pages/CycleTracker.js"
  "frontend/src/pages/Education.js"
  "frontend/src/pages/MentalHealth.js"
  "frontend/src/pages/Clinics.js"
  "frontend/src/pages/YouthCenters.js"
  "frontend/src/pages/DeviceInfo.js"
)

for file in "${files_frontend[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (MISSING)"
  fi
done

echo ""
echo "Checking Documentation Files..."
echo ""

files_docs=(
  "README.md"
  "QUICKSTART.md"
  "FEATURES.md"
  "API_DOCUMENTATION.md"
  "DEPLOYMENT.md"
  "PROJECT_SUMMARY.md"
  "TECHNICAL_IMPLEMENTATION.md"
)

for file in "${files_docs[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (MISSING)"
  fi
done

echo ""
echo "=========================================="
echo "Verification Complete!"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. cd backend && npm install"
echo "2. cd frontend && npm install"
echo "3. Configure .env files"
echo "4. npm start (in separate terminals)"
echo ""
echo "For detailed instructions, see QUICKSTART.md"

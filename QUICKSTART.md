# YouthCare+ - Quick Start Guide

## One-Time Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend (.env file):**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/youthcare
PORT=5000
JWT_SECRET=youthcare_secret_key_2024
OPENAI_API_KEY=sk-... (leave blank for mock responses)
NODE_ENV=development
```

**Frontend (.env file):**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# On Windows
mongod

# On Mac
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

## Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm start
# or with auto-reload during development:
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Terminal 2: Start Frontend Server

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
Local:            http://localhost:3000
```

The browser should automatically open at `http://localhost:3000`

## Test Accounts

### Create a Test Account:

1. Go to **Register** page at `http://localhost:3000/register`
2. Fill in the form:
   - Name: Test User
   - Age: 20
   - Gender: Female (to see cycle tracker)
   - Email: test@example.com
   - Password: test123456

3. Click "Create Account"
4. You'll be redirected to the Dashboard

## Testing Features

### AI Chatbot
1. Click "AI Chatbot" from dashboard
2. Type a health question, e.g.:
   - "What should I know about my period?"
   - "How do I manage stress?"
   - "Tell me about reproductive health"

### Cycle Tracker (Female Users Only)
1. Click "Cycle Tracker"
2. Enter your last period date
3. Adjust cycle length if needed (default: 28 days)
4. Click "Update Cycle Info"
5. View predictions and tips

### Educational Content
1. Click "Educational Content"
2. Switch between categories
3. Read articles and check video links

### Mental Health
1. Click "Mental Health"
2. Select your mood
3. Read the personalized tips

### Clinic Finder
1. Click "Clinic Finder"
2. Browse nearby clinics
3. Click on a clinic to see full details

### Youth Centers
1. Click "Youth Centers"
2. Explore available centers and activities

### Device Info
1. Click "Device Info"
2. Learn about the menstrual pain relief device

## API Endpoints Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

### Chat
```
POST /api/chat/send (body: { message: "..." })
GET /api/chat/history
```

### Cycle Tracker
```
POST /api/cycle-tracker/update (body: { lastPeriodDate: "2024-01-15", cycleLength: 28 })
GET /api/cycle-tracker/get
```

## Health Check

Visit `http://localhost:5000/api/health` to verify backend is running.

Response:
```json
{
  "message": "YouthCare+ Backend is running"
}
```

## Common Issues & Solutions

### Port 5000 Already in Use
```bash
# Find and kill the process using port 5000
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Failed
- Ensure MongoDB is installed and running
- Check MongoDB connection string in `.env`
- Default: `mongodb://localhost:27017/youthcare`

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache (Ctrl+Shift+Delete)

### AI Chatbot Returns Mock Responses
- This is expected without an OpenAI API key
- To use real AI, add your API key to `backend/.env`
- Get key from: https://platform.openai.com/api-keys

## Development Notes

- Frontend uses React Router for navigation
- Backend uses Express.js with MongoDB
- Authentication uses JWT tokens (stored in localStorage)
- All API requests include Bearer token automatically
- Mock data is used for clinics, centers, and therapists

## Project Structure

```
YouthCare/
├── backend/          # Express.js API server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   └── server.js     # Main server file
│
└── frontend/         # React.js web app
    ├── src/
    │   ├── pages/    # Page components
    │   ├── components/ # Reusable components
    │   ├── context/  # React Context (Auth)
    │   └── utils/    # API calls
    └── public/       # Static files
```

## Next Steps

1. Explore the codebase
2. Customize colors and branding in `frontend/tailwind.config.js`
3. Add your own clinic/center data
4. Integrate real OpenAI API for AI chatbot
5. Set up email notifications
6. Deploy to production

## Support

- Check browser console for frontend errors
- Check terminal for backend errors
- Verify all environment variables are set
- Ensure all dependencies are installed

Happy coding! 🚀

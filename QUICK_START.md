# YouthCare+ v2.0 - Quick Start Guide

## What's New in v2.0

YouthCare+ has been enhanced with 5 major features:

1. **🔔 Real Notification System** - In-app and browser notifications
2. **♿ Accessibility Features** - Text-to-speech, captions, large text support
3. **💡 Smart Recommendations** - AI-powered content suggestions
4. **🎥 Enhanced Education** - Video embedding, better filtering, resources
5. **📊 Improved Cycle Tracker** - Health tips, predictions, reminders

---

## Getting Started

### 1. Backend Setup

```bash
# Navigate to backend
cd d:\YouthCare\backend

# Install dependencies (if not done)
npm install

# Create/update .env file with:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/youthcare
PORT=5000
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=sk-your-openai-key

# Start backend
npm start

# Backend will run on http://localhost:5000
```

### 2. Frontend Setup

```bash
# Navigate to frontend
cd d:\YouthCare\frontend

# Install dependencies (if not done)
npm install

# Create/update .env file with:
REACT_APP_API_URL=http://localhost:5000/api

# Start frontend
npm start

# Frontend will run on http://localhost:3001
```

### 3. Access the Application

```
Frontend: http://localhost:3001
Backend API: http://localhost:5000/api
```

---

## Feature Overview

### 1. Notification System

**What it does:**
- Shows notifications in a sidebar panel
- Displays unread count badge on bell icon
- Tracks read/unread status
- Auto-generates cycle reminders

**How to use:**
1. Log in and look for 🔔 bell icon in top right
2. Click bell to open notification panel
3. Click notification to mark as read
4. Click X to delete
5. Click "Mark all as read" to clear all at once

**Try it:**
1. Go to Cycle Tracker (female users only)
2. Enter any past date and click Calculate
3. Check notifications - should show cycle reminders
4. Should see 3 notifications (7 days, 2 days, ovulation day)

### 2. Accessibility Features

**Text-to-Speech:**
- Go to Learn section
- Select any article
- Click "🔊 Listen (Text-to-Speech)" button
- Content will be read aloud in English or Kinyarwanda
- Click "⏹ Stop" to stop playback

**Video Captions:**
- All embedded videos have captions enabled by default
- Click CC button in video player to toggle

**Large Text:**
- Use Ctrl + Plus (Cmd + Plus on Mac) to zoom in browser
- Or use browser zoom settings

**Simple Language:**
- All content written in easy-to-understand language
- Medical terms are explained

### 3. Enhanced Education

**New Features:**
- 3 types of content: Articles, Videos, Resources
- 5 categories: Reproductive, Mental, Youth, Nutrition, Safety
- 2 languages: English and Kinyarwanda
- Recommended content suggestions
- Source verification badges
- Print articles feature

**How to use:**
1. Go to "Learn" section in dashboard
2. Select category from dropdown (e.g., "reproductive")
3. Select content type (All, Articles, Videos, Resources)
4. Select language (English or Kinyarwanda)
5. Click on content to view
6. Use buttons: Listen, Print, or Open link

**New Content:**
- Articles with full text and TTS
- Videos embedded from YouTube with captions
- External resources with verification

### 4. Cycle Tracker Improvements

**New Features:**
- Health tips based on cycle phase
- Automatic notification generation
- Phase predictions (menstrual, follicular, ovulation, luteal)
- Personalized advice for each phase

**How to use:**
1. Go to "Cycle Tracker" (women only)
2. Select "Last period started" date
3. Set "Cycle length" (default 28, typical 21-35)
4. Click "Calculate"
5. View predictions and health tips
6. Get automatic reminders

**What happens automatically:**
- System calculates next period date
- Predicts ovulation date
- Defines fertile window
- Creates 3 cycle reminders
- Generates phase-specific health tips

### 5. Smart Recommendations

**How it works:**
- When you view education content, related items are suggested
- Recommendations appear in purple box at top
- Recommendations are personalized by category
- Shown alongside your current content

**Try it:**
1. Go to Learn section
2. Select "reproductive" category
3. Look for "Recommended for You" section
4. Should show 2 related articles/videos
5. Switch category to see different recommendations

---

## API Overview

All APIs return JSON and require authentication token.

### Key Endpoints

**Notifications:**
```
GET /api/notifications                    # Get all notifications
GET /api/notifications/unread             # Get unread only
GET /api/notifications/count              # Get unread count
PUT /api/notifications/:id/read           # Mark as read
DELETE /api/notifications/:id             # Delete notification
```

**Education:**
```
GET /api/education/categories             # Get all categories
GET /api/education/category/:cat          # Get content by category
```

**Cycle Tracker:**
```
POST /api/cycle-tracker/update            # Save cycle data
GET /api/cycle-tracker                    # Get current tracker
```

See `API_REFERENCE.md` for complete documentation.

---

## File Structure (New/Modified Files)

### Backend Files Added
```
backend/
  ├─ models/
  │  ├─ Notification.js         (NEW)
  │  └─ CycleNotification.js     (NEW)
  ├─ controllers/
  │  └─ notificationController.js (NEW)
  ├─ routes/
  │  └─ notification.js          (NEW)
  └─ server.js                   (MODIFIED - added routes)
```

### Frontend Files Added
```
frontend/src/
  ├─ components/
  │  ├─ NotificationCenter.js    (NEW)
  │  ├─ EducationEnhanced.js     (NEW)
  │  └─ CycleTrackerEnhanced.js  (NEW)
  ├─ utils/
  │  └─ accessibility.js         (NEW)
  └─ App.js                      (MODIFIED - integrated components)
```

---

## Database Models

### Notification
```javascript
{
  userId: ObjectId,
  title: String,
  message: String,
  type: String,           // 'cycle', 'health-tip', 'reminder', etc
  icon: String,
  read: Boolean,
  relatedData: Object,    // Contains healthTips array
  createdAt: Date
}
```

### CycleNotification
```javascript
{
  userId: ObjectId,
  cycleTrackerId: ObjectId,
  notificationType: String, // '7_days_before', 'period_2days', 'ovulation'
  scheduledDate: Date,
  sent: Boolean,
  title: String,
  message: String,
  healthTips: [String],
  createdAt: Date
}
```

---

## Testing the Features

### Quick Test Checklist

**Test 1: Notification System (5 min)**
- [ ] Login and see bell icon in top right
- [ ] Unread count shows (if any)
- [ ] Click bell to open panel
- [ ] Click notification to mark read
- [ ] Click delete (X) button
- [ ] Click "Mark all as read"

**Test 2: Education (5 min)**
- [ ] Go to Learn section
- [ ] See categories dropdown
- [ ] Select different categories
- [ ] Select different types (article, video, resource)
- [ ] Change language to Kinyarwanda
- [ ] See recommended content appear
- [ ] Click "Listen" on article (should play TTS)
- [ ] Click "Print" (should open print dialog)

**Test 3: Cycle Tracker (5 min)**
- [ ] Go to Cycle Tracker (women only)
- [ ] Enter date from 28 days ago
- [ ] Click Calculate
- [ ] See next period date
- [ ] See ovulation date
- [ ] See fertile window dates
- [ ] See current phase info
- [ ] See health tips
- [ ] Check notifications - should have 3 new ones

**Test 4: Accessibility (5 min)**
- [ ] Go to Learn section
- [ ] Find an article
- [ ] Click "Listen" button
- [ ] Audio should play
- [ ] Click "Stop" button
- [ ] Audio should stop
- [ ] Try TTS in different language
- [ ] Watch a video and verify captions

### Complete Test Takes ~30 minutes

---

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is available
netstat -ano | findstr :5000

# Check MongoDB connection
# Verify MONGODB_URI in .env is correct

# Check environment variables loaded
# Verify .env file exists and is readable

# Check Node version
node --version  # Should be 14+
```

### Frontend Won't Start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install

# Check if port 3001 is available
netstat -ano | findstr :3001

# Check .env file
# Verify REACT_APP_API_URL is correct
```

### Notifications Not Showing
```bash
# Check backend is running on :5000
curl http://localhost:5000/api/health

# Check MongoDB has data
# Run in MongoDB shell:
db.notifications.find()

# Check browser console for errors
# Open DevTools (F12) → Console tab
```

### TTS Not Working
```bash
# Check browser supports Web Speech API
# Open browser console:
typeof window.speechSynthesis  // Should be 'object'

# Check if microphone/audio working
# Try test: window.speechSynthesis.speak(new SpeechSynthesisUtterance('hello'))

# Try different browser (Chrome > Firefox > Safari)
```

### API Returns 401 Unauthorized
```bash
# Token not sent in header
# Check localStorage has 'token' key
localStorage.getItem('token')  // Should return JWT

# Token might be expired
# Try logging out and back in

# Check Authorization header format
# Should be: Authorization: Bearer <token>
```

---

## Performance Tips

1. **Faster notifications:**
   - Use GET /notifications/count (lightweight)
   - Not GET /notifications (full list)

2. **Faster education load:**
   - Videos lazy-load from YouTube
   - Recommendations cached in state

3. **Faster cycle calculations:**
   - Done server-side once
   - Results cached in frontend state

4. **Mobile optimization:**
   - Use 4G/5G when possible
   - Reduce video quality if slow
   - Disable auto-refresh if battery low

---

## Documentation Files

Created comprehensive docs:

1. **ADVANCED_FEATURES_GUIDE.md** - Complete feature documentation
2. **API_REFERENCE.md** - API endpoints and examples
3. **TESTING_AND_DEPLOYMENT.md** - Testing guide and deployment checklist
4. **QUICK_START_GUIDE.md** (this file) - Quick reference

---

## Support

### For Issues
1. Check console (F12)
2. Check network tab (API calls)
3. Check server logs
4. Verify all files created
5. Verify .env files correct
6. Try restarting both servers

### For Questions
- Review ADVANCED_FEATURES_GUIDE.md
- Check API_REFERENCE.md for endpoints
- Look at component comments in code
- Check database logs

---

## Next Steps

1. **Immediate:**
   - Start backend: `npm start` in backend folder
   - Start frontend: `npm start` in frontend folder
   - Test all features using checklist above

2. **Next:**
   - Review ADVANCED_FEATURES_GUIDE.md for deep understanding
   - Check TESTING_AND_DEPLOYMENT.md before deploying
   - Read API_REFERENCE.md if integrating with other systems

3. **Before Deployment:**
   - Run all tests in TESTING_AND_DEPLOYMENT.md
   - Update environment variables for production
   - Verify all API endpoints
   - Test on mobile devices

4. **After Deployment:**
   - Monitor error logs
   - Check notification delivery
   - Verify API response times
   - Test in production environment

---

## Feature Comparison

| Feature | Before v1.0 | v1.0 | v2.0 |
|---------|:----------:|:-----:|:-----:|
| Notifications | ❌ | ❌ | ✅ |
| Text-to-Speech | ❌ | ❌ | ✅ |
| Video Content | ❌ | ❌ | ✅ |
| Smart Recommendations | ❌ | ❌ | ✅ |
| Health Tips | ❌ | Basic | Enhanced |
| Cycle Predictions | ❌ | Basic | Advanced |
| Multi-language | ❌ | Basic | Full |

---

**Version:** 2.0
**Date:** January 2024
**Status:** Production Ready
**Last Updated:** January 2024

---

## Quick Links

- **Start Backend:** `cd d:\YouthCare\backend && npm start`
- **Start Frontend:** `cd d:\YouthCare\frontend && npm start`
- **API Docs:** See `API_REFERENCE.md`
- **Features Guide:** See `ADVANCED_FEATURES_GUIDE.md`
- **Testing:** See `TESTING_AND_DEPLOYMENT.md`

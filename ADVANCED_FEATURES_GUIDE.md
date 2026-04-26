# YouthCare+ Advanced Features Implementation Guide

## Overview

This document describes the advanced features implemented in YouthCare+ v2.0, including a real notification system, accessibility features, smart content recommendations, and enhanced education/cycle tracking.

## 1. Notification System

### Architecture

The notification system consists of three layers:

**Backend (Node.js/Express):**
- `Notification` model: Stores in-app notifications
- `CycleNotification` model: Manages cycle-specific notification scheduling
- `notificationController`: Handles CRUD operations and recommendation logic
- `/api/notifications` routes: 7 endpoints for notification management

**Frontend (React):**
- `NotificationCenter` component: Sidebar panel UI for viewing notifications
- App.js integration: Bell icon in navbar with unread badge
- Auto-polling: Updates notification count every 30 seconds

### Database Schema

#### Notification Model
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  message: String,
  type: String (enum: ['cycle', 'health-tip', 'reminder', 'alert', 'recommendation']),
  icon: String,
  read: Boolean (default: false),
  actionUrl: String,
  contentId: ObjectId (ref: Education),
  relatedData: {
    healthTips: [String],
    cyclePhase: String,
    // ... flexible for future extensions
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### CycleNotification Model
```javascript
{
  userId: ObjectId (ref: User),
  cycleTrackerId: ObjectId (ref: CycleTracker),
  notificationType: String (enum: ['7_days_before', 'period_2days', 'ovulation']),
  scheduledDate: Date,
  sent: Boolean,
  sentDate: Date,
  title: String,
  message: String,
  healthTips: [String],
  createdAt: Date
}
```

### API Endpoints

All endpoints require authentication via JWT token in Authorization header.

**GET /api/notifications**
- Fetches paginated notifications (default limit: 20)
- Query params: `limit`, `skip`
- Returns: `{ success, notifications: [], total, count }`

**GET /api/notifications/unread**
- Fetches unread notifications only
- Returns: Sorted by newest first, max 50 items
- Returns: `{ success, notifications: [], count }`

**GET /api/notifications/count**
- Returns unread notification count
- Returns: `{ success, count: Number }`

**GET /api/notifications/recommendations?category=X&limit=N**
- Returns recommended content for given category
- Returns: `{ success, recommendations: [] }`

**PUT /api/notifications/:notificationId/read**
- Marks single notification as read
- Returns: `{ success, notification: {} }`

**PUT /api/notifications/mark-all/read**
- Marks all unread notifications as read
- Returns: `{ success, count: Number }`

**DELETE /api/notifications/:notificationId**
- Deletes a notification
- Returns: `{ success }`

### Usage Flow

1. **User logs in** → App fetches unread notification count
2. **User clicks bell icon** → NotificationCenter panel opens
3. **Panel loads** → Fetches all notifications via GET /api/notifications
4. **User clicks notification** → Marks as read via PUT /:id/read
5. **User clicks delete** → Removes notification via DELETE /:id
6. **Every 30 seconds** → App polls for new unread count

### Automatic Cycle Notifications

When user updates cycle tracker:
1. Backend calculates notification schedule (7 days before, 2 days before, ovulation)
2. Creates 3 `CycleNotification` documents
3. Creates 3 `Notification` documents with health tips
4. Frontend displays these in notification center

## 2. Accessibility Features

### Text-to-Speech Integration

**File:** `src/utils/accessibility.js`

```javascript
// Functions exported:
- speakText(text, language) // 'en' or 'rw'
- stopSpeech()
- sendBrowserNotification(title, options)
- requestNotificationPermission()
- getNotificationPermissionStatus()
```

**Usage in EducationEnhanced:**
```javascript
<button onClick={() => handleTextToSpeech(article.content)}>
  {isSpeaking ? "⏹ Stop" : "🔊 Listen (Text-to-Speech)"}
</button>
```

### Features Implemented

1. **Text-to-Speech**
   - Web Speech API with 0.9 speech rate for clarity
   - Supports English and Kinyarwanda
   - Play/Stop toggle button on articles

2. **Video Captions**
   - YouTube embeds with `cc_load_policy=1`
   - Captions enabled by default

3. **Browser Notifications**
   - Notification API with permission request
   - Used for cycle reminders and health tips
   - Graceful fallback if not supported

4. **Large Text Support**
   - Instructions provided: Ctrl + Plus to zoom
   - CSS uses rem units for scalability

5. **Simple Language**
   - All content written in plain, clear language
   - Medical terms explained
   - Short sentences and bullet points

## 3. Enhanced Education Component

### Features

**EducationEnhanced.js** provides:

1. **Multi-Type Content Support**
   - Articles: Full text with TTS
   - Videos: YouTube embedded with captions
   - Resources: External links with verification

2. **Smart Filtering**
   - By Category (reproductive, mental, youth, nutrition, safety)
   - By Type (article, video, resource)
   - By Language (English, Kinyarwanda)

3. **Recommendations**
   - Shows 2 recommended items per category
   - Fetched from `/api/notifications/recommendations`
   - Displayed in purple gradient box

4. **Source Verification**
   - Shows trusted source (WHO, UNICEF, RBC)
   - Green verification badge
   - Captions enabled for videos

5. **Content Interaction**
   - Print button for articles
   - "Listen" button for text-to-speech
   - External link button for resources
   - Video full-screen support

### UI Layout

```
┌─────────────────────────────────┐
│ Filters (Language, Type, Category) │
├─────────────────────────────────┤
│ Recommended Content (2 items)    │
├─────────────────────────────────┤
│ Content Grid                     │
│  ├─ Article Card                 │
│  │  ├─ Icon + Title + Badges     │
│  │  ├─ Description               │
│  │  ├─ Content Display           │
│  │  └─ Buttons (TTS, Print, etc) │
│  └─ Video Card                   │
│     ├─ YouTube Embed             │
│     └─ Metadata                  │
├─────────────────────────────────┤
│ Accessibility Info               │
└─────────────────────────────────┘
```

## 4. Enhanced Cycle Tracker

### Features

**CycleTrackerEnhanced.js** provides:

1. **Data Input**
   - Last period date picker
   - Cycle length input (21-35 days)
   - Save to backend via POST /cycle-tracker/update

2. **Predictions**
   - Next period date
   - Ovulation date
   - Fertile window (5 days before to 1 day after ovulation)

3. **Cycle Phase Information**
   - 4 phases: Menstrual, Follicular, Ovulation, Luteal
   - Each with emoji, duration, and advice
   - Color-coded cards

4. **Health Tips**
   - Phase-specific nutrition advice
   - Self-care recommendations
   - Supplement suggestions

5. **Automated Notifications**
   - Reminders 7 days before period
   - Reminders 2 days before period
   - Ovulation day notification
   - Auto-generated health tips per phase

6. **Visual Timeline**
   - Current phase highlighted
   - All 4 phases shown for reference
   - Interactive phase cards with hover effects

### Phase Breakdown

**Menstrual Phase (Days 1-5):**
- Low energy
- Hydration and iron-rich foods recommended
- Rest and self-care

**Follicular Phase (Days 1-13):**
- Rising energy and mood
- Good for workouts and new projects
- Increased confidence

**Ovulation Phase (Days 12-16):**
- Peak energy and fertility
- Most fertile 5 days before to 1 day after
- Clear thinking and social energy

**Luteal Phase (Days 17-28):**
- Mood may shift
- Self-care important
- Magnesium and Omega-3 supplements help

## 5. Smart Recommendations Engine

### How It Works

1. **User interacts with features:**
   - Views education content
   - Updates cycle tracker
   - Uses AI chat
   - Logs mood in wellbeing section

2. **System triggers recommendations:**
   - Based on category viewed
   - Based on cycle phase
   - Based on mood selected
   - Based on chat keywords

3. **Content recommended:**
   - Relevant articles
   - Related videos
   - Useful resources
   - Health tips

4. **Delivery:**
   - Shown in education section
   - Added to notifications
   - Included in health tips
   - Pushed as reminders

### Recommendation Logic

```javascript
// In notificationController.js
async getRecommendedContent(category, limit = 5) {
  // Search Education collection for:
  // - Matching category
  // - Verified source
  // - Highest relevance score
  // Return top N items
}
```

## 6. Backend Cycle Notification Generation

### Auto-Notification Process

When user calls `POST /api/cycle-tracker/update`:

```javascript
1. Calculate predictions:
   - nextPeriod = lastPeriod + cycleLength
   - ovulation = nextPeriod - 14 days
   - fertilityWindow = ovulation ± 5-1 days

2. Generate health tips:
   - Get phase-specific advice
   - Map ovulation_approaching → ovulation health tips
   - Map period_7days → before period health tips
   - Map period_2days → period health tips

3. Create notifications:
   - 3x CycleNotification documents
   - 3x Notification documents
   - Each with title, message, and health tips
   - Schedule for 7 days, 2 days, ovulation day

4. Return to frontend:
   - Predictions object with dates and phase
   - Health tips array
   - Associated notification IDs
```

## 7. Integration Points

### In App.js

1. **Header Integration:**
   - Bell icon added to navbar
   - Unread count badge displayed
   - Click handler toggles NotificationCenter panel

2. **Route Integration:**
   - Education section → EducationEnhanced
   - Cycle tracker section → CycleTrackerEnhanced
   - All sections inherit API_URL from App

3. **Data Flow:**
   - API_URL passed as prop to all components
   - Auth token from localStorage
   - Auto-polling for notification updates

### In Server.js

```javascript
// Added notification routes
const notificationRoutes = require("./routes/notification");
app.use("/api/notifications", notificationRoutes);
```

### In CycleTrackerController

```javascript
// Enhanced with notification generation
- createCycleNotifications() function
- Auto-called after cycle tracker creation/update
- Generates 3 notifications per update
```

## 8. Error Handling

### Frontend Error States

- Loading spinners during data fetch
- Error messages in red for failures
- Empty state messages when no data
- Permission request handling for notifications

### Backend Error Handling

- 401 for unauthorized access
- 400 for invalid input
- 500 for server errors
- Validation of cycle length (21-35 days)
- Authorization checks on all endpoints

## 9. Performance Optimizations

1. **Notification Polling:**
   - 30-second intervals (not per-second)
   - Only counts unread, not full fetch
   - Cached in localStorage when possible

2. **Component Lazy Loading:**
   - NotificationCenter only fetches when opened
   - EducationEnhanced caches category data
   - CycleTrackerEnhanced caches predictions

3. **Database Indexes:**
   - Index on userId + read for unread queries
   - Index on cycleTrackerId for cycle notifications
   - TTL index on old notifications (90 days)

## 10. Security Considerations

1. **Authentication:**
   - All notification endpoints require JWT
   - User can only see own notifications
   - Authorization checks on delete/update

2. **Data Privacy:**
   - Cycle data encrypted in transit (HTTPS)
   - Notifications contain no sensitive data
   - Health tips are generic and educational

3. **Content Safety:**
   - All education content reviewed
   - External resources verified
   - No ads or tracking in embedded videos

## 11. Mobile Responsiveness

- NotificationCenter: Fixed width (w-96) on desktop, full width on mobile
- EducationEnhanced: Grid adapts to 1 or 2 columns
- CycleTrackerEnhanced: Stack on mobile, grid on desktop
- Bell icon: Always accessible on header
- Touch-friendly buttons and spacing

## 12. Future Enhancements

1. **Email Notifications** (Optional)
   - Send email reminders for important dates
   - Weekly digest of health tips
   - Uses nodemailer + SMTP

2. **SMS Notifications** (via USSD)
   - Text message reminders
   - For users without smartphones
   - Integrate with Rwanda telecom

3. **Wearable Integration**
   - Sync with fitness trackers
   - Heart rate variability tracking
   - Smartwatch notifications

4. **AI-Powered Recommendations**
   - ML model based on user interaction
   - Personalized health tips
   - Predictive alerts

5. **Social Features**
   - Share health tips with friends
   - Support community groups
   - Peer-to-peer advice

6. **Offline Support**
   - Service worker for offline access
   - Cached content and notifications
   - Sync when back online

## 13. Testing Guide

### Unit Tests (Recommended)

```javascript
// notificationController.js
- getUnreadNotifications returns only unread items
- markAsRead updates notification correctly
- deleteNotification removes from DB
- getRecommendedContent filters by category

// EducationEnhanced.js
- Filters content by category
- Filters content by type
- Language selection works
- TTS button toggles speech
```

### Integration Tests

```javascript
// Full flow test
1. Create cycle tracker
2. Verify 3 notifications created
3. Fetch notifications
4. Mark as read
5. Verify count updated
6. Delete notification
7. Verify removed
```

### Manual Testing Checklist

- [ ] Bell icon visible in navbar
- [ ] Unread count badge shows correct number
- [ ] NotificationCenter opens/closes smoothly
- [ ] Notifications load and display correctly
- [ ] Mark as read works
- [ ] Mark all as read works
- [ ] Delete notification works
- [ ] Health tips display in notifications
- [ ] Education filters work
- [ ] TTS plays audio for articles
- [ ] Videos embed and play
- [ ] Recommendations show related content
- [ ] Cycle tracker calculates correctly
- [ ] Cycle tracker creates notifications
- [ ] Health tips display after calculation
- [ ] Mobile layout responsive
- [ ] All features work on mobile

## 14. Deployment Notes

### Environment Variables

Backend .env needs:
```
MONGODB_URI=mongodb+srv://...
PORT=5000
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
```

Frontend .env needs:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Database Seeding

Run after deployment:
```bash
cd backend
npm run seed
```

This creates 13 education items across 5 categories.

### Monitoring

- Monitor `/api/notifications` response times
- Track notification delivery success rate
- Log errors in notification generation
- Monitor database size growth

## 15. Contact & Support

For questions about these features:
- Check backend README.md
- Review frontend component comments
- Check database schema documentation
- Contact development team

---

**Last Updated:** [Current Date]
**Version:** 2.0
**Status:** Production Ready

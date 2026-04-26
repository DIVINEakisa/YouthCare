# YouthCare+ v2.0 - Testing & Deployment Guide

## Pre-Deployment Checklist

### Backend Setup
- [ ] MongoDB connection verified
- [ ] All environment variables in .env file
- [ ] Notification models created in database
- [ ] Notification controller working
- [ ] Notification routes mounted in server.js
- [ ] Auth middleware on all endpoints
- [ ] Cycle tracker auto-generates notifications

### Frontend Setup
- [ ] All new components created:
  - [ ] NotificationCenter.js
  - [ ] EducationEnhanced.js
  - [ ] CycleTrackerEnhanced.js
  - [ ] accessibility.js utility
- [ ] App.js updated with imports and integrations
- [ ] API_URL correctly configured
- [ ] No console errors in browser
- [ ] Responsive design tested on mobile

### Database
- [ ] Notification collection exists
- [ ] CycleNotification collection exists
- [ ] Indexes created for performance
- [ ] Education seed data loaded (13 items)
- [ ] User test accounts created

---

## Testing Plan

### 1. Unit Tests (Backend)

#### notificationController.js Tests

```javascript
describe('notificationController', () => {
  let testUser, testNotification;

  before(async () => {
    // Create test user
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      gender: 'Female'
    });
  });

  it('should get unread notifications', async () => {
    // Create notification
    testNotification = await Notification.create({
      userId: testUser._id,
      title: 'Test',
      message: 'Test message',
      type: 'cycle',
      read: false
    });

    // Fetch unread
    const result = await notificationController.getUnreadNotifications(testUser._id);
    
    expect(result).to.have.length(1);
    expect(result[0].read).to.equal(false);
  });

  it('should mark notification as read', async () => {
    const result = await notificationController.markAsRead(
      testNotification._id,
      testUser._id
    );
    
    expect(result.read).to.equal(true);
  });

  it('should get recommendation by category', async () => {
    // Seed education content first
    const result = await notificationController.getRecommendedContent(
      'reproductive',
      2
    );
    
    expect(result).to.have.length.greaterThan(0);
    expect(result[0].category).to.equal('reproductive');
  });
});
```

#### cycleTrackerController.js Tests

```javascript
describe('cycleTrackerController', () => {
  let testUser;

  before(async () => {
    testUser = await User.create({...});
  });

  it('should calculate cycle predictions correctly', async () => {
    const lastPeriod = new Date('2024-01-10');
    const cycleLength = 28;

    const result = cycleTrackerController.calculateCyclePredictions(
      lastPeriod,
      cycleLength
    );

    expect(result.nextPeriod).to.equal(new Date('2024-02-07'));
    expect(result.ovulation).to.equal(new Date('2024-01-24'));
  });

  it('should create cycle notifications', async () => {
    const tracker = await cycleTrackerController.updateCycleTracker(
      testUser._id,
      '2024-01-10',
      28
    );

    // Verify 3 CycleNotifications created
    const cycleNotifs = await CycleNotification.find({
      cycleTrackerId: tracker._id
    });
    expect(cycleNotifs).to.have.length(3);

    // Verify 3 Notifications created
    const notifs = await Notification.find({
      userId: testUser._id
    });
    expect(notifs.length).to.be.greaterThanOrEqual(3);
  });
});
```

### 2. Integration Tests (Frontend)

#### NotificationCenter Component

```javascript
describe('NotificationCenter Component', () => {
  it('should render notification panel when open', () => {
    const { getByText } = render(
      <NotificationCenter
        isOpen={true}
        onClose={jest.fn()}
        API_URL="http://localhost:5000/api"
      />
    );
    
    expect(getByText('Notifications')).toBeInTheDocument();
  });

  it('should fetch notifications on open', async () => {
    const mockFetch = jest.spyOn(global, 'fetch');
    
    render(
      <NotificationCenter
        isOpen={true}
        onClose={jest.fn()}
        API_URL="http://localhost:5000/api"
      />
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/notifications',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer ' + localStorage.getItem('token')
          })
        })
      );
    });
  });

  it('should mark notification as read when clicked', async () => {
    const { getByText, getByRole } = render(
      <NotificationCenter
        isOpen={true}
        onClose={jest.fn()}
        API_URL="http://localhost:5000/api"
      />
    );

    // Mock notification item
    const notifItem = getByText('Test Notification');
    fireEvent.click(notifItem);

    await waitFor(() => {
      expect(notifItem).toHaveClass('bg-gray-50');
    });
  });
});
```

#### EducationEnhanced Component

```javascript
describe('EducationEnhanced Component', () => {
  it('should load categories on mount', async () => {
    const { getByText } = render(
      <EducationEnhanced API_URL="http://localhost:5000/api" />
    );

    await waitFor(() => {
      expect(getByText('reproductive')).toBeInTheDocument();
    });
  });

  it('should filter content by category', async () => {
    const { getByDisplayValue } = render(
      <EducationEnhanced API_URL="http://localhost:5000/api" />
    );

    const categorySelect = getByDisplayValue('reproductive');
    fireEvent.change(categorySelect, { target: { value: 'mental' } });

    await waitFor(() => {
      expect(categorySelect).toHaveValue('mental');
    });
  });

  it('should render video embeds for video type content', async () => {
    const { getByTitle } = render(
      <EducationEnhanced API_URL="http://localhost:5000/api" />
    );

    // Look for iframe element
    const iframe = getByTitle(/video/i);
    expect(iframe).toBeInTheDocument();
  });

  it('should trigger text-to-speech when listen button clicked', async () => {
    const { getByText } = render(
      <EducationEnhanced API_URL="http://localhost:5000/api" />
    );

    const listenButton = getByText('Listen');
    fireEvent.click(listenButton);

    // Should start speech
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
```

### 3. End-to-End Tests (Manual)

#### Test 1: Complete Notification Flow

**Steps:**
1. Log in as female user
2. Navigate to Cycle Tracker
3. Enter last period date (10 days ago)
4. Click Calculate
5. Verify notifications created
6. Check notification bell for count
7. Click bell to open notification panel
8. Click notification to mark as read
9. Verify unread count decreased
10. Click "Mark all as read"
11. Verify count is 0
12. Delete a notification
13. Verify notification removed

**Expected Results:**
- All steps complete without errors
- Unread count updates correctly
- Notifications display properly
- Health tips show in notifications

#### Test 2: Education Content with TTS

**Steps:**
1. Go to Education section
2. Select "reproductive" category
3. Verify articles load
4. Click on an article
5. Look for "Listen" button
6. Click "Listen"
7. Audio should play
8. Click "Stop"
9. Audio should stop
10. Try another language (Kinyarwanda)

**Expected Results:**
- Content loads properly
- Audio plays clearly
- Language selection works
- No console errors

#### Test 3: Cycle Tracker with Predictions

**Steps:**
1. Navigate to Cycle Tracker (Female only)
2. Enter last period: 28 days ago
3. Set cycle length: 28
4. Click Calculate
5. Verify:
   - Next period date shows
   - Ovulation date shows
   - Fertile window shows
   - Current phase displays
   - Health tips appear
   - Reminder cards appear

**Expected Results:**
- All calculations correct
- Proper formatting of dates
- Phase information displays
- Tips are relevant to phase

#### Test 4: Mobile Responsiveness

**Steps:**
1. Open app on mobile (375px width)
2. Click notification bell
3. Notification panel should:
   - Be full width
   - Be scrollable
   - Have readable text
4. Check Education section:
   - Filters should stack
   - Cards should be single column
5. Check Cycle Tracker:
   - Input fields responsive
   - Cards should be single column

**Expected Results:**
- No horizontal scroll
- Text readable
- All buttons clickable
- No layout issues

#### Test 5: Offline Functionality

**Steps:**
1. Open app and log in
2. Go to Education section
3. Fetch some content
4. Turn off internet (DevTools > Offline)
5. Try to fetch new notifications
6. Try to open NotificationCenter
7. Try to mark notification as read
8. Turn internet back on
9. Verify functionality restored

**Expected Results:**
- Cached content still visible
- Error messages shown for network requests
- No crashes
- Functionality restores when online

### 4. Performance Tests

#### API Response Times

```bash
# Test notification count endpoint
ab -n 100 -c 10 \
  -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/notifications/count

# Should complete in < 100ms average
```

#### Frontend Performance

```javascript
// In browser console
// Test notification panel load time
performance.mark('panel-open');
clickElement('[data-testid="notification-bell"]');
// ... wait for content load ...
performance.mark('panel-loaded');
performance.measure('panel', 'panel-open', 'panel-loaded');
console.log(performance.getEntriesByName('panel')[0].duration);

// Should be < 500ms
```

#### Database Query Performance

```javascript
// In MongoDB
db.notifications.find({ userId: ObjectId(...), read: false }).explain("executionStats")

// Should use index, < 50 documents scanned
```

---

## Deployment Checklist

### Pre-Production

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] All e2e tests passing
- [ ] No console errors or warnings
- [ ] Performance tests passing
- [ ] Security review completed
- [ ] Code review completed
- [ ] Documentation updated

### Database Migration

```bash
# Backup production database
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/youthcare"

# Create indexes
db.notifications.createIndex({ userId: 1, read: 1 })
db.notifications.createIndex({ createdAt: -1 })
db.cyclenotifications.createIndex({ userId: 1 })

# Load seed data
cd backend && npm run seed
```

### Frontend Deployment

```bash
# Build for production
cd frontend
npm run build

# Output in build/ folder ready for deployment
# Deploy to hosting (Vercel, Netlify, Render, etc.)
```

### Backend Deployment

```bash
# Update environment variables in production
# .env file needs:
# - MONGODB_URI (production DB)
# - PORT (usually 5000)
# - JWT_SECRET (production key)
# - OPENAI_API_KEY (for chat)

# Deploy backend
# Using Render, Heroku, Railway, etc.
```

### Environment Variables Checklist

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/youthcare
PORT=5000
JWT_SECRET=your-secret-key-here-minimum-32-chars
OPENAI_API_KEY=sk-your-openai-key
NODE_ENV=production
CORS_ORIGIN=https://youthcare.vercel.app
```

**Frontend (.env):**
```
REACT_APP_API_URL=https://api.youthcare.onrender.com/api
REACT_APP_ENV=production
```

### Post-Deployment Verification

```bash
# Test API endpoints
curl https://api.youthcare.onrender.com/api/health

# Test authentication
curl https://api.youthcare.onrender.com/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test notifications
curl https://api.youthcare.onrender.com/api/notifications/count \
  -H "Authorization: Bearer TOKEN"

# Test education
curl https://api.youthcare.onrender.com/api/education/categories \
  -H "Authorization: Bearer TOKEN"
```

### Monitoring & Alerts

Set up monitoring for:
- [ ] API response times (> 1000ms alerts)
- [ ] Error rate (> 1% alerts)
- [ ] Database connectivity
- [ ] Notification delivery success rate
- [ ] User authentication failures
- [ ] Unhandled exceptions

---

## Rollback Plan

If issues occur in production:

1. **Minor bugs (UI/styling):**
   - Quick frontend hotfix and redeploy
   - No database changes needed

2. **API issues (response errors):**
   - Check backend logs
   - Verify database connectivity
   - Check environment variables
   - Rollback to previous version if necessary

3. **Database issues:**
   - Restore from backup (date/time)
   - Verify data integrity
   - Run integrity checks

4. **Complete rollback:**
   ```bash
   # Revert to previous production version
   git checkout [previous-tag]
   npm install
   npm run build
   # Redeploy to production
   ```

---

## Monitoring Queries

### Check notification creation rate
```javascript
db.notifications.aggregate([
  { $group: { _id: null, count: { $sum: 1 } } }
])
```

### Check unread notification counts
```javascript
db.notifications.aggregate([
  { $match: { read: false } },
  { $group: { _id: "$userId", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

### Check API endpoint usage
```javascript
// In application logging
// Track GET /notifications, POST /cycle-tracker/update, etc.
```

---

## Support & Troubleshooting

### Common Issues

**Issue: Notifications not showing**
- Check MongoDB connection
- Verify notification routes mounted
- Check auth middleware
- Look for console errors

**Issue: TTS not working**
- Check browser support
- Verify permission granted
- Check language selection
- Look for audioContext errors

**Issue: Cycle predictions wrong**
- Verify date format (YYYY-MM-DD)
- Check cycle length (21-35)
- Verify timezone settings
- Check database for saved tracker

**Issue: Performance slow**
- Check database indexes
- Verify API response times
- Check frontend bundle size
- Look for N+1 queries

---

## Version History

**v2.0 (Current)**
- Notification system
- Enhanced education
- Accessibility features
- Cycle tracker improvements
- Smart recommendations

**v1.0 (Previous)**
- Basic authentication
- Chat functionality
- Clinic finder
- Education content
- Cycle tracker basics

---

**Last Updated:** January 2024
**Status:** Ready for Deployment
**Approval:** Required before production push

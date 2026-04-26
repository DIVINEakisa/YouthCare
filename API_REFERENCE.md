# YouthCare+ API Reference - Notification & Education Endpoints

## Quick Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/notifications` | ✅ | Fetch paginated notifications |
| GET | `/api/notifications/unread` | ✅ | Fetch unread notifications only |
| GET | `/api/notifications/count` | ✅ | Get unread count |
| GET | `/api/notifications/recommendations` | ✅ | Get recommended content |
| PUT | `/api/notifications/:id/read` | ✅ | Mark notification as read |
| PUT | `/api/notifications/mark-all/read` | ✅ | Mark all as read |
| DELETE | `/api/notifications/:id` | ✅ | Delete notification |
| GET | `/api/education/categories` | ✅ | Get all categories |
| GET | `/api/education/category/:category` | ✅ | Get content by category |
| POST | `/api/cycle-tracker/update` | ✅ | Save cycle data & get predictions |
| GET | `/api/cycle-tracker` | ✅ | Get current cycle tracker |
| POST | `/api/chat/send` | ✅ | Send message to AI chat |

## Detailed Endpoint Documentation

### NOTIFICATIONS ENDPOINTS

#### GET /api/notifications
**Purpose:** Fetch paginated list of all notifications for user

**Query Parameters:**
```
limit: number (default: 20)
skip: number (default: 0)
```

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Response (Success 200):**
```json
{
  "success": true,
  "notifications": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "title": "Period Reminder",
      "message": "Your period is expected in 2 days",
      "type": "cycle",
      "icon": "📅",
      "read": false,
      "actionUrl": "/dashboard/cycle",
      "contentId": null,
      "relatedData": {
        "healthTips": [
          "Stay hydrated",
          "Get enough rest"
        ]
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 15,
  "count": 10
}
```

**Example Request:**
```bash
curl -X GET "http://localhost:5000/api/notifications?limit=10&skip=0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

#### GET /api/notifications/unread
**Purpose:** Fetch only unread notifications (max 50, sorted by newest first)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "notifications": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Health Tip",
      "message": "Remember to drink water",
      "type": "health-tip",
      "icon": "💧",
      "read": false,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "count": 3
}
```

---

#### GET /api/notifications/count
**Purpose:** Get count of unread notifications (lightweight endpoint)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "count": 3
}
```

**Use Case:** 
Frontend polls this every 30 seconds to update the bell icon badge count without loading full notifications list.

---

#### GET /api/notifications/recommendations?category=reproductive&limit=2
**Purpose:** Get recommended educational content for a specific category

**Query Parameters:**
```
category: string (required) - 'reproductive', 'mental', 'youth', 'nutrition', 'safety'
limit: number (default: 5) - max items to return
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "recommendations": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Understanding Menstruation",
      "type": "article",
      "source": "WHO",
      "icon": "📄",
      "description": "A comprehensive guide to menstrual health"
    },
    {
      "_id": "507f1f77bcf86cd799439021",
      "title": "Nutrition During Your Cycle",
      "type": "video",
      "source": "UNICEF",
      "icon": "🎥",
      "description": "What to eat during different cycle phases"
    }
  ]
}
```

---

#### PUT /api/notifications/:notificationId/read
**Purpose:** Mark a single notification as read

**Parameters:**
```
notificationId: string (required) - MongoDB ObjectId of notification
```

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:** (empty)
```json
{}
```

**Response (Success 200):**
```json
{
  "success": true,
  "notification": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Period Reminder",
    "read": true,
    "updatedAt": "2024-01-15T10:05:00Z"
  }
}
```

**Example:**
```bash
curl -X PUT "http://localhost:5000/api/notifications/507f1f77bcf86cd799439011/read" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

#### PUT /api/notifications/mark-all/read
**Purpose:** Mark ALL unread notifications as read in one request

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{}
```

**Response (Success 200):**
```json
{
  "success": true,
  "count": 5
}
```

---

#### DELETE /api/notifications/:notificationId
**Purpose:** Delete a specific notification

**Parameters:**
```
notificationId: string (required) - MongoDB ObjectId
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success 200):**
```json
{
  "success": true
}
```

**Errors:**
- `401 Unauthorized` - Invalid token
- `404 Not Found` - Notification doesn't exist
- `403 Forbidden` - Trying to delete another user's notification

---

### EDUCATION ENDPOINTS

#### GET /api/education/categories
**Purpose:** Get list of all education content categories

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "categories": [
    "reproductive",
    "mental",
    "youth",
    "nutrition",
    "safety"
  ]
}
```

---

#### GET /api/education/category/:category?language=en
**Purpose:** Fetch all education content for a specific category

**Parameters:**
```
category: string (required) - 'reproductive', 'mental', 'youth', 'nutrition', 'safety'
```

**Query Parameters:**
```
language: string (optional, default: 'en') - 'en' or 'rw'
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "data": {
    "category": "reproductive",
    "articles": [
      {
        "_id": "507f1f77bcf86cd799439030",
        "title": "Menstrual Health 101",
        "type": "article",
        "icon": "📄",
        "description": "Understanding your menstrual cycle",
        "content": "The menstrual cycle is a monthly process...",
        "source": "WHO",
        "videoUrl": null,
        "language": "en"
      },
      {
        "_id": "507f1f77bcf86cd799439031",
        "title": "Nutrition During Menstruation",
        "type": "video",
        "icon": "🎥",
        "description": "What foods to eat",
        "source": "UNICEF",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "language": "en"
      },
      {
        "_id": "507f1f77bcf86cd799439032",
        "title": "Reproductive Health Resources",
        "type": "resource",
        "icon": "🔗",
        "description": "External links and resources",
        "source": "Rwanda Biomedical Center",
        "videoUrl": "https://example.com/resources",
        "language": "en"
      }
    ]
  }
}
```

---

### CYCLE TRACKER ENDPOINTS

#### POST /api/cycle-tracker/update
**Purpose:** Save cycle data and get predictions + auto-generate notifications

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "lastPeriodDate": "2024-01-10",
  "cycleLength": 28
}
```

**Response (Success 200):**
```json
{
  "success": true,
  "tracker": {
    "_id": "507f1f77bcf86cd799439040",
    "userId": "507f1f77bcf86cd799439001",
    "lastPeriodDate": "2024-01-10",
    "cycleLength": 28,
    "healthTips": [
      "Stay hydrated",
      "Get adequate sleep",
      "Eat iron-rich foods"
    ]
  },
  "predictions": {
    "nextPeriod": "2024-02-07",
    "ovulationDate": "2024-01-24",
    "fertilityWindow": {
      "start": "2024-01-19",
      "end": "2024-01-25"
    },
    "phase": "follicular"
  }
}
```

---

#### GET /api/cycle-tracker
**Purpose:** Fetch current cycle tracker and associated notifications

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "tracker": {
    "_id": "507f1f77bcf86cd799439040",
    "lastPeriodDate": "2024-01-10",
    "cycleLength": 28,
    "healthTips": [...]
  },
  "predictions": {
    "nextPeriod": "2024-02-07",
    "ovulationDate": "2024-01-24",
    "phase": "follicular"
  },
  "notifications": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "title": "Period Reminder",
      "message": "Your period is expected in 7 days",
      "healthTips": ["Stay hydrated"]
    }
  ]
}
```

---

## Testing with cURL

### Test 1: Get Unread Notification Count
```bash
curl -X GET "http://localhost:5000/api/notifications/count" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test 2: Get All Notifications
```bash
curl -X GET "http://localhost:5000/api/notifications?limit=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test 3: Mark Notification as Read
```bash
curl -X PUT "http://localhost:5000/api/notifications/NOTIFICATION_ID/read" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{}"
```

### Test 4: Mark All as Read
```bash
curl -X PUT "http://localhost:5000/api/notifications/mark-all/read" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{}"
```

### Test 5: Get Recommendations
```bash
curl -X GET "http://localhost:5000/api/notifications/recommendations?category=reproductive&limit=2" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test 6: Get Education Category
```bash
curl -X GET "http://localhost:5000/api/education/category/reproductive?language=en" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test 7: Update Cycle Tracker
```bash
curl -X POST "http://localhost:5000/api/cycle-tracker/update" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lastPeriodDate": "2024-01-10",
    "cycleLength": 28
  }'
```

## Error Codes

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Invalid or missing JWT token |
| 403 | Forbidden | User doesn't have permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected server error |

### Common Error Responses

```json
{
  "success": false,
  "error": "Notification not found"
}
```

```json
{
  "success": false,
  "error": "Invalid cycle length. Must be between 21 and 35"
}
```

---

## Response Time Targets

- `GET /notifications/count` → < 100ms (cached)
- `GET /notifications` → < 500ms (paginated)
- `PUT /notifications/:id/read` → < 200ms
- `GET /education/category/:cat` → < 300ms (cached)
- `POST /cycle-tracker/update` → < 1000ms (creates 6 docs)

---

## Rate Limiting

- Not currently implemented
- Recommended: 100 requests/minute per user
- Strict limit on email/SMS endpoints when added

---

## Webhooks (Future)

- `notification.created` - When new notification created
- `cycle.updated` - When cycle data updated
- `content.recommended` - When content recommended

---

**Last Updated:** January 2024
**Version:** 2.0 API
**Status:** Active

# YouthCare+ API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "name": "string (required)",
  "age": "number (required)",
  "gender": "Male | Female (required)",
  "email": "string (required, unique)",
  "password": "string (required)"
}
```

**Example:**

```json
{
  "name": "Jane Doe",
  "age": 20,
  "gender": "Female",
  "email": "jane@example.com",
  "password": "securepass123"
}
```

**Success Response (201 Created):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "age": 20,
    "gender": "Female",
    "email": "jane@example.com"
  }
}
```

**Error Response (400):**

```json
{
  "message": "User already exists"
}
```

---

### 2. Login User

Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Example:**

```json
{
  "email": "jane@example.com",
  "password": "securepass123"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "age": 20,
    "gender": "Female",
    "email": "jane@example.com"
  }
}
```

**Error Response (400):**

```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User

Retrieve authenticated user information.

**Endpoint:** `GET /auth/me`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200 OK):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Jane Doe",
  "age": 20,
  "gender": "Female",
  "email": "jane@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (401):**

```json
{
  "message": "Token is not valid"
}
```

---

## Chat Endpoints

### 1. Send Chat Message

Send a message to the AI chatbot.

**Endpoint:** `POST /chat/send`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "message": "string (required)"
}
```

**Example:**

```json
{
  "message": "What should I know about my period?"
}
```

**Success Response (200 OK):**

```json
{
  "message": "It's important to understand your body. Menstruation is a natural process...",
  "chatHistory": [
    {
      "role": "user",
      "content": "What should I know about my period?",
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "role": "assistant",
      "content": "It's important to understand your body...",
      "timestamp": "2024-01-15T10:30:05.000Z"
    }
  ]
}
```

**Error Response (500):**

```json
{
  "message": "Server error",
  "error": "error details"
}
```

---

### 2. Get Chat History

Retrieve chat conversation history.

**Endpoint:** `GET /chat/history`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200 OK):**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "How do I manage stress?",
      "timestamp": "2024-01-15T10:00:00.000Z"
    },
    {
      "role": "assistant",
      "content": "Here are some tips for managing stress...",
      "timestamp": "2024-01-15T10:00:05.000Z"
    }
  ]
}
```

**Empty Response (200 OK):**

```json
{
  "messages": []
}
```

---

## Cycle Tracker Endpoints

### 1. Update Cycle Information

Update or create cycle tracking data.

**Endpoint:** `POST /cycle-tracker/update`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "lastPeriodDate": "string (required, format: YYYY-MM-DD)",
  "cycleLength": "number (optional, default: 28)"
}
```

**Example:**

```json
{
  "lastPeriodDate": "2024-01-15",
  "cycleLength": 28
}
```

**Success Response (200 OK):**

```json
{
  "message": "Cycle tracker updated successfully",
  "tracker": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "lastPeriodDate": "2024-01-15T00:00:00.000Z",
    "cycleLength": 28,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "predictions": {
    "nextPeriod": "2024-02-12",
    "ovulationDay": "2024-01-29",
    "fertilityStart": "2024-01-26",
    "fertilityEnd": "2024-02-01"
  }
}
```

**Error Response (500):**

```json
{
  "message": "Server error",
  "error": "error details"
}
```

---

### 2. Get Cycle Tracker Information

Retrieve cycle tracking data and predictions.

**Endpoint:** `GET /cycle-tracker/get`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200 OK):**

```json
{
  "tracker": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "lastPeriodDate": "2024-01-15T00:00:00.000Z",
    "cycleLength": 28,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "predictions": {
    "nextPeriod": "2024-02-12",
    "ovulationDay": "2024-01-29",
    "fertilityStart": "2024-01-26",
    "fertilityEnd": "2024-02-01"
  }
}
```

**No Data Response (200 OK):**

```json
{
  "message": "No cycle data found"
}
```

**Error Response (404 or 500):**

```json
{
  "message": "Server error",
  "error": "error details"
}
```

---

## Health Check Endpoint

### Check Backend Status

**Endpoint:** `GET /health`

**Success Response (200 OK):**

```json
{
  "message": "YouthCare+ Backend is running"
}
```

---

## Error Codes

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | OK - Request successful                 |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input data        |
| 401  | Unauthorized - Missing or invalid token |
| 404  | Not Found - Resource not found          |
| 500  | Server Error - Internal server error    |

---

## Common Error Responses

### Missing Token

```json
{
  "message": "No authentication token, access denied"
}
```

### Invalid Token

```json
{
  "message": "Token is not valid"
}
```

### Validation Error

```json
{
  "message": "Validation failed",
  "errors": ["field required", "invalid format"]
}
```

---

## Rate Limiting

Current implementation has no rate limiting. For production, consider implementing:

- 100 requests per 15 minutes for authenticated users
- 20 requests per 15 minutes for unauthenticated endpoints

---

## Token Expiration

JWT tokens expire after **7 days**. Users need to login again to get a new token.

---

## CORS Configuration

Currently allows requests from:

- http://localhost:3000
- All origins in development

For production, update in `server.js`:

```javascript
app.use(
  cors({
    origin: ["https://yourdomain.com"],
    credentials: true,
  }),
);
```

---

## Request Examples using cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","age":20,"gender":"Female","email":"jane@example.com","password":"pass123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"pass123"}'
```

### Send Chat Message

```bash
curl -X POST http://localhost:5000/api/chat/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"How do I manage stress?"}'
```

### Update Cycle Tracker

```bash
curl -X POST http://localhost:5000/api/cycle-tracker/update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lastPeriodDate":"2024-01-15","cycleLength":28}'
```

---

## Request Examples using Axios (JavaScript)

```javascript
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Register
axios.post(`${API_URL}/auth/register`, {
  name: "Jane",
  age: 20,
  gender: "Female",
  email: "jane@example.com",
  password: "pass123",
});

// Login
const loginResponse = await axios.post(`${API_URL}/auth/login`, {
  email: "jane@example.com",
  password: "pass123",
});
const token = loginResponse.data.token;

// Send Chat Message (with token)
axios.post(
  `${API_URL}/chat/send`,
  { message: "How do I manage stress?" },
  { headers: { Authorization: `Bearer ${token}` } },
);

// Get Chat History
axios.get(`${API_URL}/chat/history`, {
  headers: { Authorization: `Bearer ${token}` },
});

// Update Cycle Tracker
axios.post(
  `${API_URL}/cycle-tracker/update`,
  { lastPeriodDate: "2024-01-15", cycleLength: 28 },
  { headers: { Authorization: `Bearer ${token}` } },
);

// Get Cycle Tracker
axios.get(`${API_URL}/cycle-tracker/get`, {
  headers: { Authorization: `Bearer ${token}` },
});
```

---

## Webhooks (Future Feature)

Planned webhooks for notifications:

- `cycle-reminder` - Period prediction reminder
- `health-tip` - Daily health tip
- `appointment-reminder` - Appointment reminders

---

## API Versioning

Current version: **v1** (implicit)

For future versions, use:

```
/api/v2/auth/login
```

---

## Support

For API support or issues:

1. Check request format matches examples
2. Verify token is valid
3. Check server logs for errors
4. Ensure MongoDB is connected
5. Review error message details

---

**Version**: 1.0.0
**Last Updated**: 2026

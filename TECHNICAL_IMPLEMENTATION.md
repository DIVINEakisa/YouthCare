# YouthCare+ - Technical Implementation Details

## Architecture Overview

YouthCare+ uses a modern full-stack architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React.js)                      │
│  - Pages (10 page components)                               │
│  - Components (Navbar, ProtectedRoute)                      │
│  - Context (Authentication state)                           │
│  - API Utilities (Axios instance)                           │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/HTTPS
┌─────────────────────▼───────────────────────────────────────┐
│                 Backend (Express.js)                        │
│  - Routes (Auth, Chat, CycleTracker)                        │
│  - Controllers (Business logic)                             │
│  - Models (Mongoose schemas)                                │
│  - Middleware (JWT authentication)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │ MongoDB Protocol
┌─────────────────────▼───────────────────────────────────────┐
│              Database (MongoDB)                             │
│  - Users Collection                                          │
│  - Chats Collection                                          │
│  - CycleTrackers Collection                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Technologies

### Core Libraries
- **react**: 18.2.0 - UI library
- **react-router-dom**: 6.11.0 - Client-side routing
- **axios**: 1.3.0 - HTTP client
- **tailwindcss**: 3.3.0 - Utility-first CSS

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation bar
│   └── ProtectedRoute.js # Auth guard
├── context/             # React Context for state
│   └── AuthContext.js   # Authentication state
├── pages/               # Page components (routes)
│   ├── Login.js         # Login page
│   ├── Register.js      # Registration page
│   ├── Dashboard.js     # Main dashboard
│   ├── Chat.js          # AI chatbot interface
│   ├── CycleTracker.js  # Cycle tracking
│   ├── Education.js     # Educational content
│   ├── MentalHealth.js  # Mental health support
│   ├── Clinics.js       # Clinic finder
│   ├── YouthCenters.js  # Youth centers
│   └── DeviceInfo.js    # Device information
├── utils/               # Utility functions
│   └── api.js           # API client configuration
├── App.js               # Main app component
├── App.css              # Global styles
├── index.js             # React entry point
└── index.css            # Base styles

public/
└── index.html           # HTML template
```

### State Management
- **Local Storage**: Stores JWT token
- **React Context**: Manages authentication state
- **Component State**: Local component state with useState

### Authentication Flow
1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token added to all API requests via interceptor
5. Token verified on protected routes

---

## Backend Technologies

### Core Libraries
- **express**: 4.18.2 - Web framework
- **mongoose**: 7.0.0 - MongoDB ODM
- **bcryptjs**: 2.4.3 - Password hashing
- **jsonwebtoken**: 9.0.0 - JWT creation/verification
- **cors**: 2.8.5 - Cross-origin requests
- **axios**: 1.3.0 - HTTP client (for OpenAI)
- **dotenv**: 16.0.3 - Environment variables

### Directory Structure
```
backend/
├── config/
│   └── db.js            # MongoDB connection
├── models/
│   ├── User.js          # User schema
│   ├── Chat.js          # Chat schema
│   └── CycleTracker.js  # Cycle tracker schema
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── chatController.js    # Chat logic
│   └── cycleTrackerController.js # Cycle tracking
├── routes/
│   ├── auth.js          # Auth endpoints
│   ├── chat.js          # Chat endpoints
│   └── cycleTracker.js  # Cycle tracker endpoints
├── middleware/
│   └── auth.js          # JWT verification
├── server.js            # Express app setup
└── package.json         # Dependencies
```

### Request Flow
1. Client sends HTTP request
2. CORS middleware validates origin
3. Route handler matched
4. Auth middleware verifies JWT (for protected routes)
5. Controller processes request
6. Model queries database
7. Response returned to client

---

## Database Design

### MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  age: Number,
  gender: "Male" | "Female",
  email: String (unique, indexed),
  password: String (hashed),
  createdAt: Date (auto)
}
```

Indexes:
- `email`: 1 (unique)

#### Chats Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  messages: [
    {
      role: "user" | "assistant",
      content: String,
      timestamp: Date (auto)
    }
  ],
  createdAt: Date (auto)
}
```

Indexes:
- `userId`: 1 (for query optimization)

#### CycleTrackers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, unique),
  lastPeriodDate: Date,
  cycleLength: Number (default: 28),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

Indexes:
- `userId`: 1 (unique, for query optimization)

---

## Authentication & Security

### Password Security
```javascript
// Hashing
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Verification
const isValid = await bcrypt.compare(password, hashedPassword);
```

### JWT Token
```javascript
// Generation (expires in 7 days)
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verification (on protected routes)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Protected Routes
```javascript
// Middleware adds userId to request
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
};

// Used in routes
router.get('/protected', auth, controller);
```

---

## API Integration

### OpenAI API
```javascript
// Chat completion request
const response = await axios.post(
  'https://api.openai.com/v1/chat/completions',
  {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a health advisor...' },
      { role: 'user', content: userMessage }
    ],
    max_tokens: 150
  },
  {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
);
```

### Fallback System
If OpenAI API fails or no key provided, uses mock responses:
```javascript
const getMockAIResponse = (message) => {
  // Returns pre-written health advice
  // Based on message keywords
};
```

---

## Frontend Component Examples

### Functional Component with Hooks
```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComponentName() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data or set up
  }, []);

  const handleAction = async () => {
    setLoading(true);
    try {
      // Perform action
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* JSX content */}
    </div>
  );
}
```

### API Call Pattern
```jsx
import { chatAPI } from '../utils/api';

const sendMessage = async () => {
  try {
    const response = await chatAPI.sendMessage(message);
    setMessages(response.data.chatHistory);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Backend Controller Examples

### Async Controller with Error Handling
```javascript
const controller = async (req, res) => {
  try {
    // Validate input
    const { field } = req.body;
    if (!field) {
      return res.status(400).json({ message: 'Field required' });
    }

    // Process request
    const result = await Model.findById(req.userId);
    
    // Return success
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};
```

---

## CSS & Styling

### Tailwind CSS Configuration
```javascript
theme: {
  extend: {
    colors: {
      'emerald': {
        '800': '#065f46'  // Main brand color
      }
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif']
    }
  }
}
```

### Utility Classes
```jsx
<div className="bg-emerald-800 p-4 rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-white">Title</h1>
</div>
```

### Responsive Design
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

---

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/youthcare
PORT=5000
JWT_SECRET=random_secret_string
OPENAI_API_KEY=sk-optional-key
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Performance Considerations

### Database Optimization
- Indexes on frequently queried fields
- Use lean() for read-only queries
- Pagination for large datasets

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization
- Caching with localStorage
- Minimize API calls

### Backend Optimization
- Response compression
- Connection pooling
- Query optimization
- Caching layer (future)

---

## Error Handling

### Frontend
```javascript
try {
  const response = await api.post('/endpoint', data);
  // Success
} catch (error) {
  const message = error.response?.data?.message || 'Error occurred';
  setError(message);
}
```

### Backend
```javascript
try {
  const result = await Model.find();
  res.json(result);
} catch (error) {
  console.error('Database error:', error);
  res.status(500).json({ message: 'Server error' });
}
```

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Register new user
- [ ] Login with credentials
- [ ] Navigate all pages
- [ ] Test chat functionality
- [ ] Update cycle tracker
- [ ] Check responsive design
- [ ] Test on mobile browser
- [ ] Verify error messages

### API Testing
```bash
# Test auth
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass"}'

# Test protected endpoint
curl -X GET http://localhost:5000/api/chat/history \
  -H "Authorization: Bearer <token>"
```

---

## Deployment Checklist

- [ ] Environment variables set
- [ ] MongoDB Atlas configured
- [ ] SSL certificate installed
- [ ] CORS configured for domain
- [ ] Error logging set up
- [ ] Monitoring enabled
- [ ] Backups scheduled
- [ ] Build optimized
- [ ] Tests passing
- [ ] Documentation updated

---

## Future Enhancements

### Short-term
- User profile page
- Password reset
- Email verification
- Rate limiting

### Medium-term
- Real SMS integration
- Video streaming
- Appointment booking
- Provider integration

### Long-term
- Mobile app (React Native)
- Community features
- AI model training
- Offline capability

---

## Troubleshooting Guide

### Common Issues

**Port Already in Use**
```bash
# Find process
netstat -ano | findstr :5000
# Kill process
taskkill /PID <PID> /F
```

**MongoDB Connection Failed**
- Check MongoDB running: `mongosh`
- Verify connection string
- Check database exists

**API Not Responding**
- Check backend is running
- Verify port 5000 accessible
- Check CORS configuration
- Review server logs

**Frontend Errors**
- Clear browser cache
- Check browser console
- Verify API URL in .env
- Check network tab in DevTools

---

## Code Style Guidelines

### JavaScript/React
- Use arrow functions
- Use const by default
- Destructure imports/props
- Use async/await
- Comment complex logic

### File Naming
- PascalCase for components: `MyComponent.js`
- camelCase for utilities: `myUtility.js`
- kebab-case for CSS: `my-style.css`

### Git Commits
- Descriptive messages
- Reference issues
- Keep commits atomic
- Use present tense

---

**Version**: 1.0.0  
**Last Updated**: 2026

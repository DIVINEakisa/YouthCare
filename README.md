# YouthCare+ - Inclusive Digital Health Platform for Youth in Rwanda

YouthCare+ is a full-stack web application designed to provide accessible health information and support to youth in Rwanda. The platform includes features for reproductive health, mental wellness, educational content, clinic finder, and more.

## 🆕 What's New in v2.0

YouthCare+ v2.0 introduces **5 major enhancements**:

### 🔔 Real Notification System
- In-app notification center with sidebar panel
- Unread notification badge on navbar
- Auto-generated cycle reminders (7 days, 2 days, ovulation)
- Health tips included in notifications
- Mark individual/all as read or delete

### ♿ Accessibility Features
- **Text-to-Speech:** Play audio for all articles (English/Kinyarwanda)
- **Video Captions:** YouTube videos with captions enabled
- **Browser Notifications:** Permission-based push notifications
- **Simple Language:** All content written plainly
- **Large Text Support:** Zoom-friendly design

### 💡 Smart Recommendations
- AI-powered content suggestions based on category
- Recommended articles, videos, and resources
- Personalized education experience
- Shows top 2 recommendations per category

### 🎥 Enhanced Education Content
- **3 content types:** Articles, Videos (YouTube), Resources
- **5 categories:** Reproductive, Mental, Youth, Nutrition, Safety
- **2 languages:** English and Kinyarwanda
- **Print & Listen:** Print articles or hear them aloud
- **Verified Sources:** WHO, UNICEF, Rwanda Biomedical Center

### 📊 Improved Cycle Tracker
- Automatic health tips based on cycle phase
- Phase-specific advice (menstrual, follicular, ovulation, luteal)
- Auto-generated reminders for important dates
- Nutrition and wellness recommendations
- Cycle phase information cards

**See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for full details!**

---

```
YouthCare/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   └── cycleTrackerController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Chat.js
│   │   └── CycleTracker.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── cycleTracker.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── ProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Chat.js
    │   │   ├── CycleTracker.js
    │   │   ├── Education.js
    │   │   ├── MentalHealth.js
    │   │   ├── Clinics.js
    │   │   ├── YouthCenters.js
    │   │   └── DeviceInfo.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API (optional)

## Features

### 1. Authentication System

- User registration with name, age, gender, email, and password
- User login with JWT authentication
- Secure password hashing with bcryptjs
- Session management

### 2. Dashboard

- Welcome message with user name
- Navigation to all features
- Gender-specific features (Cycle Tracker for female users)
- USSD and Call Support information

### 3. AI Chatbot

- Chat interface for health questions
- Integration with OpenAI API (with mock responses as fallback)
- Chat history storage
- Supportive and safe responses
- Recommendations for articles and resources

### 4. Menstrual Cycle Tracker

- Cycle prediction and calculation
- Ovulation window detection
- Fertility days prediction
- Daily self-care tips
- Pain management guidance
- Reminder notifications

### 5. Educational Content

- Multiple categories: Reproductive Health, Mental Health, Youth Education
- Articles with icons and descriptions
- YouTube video links
- Quick facts section
- Mobile-responsive cards

### 6. Mental Health Support

- Mood tracker with emoji selection
- Context-specific tips based on mood
- Relaxation techniques
- Mental health resources
- Therapist contact information
- Crisis support hotline

### 7. Clinic Finder

- List of nearby clinics with mock data
- Clinic details: location, contact, hours, services
- Rating system
- Get directions feature
- Emergency contact information

### 8. Youth Centers (Maison des Jeunes)

- List of youth centers in Rwanda
- Activities offered at each center
- Contact information and hours
- Information about getting involved

### 9. IoT Menstrual Pain Device

- Informational page about the device
- Features and benefits
- Technical specifications
- Clinical evidence
- Pre-order information

### 10. Accessibility Features

- Large, readable text options
- Simple language throughout
- High contrast colors (emerald-800 background, white cards)
- Mobile-responsive design
- Voice input button placeholder
- USSD and call system simulation

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```
MONGODB_URI=mongodb://localhost:27017/youthcare
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here (optional)
NODE_ENV=development
```

5. Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:

```bash
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Chat

- `POST /api/chat/send` - Send message to AI (protected)
- `GET /api/chat/history` - Get chat history (protected)

### Cycle Tracker

- `POST /api/cycle-tracker/update` - Update cycle information (protected)
- `GET /api/cycle-tracker/get` - Get cycle predictions (protected)

## Usage Guide

### For Users

1. **Register/Login**: Create an account or log in with your credentials
2. **Complete Profile**: Select your gender to unlock gender-specific features
3. **Explore Features**: Navigate through different sections using the dashboard
4. **Chat with AI**: Ask health questions and receive supportive guidance
5. **Track Cycle**: (Female users) Log your menstrual information for predictions
6. **Learn**: Access educational content about reproductive and mental health
7. **Find Help**: Locate nearby clinics and mental health resources
8. **Join Community**: Find youth centers and community activities

### Admin/Developer

1. **Environment Variables**: Configure all necessary API keys and database connections
2. **Database**: Ensure MongoDB is running and accessible
3. **API Keys**: Add OpenAI API key for AI chatbot functionality
4. **Monitoring**: Check server logs for any issues

## Design Specifications

- **Main Color**: Emerald-800 (#065f46)
- **Secondary Colors**: White (cards), Emerald shades for accents
- **Typography**:
  - Main font: Inter
  - Headings: Poppins
- **Layout**: Mobile-first, responsive design
- **Cards**: White background with subtle shadow and rounded corners
- **Buttons**:
  - Primary: White background with emerald text
  - Secondary: Outlined white

## Features Implemented

- ✅ User Authentication System
- ✅ Dashboard with Navigation
- ✅ AI Chatbot with mock responses
- ✅ Menstrual Cycle Tracker
- ✅ Educational Content
- ✅ Mental Health Support
- ✅ Clinic Finder
- ✅ Youth Centers Directory
- ✅ Device Information Page
- ✅ Accessibility Features
- ✅ USSD/Call Support Simulation
- ✅ Responsive Mobile Design

## Bonus Features (Implemented)

- ✅ Chat history stored in database
- ✅ Notifications and reminders (frontend)
- ✅ Rating system for clinics
- ✅ Multi-category educational content

## Future Enhancements

- Integration with real SMS/USSD services
- Real-time notifications
- Mobile app (React Native)
- Video streaming integration
- Community forum
- Peer support features
- Healthcare provider integration
- Government clinic API integration
- Appointment booking system
- Prescription management

## Accessibility Considerations

- High contrast colors for visibility
- Large, readable font sizes
- Simple language for low-literacy users
- Mobile-responsive design
- Voice input placeholders
- Clear navigation structure
- Alternative text for all icons
- Keyboard navigation support

## Security Considerations

- JWT token-based authentication
- Password hashing with bcryptjs
- Environment variable protection
- CORS configured
- Input validation
- Secure API endpoints

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  age: Number,
  gender: String (Male/Female),
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Chats Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  messages: [
    {
      role: String (user/assistant),
      content: String,
      timestamp: Date
    }
  ],
  createdAt: Date
}
```

### CycleTracker Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  lastPeriodDate: Date,
  cycleLength: Number (default: 28),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

To test the application:

1. Register a new account
2. Login with credentials
3. Navigate to different features
4. Test the AI chatbot with various questions
5. For female users, test cycle tracker with a date
6. Verify clinic finder and other features display correctly

## Troubleshooting

### Backend Connection Issues

- Ensure MongoDB is running
- Check if port 5000 is not in use
- Verify `.env` file configuration

### Frontend Issues

- Clear browser cache
- Restart development server
- Check if backend is running
- Verify `.env` file has correct API URL

### AI Chatbot Not Working

- Check if OPENAI_API_KEY is set
- Mock responses will work if API key is unavailable
- Check API key validity

## Support

For issues or questions:

1. Check error messages in browser console and server logs
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check MongoDB connection status

## License

This project is designed for educational purposes and community health promotion.

## Contributors

YouthCare+ Team - Building inclusive health solutions for African youth.

## Notes

- This is an MVP (Minimum Viable Product) designed to demonstrate core features
- Mock data is used for clinics, youth centers, and therapists
- AI chatbot uses mock responses as default; integrate OpenAI API for real AI responses
- USSD and call systems are simulated UI components
- Device information page is conceptual and not connected to real hardware

---

**Version**: 1.0.0
**Last Updated**: 2026

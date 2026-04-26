# YouthCare+ Website - Complete Documentation

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [What is YouthCare+](#what-is-youthcare)
3. [How It Works](#how-it-works)
4. [Key Features](#key-features)
5. [User Journey](#user-journey)
6. [Technical Overview](#technical-overview)
7. [System Architecture](#system-architecture)
8. [Feature Descriptions](#feature-descriptions)
9. [User Types](#user-types)
10. [Data Storage](#data-storage)

---

## Executive Summary

**YouthCare+** is a comprehensive digital health platform designed specifically for youth in Rwanda (ages 10-24). It provides accessible health information, support services, and tools to help young people make informed decisions about their physical and mental wellbeing. The platform is available through web browsers, USSD codes, and phone calls to ensure maximum accessibility.

---

## What is YouthCare+

### Purpose

YouthCare+ aims to bridge the gap between youth and healthcare services by providing:

- **Trusted health information** in simple, accessible language
- **Mental health support** through mood tracking and resources
- **Reproductive health guidance** tailored to young people
- **Clinic finder services** to connect users with healthcare providers
- **Community engagement** through youth centers
- **24/7 accessibility** via web, USSD, and phone

### Target Audience

- Young people aged 10-24 in Rwanda
- Both males and females
- People with varying levels of digital literacy
- Users in urban and rural areas
- People with limited internet access (USSD/Call support)

### Core Values

- **Privacy**: All data is encrypted and confidential
- **Accessibility**: Works with or without internet
- **Inclusivity**: Designed for all genders and abilities
- **Simplicity**: Clear, friendly content written for youth
- **Trust**: Built by healthcare professionals

---

## How It Works

### Step 1: Sign Up

1. User visits the YouthCare+ website
2. Clicks "Sign Up" to create an account
3. Enters name, age, gender, email, and password
4. Account is created and stored securely in the database
5. User receives welcome message

### Step 2: Login

1. User enters email and password
2. System verifies credentials
3. System generates a secure token (JWT)
4. User is logged in and can access all features

### Step 3: Access Dashboard

1. After login, user sees personalized dashboard
2. Dashboard shows:
   - Welcome message with user's name
   - 6 main feature cards to choose from
   - Health tips
   - Emergency contact information
   - USSD/Call access codes

### Step 4: Use Features

1. User clicks on any feature they want to use
2. Feature loads with relevant content
3. User interacts with the feature
4. All actions are saved to the database
5. User can access their history anytime

### Step 5: Stay Connected

1. Users can logout anytime
2. Their data is saved securely
3. When they login again, their information is restored
4. They can track progress over time

---

## Key Features

### 1. AI Health Chatbot 💬

**What it does:**

- Answers health questions 24/7
- Provides reliable health information
- Recommends articles and resources
- Responds in simple, understandable language

**How to use:**

1. Click "AI Chat" from dashboard
2. Type your health question
3. Get instant response from AI
4. Read recommendations
5. Chat history is saved

**Example questions:**

- "What is menstruation?"
- "How do I prevent STIs?"
- "I'm feeling anxious, what should I do?"
- "Where can I get contraceptives?"

---

### 2. Educational Content 📚

**What it does:**

- Provides health information in 5 categories
- Available in English and Kinyarwanda
- Covers topics for all users
- Organized by health topics

**Categories:**

1. **Reproductive Health** - Period, contraception, STI prevention, puberty
2. **Mental Health** - Depression, anxiety, stress management
3. **Youth Education** - General health topics for young people
4. **Nutrition** - Healthy eating habits, balanced diet
5. **Safety** - Personal safety, emergency procedures

**How to use:**

1. Click "Learn & Grow" from dashboard
2. Select a category (e.g., Reproductive Health)
3. Choose language (English or Kinyarwanda)
4. Read articles with descriptions and sources
5. All content is color-coded with icons

---

### 3. Mental Health & Wellbeing 🧠

**What it does:**

- Tracks emotional health
- Provides mood-specific tips
- Shares relaxation techniques
- Offers crisis support information

**Features:**

- **Mood Tracker**: Select how you feel (Happy, Sad, Stressed, Anxious)
- **Contextual Tips**: Get tips based on your mood
- **Quick Resources**: 4 quick wellness techniques
- **Crisis Help**: Emergency contact information

**How to use:**

1. Click "Wellbeing" from dashboard
2. Select your current mood with emoji
3. Read tips personalized to your mood
4. Explore quick resources section
5. Access crisis help if needed

**Wellness Techniques:**

- Deep Breathing: Breathing exercises for calm
- Meditation: Mindfulness and focus techniques
- Physical Exercise: Activities to relieve stress
- Creative Expression: Artistic outlets for emotions

---

### 4. Menstrual Cycle Tracker 🌸

**What it does:**

- Tracks menstrual cycles
- Predicts next period date
- Identifies ovulation window
- Identifies fertile days
- Provides health tips

**Available for:** Female users only

**How to use:**

1. Click "Cycle Tracker" from dashboard
2. Enter your last period date (calendar picker)
3. Set your cycle length (default: 28 days)
4. Click "Calculate"
5. View predictions:
   - Next period date
   - Ovulation date
   - Fertile window

**Information provided:**

- Based on scientific cycle calculations
- Average cycle is 28-35 days
- Helps with family planning
- Useful for health monitoring

---

### 5. Find a Clinic 🏥

**What it does:**

- Lists nearby health clinics
- Shows clinic information
- Provides contact details
- Displays operating hours
- Helps users locate services

**Information shown:**

- Clinic name
- Location with address
- Phone number
- Operating hours
- Services offered

**How to use:**

1. Click "Clinics" from dashboard
2. Browse list of nearby clinics
3. Click a clinic to see details
4. Call or visit the clinic
5. Know when and where to get help

**When to visit:**

- Emergency situations
- Persistent health issues
- Preventive checkups
- Prescription needs

---

### 6. Youth Centers (Maison des Jeunes) 👥

**What it does:**

- Connects youth with community resources
- Shows available activities and programs
- Provides center locations and hours
- Encourages community engagement

**Information provided:**

- Center name and location
- Activities offered
- Contact information
- Operating hours
- How to get involved

**Types of activities:**

- Sports and recreation
- Educational programs
- Social events
- Mentorship opportunities
- Skills training

---

### 7. Device Information ⚙️

**What it does:**

- Provides information about IoT menstrual pain relief device
- Shows features and benefits
- Explains how it works
- Lists technical specifications
- Shows affordability information

**Device features:**

- Low-cost pain relief
- Easy to use
- Accessible to all
- Clinically tested
- Available for pre-order

---

### 8. USSD & Call Support ☎️

**What it works:**

- Enables access without internet
- Provides phone-based support
- Works on any phone (smartphone or basic phone)
- Available 24/7

**Access codes:**

- **USSD**: Dial \*123# on any phone
- **Call**: Phone number provided on dashboard
- **Hours**: 24/7 availability
- **Languages**: English and Kinyarwanda

**What you can do:**

- Get health information
- Book appointments
- Ask urgent questions
- Receive support

---

## User Journey

### Journey Map: New User

```
1. LANDING PAGE
   ↓
2. READ FEATURES & INFORMATION
   ↓
3. CLICK "SIGN UP"
   ↓
4. ENTER DETAILS (Name, Age, Gender, Email, Password)
   ↓
5. ACCOUNT CREATED
   ↓
6. AUTOMATIC LOGIN
   ↓
7. DASHBOARD DISPLAYS
   ↓
8. CHOOSE FIRST FEATURE
   ↓
9. EXPLORE FEATURES
   ↓
10. SAVE DATA
```

### Journey Map: Returning User

```
1. LANDING PAGE
   ↓
2. CLICK "LOGIN"
   ↓
3. ENTER EMAIL & PASSWORD
   ↓
4. DASHBOARD DISPLAYS
   ↓
5. VIEW PERSONALIZED CONTENT
   ↓
6. USE FEATURES
   ↓
7. DATA SYNCS AUTOMATICALLY
```

### Journey Map: User Seeking Health Help

```
PROBLEM: Need menstrual advice
   ↓
OPTION A: Use AI Chat
   - Type question
   - Get instant answer

OR

OPTION B: Read Education
   - Browse reproductive health
   - Read detailed article

OR

OPTION C: Call/USSD Support
   - Dial *123#
   - Speak with support person

↓
RECEIVE HELP
   ↓
FEEL BETTER INFORMED
```

---

## Technical Overview

### Technology Stack

**Frontend (What users see):**

- React.js: Interactive user interface
- Tailwind CSS: Beautiful styling
- JavaScript: App functionality
- Browser: Chrome, Firefox, Safari, Edge

**Backend (What runs behind the scenes):**

- Node.js: Server runtime
- Express.js: Web server framework
- MongoDB: Database storage
- JWT: Secure authentication

**Security:**

- Passwords encrypted with bcryptjs
- JWT tokens for session management
- HTTPS for data protection
- Data encryption in transit

**External Integrations:**

- OpenAI API: AI chatbot responses
- Google Maps API: Clinic locations (optional)
- SMS Gateway: Phone notifications (optional)

---

## System Architecture

### How Data Flows

```
USER BROWSER
    ↓
[React Frontend]
    ↓
[API Requests via HTTP]
    ↓
[Express Backend]
    ↓
[Authentication Check]
    ↓
[Data Processing]
    ↓
[MongoDB Database]
    ↓
[Send Response]
    ↓
[Display on Frontend]
```

### User Authentication Flow

```
1. User enters email & password
   ↓
2. Frontend sends to Backend
   ↓
3. Backend verifies credentials
   ↓
4. Backend checks database
   ↓
5. If correct: Generate JWT token
   ↓
6. Send token to Frontend
   ↓
7. Frontend stores token
   ↓
8. User is logged in
   ↓
9. Token sent with every request
   ↓
10. Backend verifies token
   ↓
11. Process request if valid
```

---

## Feature Descriptions

### AI Chatbot Feature

**Purpose:** Provide 24/7 health information without stigma

**How it works:**

1. User types health question
2. System sends to OpenAI API
3. AI generates appropriate response
4. Response is filtered for safety
5. Response displays to user
6. Chat history is saved

**Data stored:**

- User ID
- Question text
- AI response
- Timestamp
- User can view history anytime

**Safety features:**

- Emergency numbers provided if needed
- Recommendation to visit clinic for serious issues
- Supportive and non-judgmental responses

---

### Education Content Feature

**Purpose:** Provide reliable health education in accessible format

**How it works:**

1. Content is pre-loaded in database
2. Organized by category and type
3. Available in multiple languages
4. Displayed with icons and descriptions
5. Updated regularly by administrators

**Content structure:**

- Title (what is this about)
- Description (short summary)
- Full content (detailed information)
- Source (where this info comes from)
- Icon (visual indicator)

**Languages supported:**

- English (default)
- Kinyarwanda (translated versions)
- Easy to add more languages

---

### Cycle Tracker Feature

**Purpose:** Help users understand and track their menstrual cycle

**How it works:**

1. User enters last period date
2. User enters cycle length (or uses default 28 days)
3. System calculates:
   - Next period date
   - Ovulation window (when egg is released)
   - Fertile days (highest pregnancy chance)
4. Results are displayed with explanations
5. Data is saved for future reference

**Scientific basis:**

- Based on standard menstrual cycle calculations
- Average cycle: 21-35 days
- Ovulation typically occurs day 14
- Fertile window: 5 days before + 1 day after ovulation

**Accuracy note:**

- Every person's cycle is different
- Results are estimates
- For exact information, consult healthcare provider

---

### Mental Health Feature

**Purpose:** Support emotional wellbeing and provide coping strategies

**How it works:**

1. User selects their current mood
2. System shows mood-specific tips
3. System displays quick resources
4. User can explore wellness techniques
5. Emergency contact info always available

**Mood categories:**

- Happy: Maintain positive feelings
- Sad: Get support and encouragement
- Stressed: Stress management techniques
- Anxious: Anxiety coping strategies

**Resources provided:**

- Breathing techniques
- Meditation guidance
- Exercise suggestions
- Creative outlets
- Professional help information

---

### Clinic Finder Feature

**Purpose:** Help users locate nearby healthcare facilities

**How it works:**

1. System retrieves clinic database
2. Displays list of clinics
3. Shows key information:
   - Name and location
   - Phone number
   - Operating hours
   - Services available
4. User can call or visit

**Information stored for each clinic:**

- Name
- Physical address
- Phone number
- Operating hours
- Services offered
- Emergency status

---

## User Types

### Type 1: Student User

**Profile:** Young student, still in school

**Typical needs:**

- Contraception information
- Menstrual cycle tracking
- Mental health support during exams
- General health questions

**Common features used:**

- AI Chat
- Education Content
- Cycle Tracker (if female)
- Mental Health

---

### Type 2: Employed Youth

**Profile:** Working young adult

**Typical needs:**

- Stress management
- Sexual health information
- Finding clinics near work
- Quick health answers

**Common features used:**

- AI Chat
- Mental Health
- Clinic Finder
- Education Content

---

### Type 3: Parent/Guardian

**Profile:** Adult supervising youth

**Typical needs:**

- Understanding youth health issues
- Finding healthcare services
- Getting reliable health information
- Emergency support

**Common features used:**

- Education Content
- Clinic Finder
- USSD/Call Support

---

### Type 4: Healthcare Provider

**Profile:** Clinic or health center staff

**Typical needs:**

- Referring patients to platform
- Understanding what platform offers
- Recommending specific features

**Features they refer:**

- AI Chat
- Education Content
- Clinic Finder

---

## Data Storage

### What Data is Stored?

**User Account Information:**

- Name
- Email address
- Age
- Gender
- Hashed password (encrypted)
- Account creation date
- Last login date

**Chat History:**

- User ID
- Questions asked
- Responses received
- Timestamp
- User can view and delete anytime

**Cycle Tracker Data:**

- Last period date entered
- Cycle length
- Calculated predictions
- Calculation date
- User can update anytime

**User Preferences:**

- Language choice (English/Kinyarwanda)
- Activity history
- Feature usage patterns (for improvement)

### Data Security

**How is data protected?**

1. Passwords are encrypted with bcryptjs
2. Communication uses HTTPS (secure connection)
3. Sensitive data is not exposed
4. JWT tokens verify user identity
5. Each user can only see their own data
6. Regular backups ensure no data loss
7. No data is shared with third parties

**User Privacy:**

- No tracking or advertising
- No sale of personal data
- GDPR and privacy law compliant
- Users can request data deletion anytime

---

## User Interface Overview

### Landing Page

**What user sees:**

- YouthCare+ logo and name
- Hero message: "A Safe Digital Space for Youth Health & Wellbeing"
- Featured benefits
- Sign Up and Login buttons
- Information about features
- Footer with links

**Purpose:** Introduce new users to platform

---

### Dashboard (Main Hub)

**What user sees:**

- Welcome message with user's name
- Grid of 6 feature cards
- Health tips section
- USSD/Call support information
- Logout button

**Purpose:** Central hub for all features

**Feature Cards:**

1. 💬 AI Chat - Ask health questions
2. 📚 Learn & Grow - Educational content
3. 🧠 Wellbeing - Mental health support
4. 🏥 Clinics - Find healthcare services
5. 🌸 Cycle Tracker - Track menstrual cycle (female only)
6. ⚙️ Device Info - IoT device information

---

### Login Page

**What user sees:**

- YouthCare+ logo
- Email input field
- Password input field
- Login button
- "Register" link for new users

**Purpose:** Allow returning users to access account

---

### Registration Page

**What user sees:**

- YouthCare+ logo
- Name field
- Age input
- Gender dropdown
- Email field
- Password field
- Create Account button
- "Login" link for existing users

**Purpose:** Allow new users to create account

---

## How to Get Started

### For New Users

1. Go to website landing page
2. Click "Sign Up"
3. Fill in your information:
   - Full name
   - Your age
   - Your gender
   - Email address
   - Password (strong, unique)
4. Click "Create Account"
5. You're automatically logged in!
6. Explore features on your dashboard

### For Existing Users

1. Go to website
2. Click "Login"
3. Enter your email and password
4. Click "Login"
5. Access your personalized dashboard
6. Continue where you left off

### For Non-Internet Users

1. Dial \*123# on any phone (USSD)
2. Follow the voice prompts
3. Get health information
4. OR call the support number provided
5. Speak with a trained support person
6. Receive help 24/7

---

## Common Use Cases

### Case 1: Student with Menstrual Concerns

**Scenario:** 15-year-old girl has irregular period

**What she does:**

1. Login to YouthCare+
2. Click "Learn & Grow"
3. Select "Reproductive Health" category
4. Read article: "Understanding Your Period"
5. Learn what's normal
6. Click "Cycle Tracker"
7. Enter her cycle information
8. Get predictions
9. Understand better what's happening
10. If still concerned, finds nearby clinic

**Result:** Informed, less anxious, knows when to seek help

---

### Case 2: Young Adult with Stress

**Scenario:** 20-year-old man feels stressed about work

**What he does:**

1. Login to YouthCare+
2. Click "Wellbeing" on dashboard
3. Select "Stressed" mood
4. Read stress management tips
5. Explore quick resources
6. Try deep breathing technique
7. Feel calmer
8. Access crisis help if needed

**Result:** Coping strategies available immediately

---

### Case 3: Parent Seeking Health Info

**Scenario:** Parent wants to understand son's health needs

**What they do:**

1. Go to YouthCare+ landing page
2. Read about features and benefits
3. See educational content available
4. Recommend platform to their son
5. Son creates account
6. They can discuss health together

**Result:** Family conversation about health initiated

---

### Case 4: Rural Youth Without Internet

**Scenario:** Young person in village without steady internet

**What they do:**

1. Dial \*123# on their basic phone
2. Hear automated USSD voice menu
3. Navigate with number keys
4. Get answers to basic questions
5. Receive clinic information
6. Find healthcare nearby

**Result:** Access to health information without internet

---

## Troubleshooting Guide

### Problem: Can't login

**Solution:**

- Check your email is correct
- Verify password (case-sensitive)
- Reset password if forgotten
- Contact support

### Problem: Can't create account

**Solution:**

- Check email format (example@email.com)
- Ensure password is strong
- Try different browser
- Clear browser cache
- Contact support

### Problem: Page won't load

**Solution:**

- Check internet connection
- Refresh the page
- Clear browser cache
- Try different browser
- Use USSD access if available

### Problem: Chat not working

**Solution:**

- Ensure you're logged in
- Check internet connection
- Refresh page
- Try again later
- Contact support

### Problem: Can't find clinic

**Solution:**

- Check your location settings
- Try calling support number
- Use Clinic Finder feature
- Check clinic hours

---

## Contact & Support

### How to Get Help

- **Email Support:** support@youthcare.rw
- **Phone:** +250 XXX XXX XXX
- **USSD:** Dial \*123#
- **Emergency:** Call nearest clinic or hospital

### Available Hours

- Monday - Friday: 8 AM - 5 PM
- Saturday: 9 AM - 12 PM
- Sunday: Closed
- 24/7 Emergency Support

---

## Conclusion

YouthCare+ is a comprehensive, accessible digital health platform designed to empower youth in Rwanda with trusted health information and support. Through its user-friendly interface, multiple access methods (web, USSD, phone), and evidence-based content, it aims to improve health outcomes and reduce healthcare disparities for young people.

Whether you're seeking information about reproductive health, mental wellness, contraception options, or just need someone to talk to about your health concerns, YouthCare+ is here to support your journey to better health.

**Your health. Your wellness. Your journey. YouthCare+ is here for you. 🌿**

---

## Appendix: Glossary

- **JWT:** Secure token that proves you're logged in
- **API:** Computer language for backend and frontend to communicate
- **Database:** Secure storage for user information
- **Encryption:** Scrambling data so only authorized people can read it
- **HTTPS:** Secure website connection
- **Ovulation:** When egg is released from ovary
- **Fertile Days:** Days when pregnancy is possible
- **Menstrual Cycle:** Monthly pattern of menstruation
- **USSD:** Unstructured Supplementary Service Data (phone-based service)
- **Mental Health:** Emotional and psychological wellbeing
- **Contraception:** Methods to prevent pregnancy

---

**Document Version:** 1.0  
**Last Updated:** April 2026  
**Status:** Complete  
**For:** YouthCare+ Team & Users

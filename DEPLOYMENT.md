# YouthCare+ - Deployment Guide

## Production Deployment

This guide covers deploying YouthCare+ to production environments.

## Backend Deployment Options

### Option 1: Deploy to Heroku

#### Prerequisites

- Heroku account
- Heroku CLI installed
- MongoDB Atlas account (cloud MongoDB)

#### Steps

1. **Create Heroku App**

```bash
cd backend
heroku create youthcare-backend
```

2. **Set Environment Variables**

```bash
heroku config:set MONGODB_URI=<your_mongodb_atlas_url>
heroku config:set JWT_SECRET=<strong_secret_key>
heroku config:set OPENAI_API_KEY=<your_openai_key>
heroku config:set NODE_ENV=production
```

3. **Create Procfile**

```
web: node server.js
```

4. **Deploy**

```bash
git push heroku main
```

5. **Check Logs**

```bash
heroku logs --tail
```

### Option 2: Deploy to DigitalOcean App Platform

1. Connect your GitHub repository
2. Select `backend` directory as root path
3. Set environment variables in dashboard
4. Deploy

### Option 3: Deploy to AWS (EC2)

1. Launch EC2 instance (Ubuntu 20.04)
2. SSH into instance
3. Install Node.js and MongoDB
4. Clone repository
5. Set environment variables
6. Use PM2 to manage process:

```bash
npm install -g pm2
pm2 start server.js --name "youthcare-api"
pm2 startup
pm2 save
```

## Frontend Deployment Options

### Option 1: Deploy to Vercel

#### Prerequisites

- Vercel account
- GitHub repository connected

#### Steps

1. **Build the frontend**

```bash
cd frontend
npm run build
```

2. **Connect to Vercel**

- Go to vercel.com
- Import project from GitHub
- Select `frontend` as root directory
- Add environment variable:
  - `REACT_APP_API_URL=<your_backend_url>`

3. **Deploy**

- Click "Deploy"

### Option 2: Deploy to Netlify

1. Build the project
2. Connect GitHub to Netlify
3. Select `frontend` directory
4. Add build command: `npm run build`
5. Add publish directory: `build`
6. Set environment variables
7. Deploy

### Option 3: Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Choose frontend directory
firebase deploy
```

## Database Setup

### Using MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Create database user
4. Get connection string
5. Add IP whitelist
6. Use connection string in `.env`

### Connection String Format

```
mongodb+srv://username:password@cluster.mongodb.net/youthcare?retryWrites=true&w=majority
```

## Environment Variables for Production

**Backend (.env)**

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/youthcare
PORT=5000
JWT_SECRET=use_a_strong_random_string_here
OPENAI_API_KEY=sk-your-api-key
NODE_ENV=production
```

**Frontend (.env.production)**

```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Security Checklist

- [ ] Use HTTPS/SSL certificate
- [ ] Strong JWT secret (32+ characters, random)
- [ ] Database user with limited permissions
- [ ] Environment variables configured
- [ ] CORS configured for production domain
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive data
- [ ] API keys stored securely
- [ ] Regular backups configured
- [ ] Monitoring and logging set up

## Performance Optimization

### Backend

```bash
# Install compression
npm install compression

# In server.js
const compression = require('compression');
app.use(compression());
```

### Frontend

```bash
# Build for production
npm run build

# This creates optimized bundle in 'build' folder
```

## Monitoring and Logging

### Backend Logging

```bash
npm install winston
```

### Frontend Error Tracking

- Use Sentry for error tracking
- Set up analytics

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Deploy Backend
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
        run: |
          cd backend
          npm install
          npm test
          # Deploy command here

      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          # Deploy command here
```

## Database Backups

### MongoDB Atlas

- Automatic daily backups (enabled by default)
- Retention: 7 days
- Can restore from backup in dashboard

### Manual Backup

```bash
mongodump --uri="<connection_string>" --out=./backup
mongorestore --uri="<connection_string>" ./backup
```

## Scaling Considerations

### For High Traffic

1. Enable database indexing
2. Implement caching (Redis)
3. Use CDN for static assets
4. Horizontal scaling (multiple server instances)
5. Load balancing

### Database Optimization

```javascript
// Add indexes for frequently queried fields
// In User model
userSchema.index({ email: 1 });

// In Chat model
chatSchema.index({ userId: 1 });

// In CycleTracker model
cycleTrackerSchema.index({ userId: 1 });
```

## SSL/TLS Certificate

### Using Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d yourdomain.com
```

### Using Heroku SSL

```bash
heroku certs:add server.crt server.key
```

## Domain Setup

1. Register domain (e.g., youthcare.rw)
2. Point DNS to your hosting provider
3. Set up SSL certificate
4. Configure in backend CORS settings:

```javascript
app.use(
  cors({
    origin: ["https://youthcare.rw", "https://app.youthcare.rw"],
    credentials: true,
  }),
);
```

## Health Monitoring

### Check Endpoints

- Backend: `https://api.youthcare.rw/api/health`
- Frontend: Check page loads correctly

### Uptime Monitoring

- Use services like UptimeRobot
- Set alerts for downtime

## Cost Estimation (Monthly)

- **Backend (Heroku)**: $7-50
- **Database (MongoDB Atlas)**: $0-100
- **Frontend (Vercel)**: $0-20
- **Domain**: $10-15
- **CDN**: $0-20
- **Total**: $17-205 depending on traffic

## Post-Deployment

1. Test all features in production
2. Monitor logs and errors
3. Set up automated backups
4. Configure alerts
5. Plan regular maintenance
6. Document deployment process
7. Create runbooks for common issues

## Troubleshooting Deployment

### Backend not starting

- Check environment variables
- Verify database connection
- Check Node.js version compatibility
- Review server logs

### Frontend blank page

- Check API URL configuration
- Verify CORS settings
- Check browser console for errors
- Clear cache

### Slow performance

- Check database indexes
- Review API response times
- Check for memory leaks
- Implement caching

## Rollback Procedures

### Heroku

```bash
heroku releases
heroku rollback v42
```

### Vercel

- Automatic rollback from dashboard

### Manual

- Keep previous versions in git
- Deploy previous commit

## Support and Maintenance

- Monitor error rates
- Regular security updates
- Database optimization
- Performance monitoring
- User feedback integration

---

**Version**: 1.0.0
**Last Updated**: 2026

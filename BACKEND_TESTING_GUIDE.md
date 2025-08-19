# 🧪 Backend Testing Guide

## 🚀 **Quick Start Testing**

### **1. Start the Development Server**
```bash
npm run dev
```
The server will start on `http://localhost:3000` (or next available port)

### **2. Test Authentication**

#### **Demo Login (Works Without Zoho Setup)**
- **URL**: `http://localhost:3000/auth/signin`
- **Email**: `demo@ideinstein.com`
- **Password**: `demo123`
- **Expected**: Successful login → redirect to `/portal`

#### **Google OAuth (Requires Google Setup)**
- Click "Sign in with Google"
- **Expected**: Google OAuth flow → redirect to `/portal`

### **3. Test Customer Portal**

#### **Dashboard Tab**
- **URL**: `http://localhost:3000/portal`
- **Expected**: 
  - Welcome message with user name
  - Stats cards (may show 0 without Zoho data)
  - Recent activity section
  - Sign out button works

#### **Projects Tab**
- Click "My Projects" tab
- **Expected**:
  - "No Projects Yet" message (without Zoho data)
  - "Create Project" button
  - Clean, responsive layout

#### **Billing Tab**
- Click "Billing" tab
- **Expected**:
  - Outstanding balance: €0.00
  - Total paid: €0.00
  - "No invoices yet" message
  - Clean billing interface

#### **Settings Tab**
- Click "Settings" tab
- **Expected**:
  - Profile information form
  - Editable fields (First Name, Last Name, Email, Company)
  - "Save Changes" button

### **4. Test API Endpoints**

#### **Authentication Required Endpoints**
All these should return `401 Unauthorized` when not logged in:

```bash
# Test without authentication (should fail)
curl http://localhost:3000/api/user/profile
curl http://localhost:3000/api/projects
curl http://localhost:3000/api/billing/invoices
curl http://localhost:3000/api/dashboard/stats
```

#### **With Authentication**
After logging in, these endpoints should work:
- `/api/user/profile` - Returns user profile data
- `/api/projects` - Returns projects (empty without Zoho)
- `/api/billing/invoices` - Returns invoices (empty without Zoho)
- `/api/dashboard/stats` - Returns dashboard statistics

## 🔧 **With Zoho Integration**

### **1. Configure Environment Variables**
```bash
# In .env.local
ZOHO_CLIENT_ID=your_actual_zoho_client_id
ZOHO_CLIENT_SECRET=your_actual_zoho_client_secret
ZOHO_REFRESH_TOKEN=your_actual_zoho_refresh_token
ZOHO_DOMAIN=https://accounts.zoho.eu
```

### **2. Test Real Data Integration**

#### **User Registration**
- Register a new user
- **Expected**: Contact created in Zoho CRM
- **Verify**: Check Zoho CRM for new contact

#### **Project Creation**
- Create a new project in portal
- **Expected**: Project created in Zoho Projects
- **Verify**: Check Zoho Projects for new project

#### **Invoice Data**
- Create invoice in Zoho Books
- **Expected**: Invoice appears in portal billing section
- **Verify**: Portal shows real invoice data

## 🐛 **Common Issues & Solutions**

### **Issue: "Cannot find module 'next-auth'"**
**Solution**: 
```bash
npm install next-auth
```

### **Issue: "NEXTAUTH_SECRET is not defined"**
**Solution**: 
```bash
# Run setup script to generate secret
node scripts/setup-env.js
```

### **Issue: "Zoho API authentication failed"**
**Solution**: 
1. Check Zoho credentials in `.env.local`
2. Verify Zoho refresh token is valid
3. Check Zoho domain (`.eu` vs `.com`)

### **Issue: "Session not found"**
**Solution**: 
1. Clear browser cookies
2. Restart development server
3. Check NextAuth configuration

### **Issue: "API route not found"**
**Solution**: 
1. Verify file structure in `app/api/`
2. Check route naming conventions
3. Restart development server

## 📊 **Expected Behavior**

### **Without Zoho Configuration**
- ✅ Demo login works
- ✅ Portal loads with empty data
- ✅ UI components render correctly
- ✅ Navigation works
- ❌ Real data integration (expected)

### **With Zoho Configuration**
- ✅ Demo login works
- ✅ Real user registration creates Zoho contacts
- ✅ Projects sync with Zoho Projects
- ✅ Invoices sync with Zoho Books
- ✅ Dashboard shows real statistics
- ✅ Full data integration

## 🎯 **Success Criteria**

### **Phase 1: Basic Functionality**
- [ ] Demo login works
- [ ] Portal loads without errors
- [ ] All tabs navigate correctly
- [ ] Sign out works
- [ ] Responsive design works

### **Phase 2: API Integration**
- [ ] API endpoints respond correctly
- [ ] Authentication guards work
- [ ] Error handling works
- [ ] Data fetching works (even if empty)

### **Phase 3: Zoho Integration**
- [ ] User registration creates Zoho contacts
- [ ] Projects sync with Zoho Projects
- [ ] Invoices sync with Zoho Books
- [ ] Real-time data updates work
- [ ] Full workflow functions end-to-end

## 🚀 **Performance Testing**

### **Load Testing**
```bash
# Test API endpoint performance
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/api/user/profile
```

### **Expected Performance**
- **Page Load**: < 2 seconds
- **API Response**: < 1 second
- **Authentication**: < 500ms
- **Data Fetching**: < 2 seconds

## 📝 **Test Checklist**

### **Authentication**
- [ ] Demo login: `demo@ideinstein.com` / `demo123`
- [ ] Google OAuth (if configured)
- [ ] Session persistence
- [ ] Logout functionality
- [ ] Route protection

### **Customer Portal**
- [ ] Dashboard loads
- [ ] Projects tab works
- [ ] Billing tab works
- [ ] Settings tab works
- [ ] Responsive design
- [ ] Real data integration (with Zoho)

### **API Endpoints**
- [ ] `/api/auth/[...nextauth]` - Authentication
- [ ] `/api/user/profile` - User profile
- [ ] `/api/projects` - Projects CRUD
- [ ] `/api/billing/invoices` - Invoice data
- [ ] `/api/dashboard/stats` - Dashboard stats
- [ ] `/api/files/upload` - File upload

### **Error Handling**
- [ ] Invalid credentials
- [ ] Network errors
- [ ] API failures
- [ ] Unauthorized access
- [ ] Missing data

## 🎉 **Ready for Production**

When all tests pass:
1. ✅ Authentication system works
2. ✅ Customer portal functions
3. ✅ API integration complete
4. ✅ Zoho services connected
5. ✅ Error handling robust
6. ✅ Performance acceptable

**The backend integration is production-ready!** 🚀
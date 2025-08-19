# Zoho Integration Testing Guide

## Overview
This guide helps you test the Zoho CRM integration to ensure that customer signup and login flows are working correctly with automatic contact creation.

## Prerequisites

### 1. Environment Setup
Ensure your `.env.local` file has the required Zoho credentials:

```env
# Zoho Configuration
ZOHO_DOMAIN=https://accounts.zoho.in
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 2. Dependencies
Make sure you have the required packages installed:

```bash
npm install axios dotenv
```

## Testing Methods

### Method 1: Automated Script Testing

#### Test 1: Basic Zoho CRM Integration
```bash
# Test direct Zoho API integration
node scripts/test-customer-creation.js
```

This script will:
- ✅ Verify Zoho API credentials
- ✅ Create test contacts in Zoho CRM
- ✅ Test contact search functionality
- ✅ Provide cleanup instructions

#### Test 2: Authentication Flow Integration
```bash
# Test the auth flow with Zoho integration
node scripts/test-auth-integration.js
```

This script will:
- ✅ Simulate user signup process
- ✅ Test automatic contact creation
- ✅ Simulate user login process
- ✅ Test contact retrieval

### Method 2: Manual Web Testing

#### Test 1: New User Signup Flow
1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the website**: `http://localhost:3000`

3. **Click "Customer Area"** in the header

4. **Click "Sign up here"** on the login page

5. **Fill out the signup form** with test data:
   ```
   First Name: John
   Last Name: Doe
   Email: john.doe.test@example.com
   Company: Test Engineering Corp
   Password: testpass123
   Confirm Password: testpass123
   ```

6. **Submit the form** and verify:
   - ✅ User is redirected to customer portal
   - ✅ Header shows user name dropdown
   - ✅ Dashboard loads successfully

7. **Check Zoho CRM**:
   - Go to your Zoho CRM
   - Navigate to Contacts
   - Verify the new contact was created automatically

#### Test 2: Google Sign-Up Flow
1. **Click "Customer Area"** in the header

2. **Click "Sign up with Google"**

3. **Complete Google OAuth flow**

4. **Verify**:
   - ✅ User is redirected to customer portal
   - ✅ Contact created in Zoho CRM with Google profile data

#### Test 3: Existing User Login Flow
1. **Use credentials from previous test**

2. **Click "Customer Area"** → Enter credentials

3. **Verify**:
   - ✅ User logs in successfully
   - ✅ No duplicate contact created in Zoho
   - ✅ Existing contact data is used

### Method 3: API Endpoint Testing

#### Test Customer API Endpoints
```bash
# Test the customer API (requires authentication)
curl -X GET http://localhost:3000/api/customers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Expected Results

### ✅ Successful Integration Signs

1. **Contact Creation**:
   - New contacts appear in Zoho CRM automatically
   - Contact data matches signup form data
   - No duplicate contacts for existing users

2. **Authentication Flow**:
   - Users can sign up and login seamlessly
   - Session management works correctly
   - User data is retrieved from Zoho

3. **Customer Portal**:
   - Dashboard loads with user-specific data
   - Projects and billing data (when available)
   - Logout functionality works

### ❌ Common Issues and Solutions

#### Issue 1: "Failed to authenticate with Zoho"
**Cause**: Invalid or expired refresh token
**Solution**: 
1. Check your refresh token in `.env.local`
2. Regenerate refresh token using the setup scripts
3. Verify Zoho domain (`.in` vs `.com`)

#### Issue 2: "Contact creation failed"
**Cause**: Missing required fields or API permissions
**Solution**:
1. Check Zoho CRM API permissions
2. Verify required fields in contact creation
3. Check API rate limits

#### Issue 3: "User not found during login"
**Cause**: Contact search not working
**Solution**:
1. Verify email search criteria
2. Check contact exists in Zoho CRM
3. Test with exact email match

## Cleanup Test Data

### Remove Test Contacts
```bash
# Using the test script
node scripts/test-customer-creation.js --delete CONTACT_ID

# Or manually in Zoho CRM:
# 1. Go to Zoho CRM → Contacts
# 2. Find test contacts
# 3. Delete them manually
```

## Monitoring and Debugging

### 1. Check Application Logs
```bash
# In your Next.js development console
# Look for Zoho-related error messages
```

### 2. Zoho API Logs
- Check Zoho Developer Console for API usage
- Monitor rate limits and quotas
- Review error responses

### 3. Database Verification
```bash
# If using a database, check user records
# Verify Zoho contact IDs are stored correctly
```

## Production Testing Checklist

Before deploying to production:

- [ ] Test with real email addresses
- [ ] Verify Zoho production credentials
- [ ] Test rate limiting behavior
- [ ] Verify error handling
- [ ] Test with different user scenarios
- [ ] Check mobile responsiveness
- [ ] Verify logout functionality
- [ ] Test session persistence

## Troubleshooting Commands

```bash
# Test Zoho API connectivity
node scripts/test-zoho-crm.js

# Get fresh refresh token
node scripts/get-zoho-refresh-token.js

# Test environment variables
node -e "console.log(process.env.ZOHO_CLIENT_ID ? '✅ Client ID set' : '❌ Missing Client ID')"
```

## Support

If you encounter issues:

1. **Check the logs** for specific error messages
2. **Verify credentials** are correct and not expired
3. **Test API connectivity** using the provided scripts
4. **Review Zoho documentation** for API changes
5. **Check rate limits** in Zoho Developer Console

The integration should work seamlessly once properly configured. All new signups will automatically create contacts in Zoho CRM, and existing users will login using their Zoho contact data.
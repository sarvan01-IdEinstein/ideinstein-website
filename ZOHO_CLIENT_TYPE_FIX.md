# 🔧 Zoho Client Type Fix - Self Client vs Server Side

## 🎯 **The Issue: Wrong Client Type Selected**

You selected **"Server Side"** but for OAuth applications with refresh tokens, you need **"Self Client"**.

## 📋 **Client Type Differences**

### **Self Client** ✅ (What You Need)
- **Use for**: OAuth applications, web apps, mobile apps
- **Features**: 
  - ✅ OAuth 2.0 flow with authorization codes
  - ✅ Refresh tokens supported
  - ✅ Scope selection available
  - ✅ Redirect URIs configurable
- **Perfect for**: IdEinstein customer portal

### **Server Side** ❌ (Wrong Choice)
- **Use for**: Server-to-server communication, webhooks
- **Features**:
  - ❌ No OAuth flow
  - ❌ No refresh tokens
  - ❌ No scope selection
  - ❌ Direct API access only
- **Not suitable for**: Customer-facing applications

## 🔧 **Step-by-Step Fix**

### **Step 1: Create New Self Client App**

1. **Go to**: https://api-console.zoho.in
2. **Click**: "Add Client" or "Create New Client"
3. **Choose**: **"Self Client"** (NOT Server Side)
4. **Fill in details**:
   - **Client Name**: IdEinstein Portal
   - **Homepage URL**: http://localhost:3000
   - **Authorized Redirect URIs**: http://localhost:3000/oauth/callback

### **Step 2: Configure Scopes**

After creating the Self Client, you should see scope options:

#### **Available Scopes to Select:**
- ✅ **ZohoCRM.modules.ALL** - Full CRM access
- ✅ **ZohoProjects.projects.ALL** - Full Projects access  
- ✅ **ZohoBooks.fullaccess.all** - Full Books access
- ✅ **ZohoWorkDrive.files.ALL** - Full WorkDrive access

### **Step 3: Get New Client Credentials**

After creating the Self Client:
1. **Copy the new Client ID**
2. **Copy the new Client Secret**
3. **Note down the scopes** you selected

### **Step 4: Update Your Environment**

```bash
# Update .env.local with new Self Client credentials
ZOHO_CLIENT_ID=your_new_self_client_id
ZOHO_CLIENT_SECRET=your_new_self_client_secret
ZOHO_DOMAIN=https://accounts.zoho.in
```

### **Step 5: Test with New Credentials**

```bash
node scripts/get-zoho-crm-token.js
```

## 🎯 **What You Should See Now**

### **In API Console (Self Client):**
- ✅ **Scope selection** dropdown/checkboxes
- ✅ **Redirect URI** configuration
- ✅ **OAuth settings** section
- ✅ **Client ID and Secret** generated

### **During OAuth Flow:**
- ✅ **Consent screen** showing requested permissions
- ✅ **Scope-specific permissions** listed
- ✅ **Successful authorization** code generation

## 🔍 **Troubleshooting Self Client Setup**

### **If You Don't See Scope Options:**
1. **Refresh the page** after creating Self Client
2. **Check if services are enabled** in your Zoho account
3. **Try creating a new Self Client** from scratch

### **If Scopes Are Grayed Out:**
1. **Enable the service first** (e.g., go to crm.zoho.in)
2. **Complete service setup** (basic configuration)
3. **Return to API console** and refresh

### **If OAuth Flow Still Fails:**
1. **Verify redirect URI** matches exactly
2. **Check client credentials** are from Self Client (not Server Side)
3. **Ensure services are active** in your account

## 🚀 **Complete Setup Checklist**

### **✅ Pre-Setup:**
- [ ] Enable Zoho CRM at https://crm.zoho.in
- [ ] Enable Zoho Projects at https://projects.zoho.in  
- [ ] Enable Zoho Books at https://books.zoho.in
- [ ] Enable Zoho WorkDrive at https://workdrive.zoho.in

### **✅ API Console Setup:**
- [ ] Create **Self Client** (not Server Side)
- [ ] Add redirect URI: `http://localhost:3000/oauth/callback`
- [ ] Select required scopes
- [ ] Copy Client ID and Secret

### **✅ Environment Setup:**
- [ ] Update .env.local with Self Client credentials
- [ ] Test with CRM-only script first
- [ ] Verify OAuth flow works

### **✅ Integration Test:**
- [ ] Run: `npm run dev`
- [ ] Test demo login: `demo@ideinstein.com` / `demo123`
- [ ] Register new user → should create Zoho CRM contact

## 🎉 **Expected Result**

After switching to Self Client:
- ✅ **Scope selection** will be available
- ✅ **OAuth flow** will work properly
- ✅ **Refresh token** will be generated
- ✅ **Full Zoho integration** will function

## 📞 **Next Steps**

1. **Create new Self Client** in API console
2. **Select all required scopes**
3. **Update environment** with new credentials
4. **Test with CRM script**: `node scripts/get-zoho-crm-token.js`
5. **Report back** with results

**The Self Client type is crucial for OAuth applications - this should solve the scope selection issue!** 🌟
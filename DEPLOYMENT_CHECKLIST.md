# Production Deployment Checklist

## 🗄️ Database Setup (Neon)

### 1. Create Neon Account
- [ ] Go to https://neon.tech
- [ ] Sign up with GitHub/Google
- [ ] Create new project: "ideinstein-production"

### 2. Get Database Connection
- [ ] Copy connection string from Neon dashboard
- [ ] Format: postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require
- [ ] Test connection locally

### 3. Run Database Migration
```bash
# Set production DATABASE_URL in .env.local temporarily
DATABASE_URL="your-neon-connection-string"

# Run migration
npm run db:push

# Verify tables created
npm run db:studio
```

## 🚀 Vercel Deployment

### 1. Prepare Repository
- [ ] Commit all changes: `git add . && git commit -m "Production ready"`
- [ ] Push to GitHub: `git push origin main`

### 2. Deploy to Vercel
- [ ] Go to https://vercel.com
- [ ] Import GitHub repository
- [ ] Configure environment variables (copy from .env.production.template)
- [ ] Deploy!

### 3. Configure Domain
- [ ] Add custom domain in Vercel dashboard
- [ ] Update DNS records (A/CNAME)
- [ ] Verify HTTPS certificate

## 🧪 Post-Deployment Testing

### 1. Basic Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Quote forms submit
- [ ] Authentication works
- [ ] Customer portal accessible

### 2. Zoho Integration
- [ ] Signup creates Zoho contact
- [ ] Projects load from Zoho
- [ ] Invoices load from Zoho Books
- [ ] File upload to WorkDrive works

### 3. Performance
- [ ] Page load times <2 seconds
- [ ] API responses <500ms
- [ ] Mobile responsiveness
- [ ] SEO meta tags

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secure
- [ ] No sensitive data in repository
- [ ] RBAC permissions working
- [ ] Audit logging active

## 📊 Monitoring Setup

- [ ] Vercel Analytics enabled
- [ ] Sentry error tracking (optional)
- [ ] Google Analytics configured
- [ ] Uptime monitoring (optional)

## 🎯 Go-Live Checklist

- [ ] All tests passing
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Monitoring active
- [ ] Team notified
- [ ] Documentation updated

## 🚨 Rollback Plan

If issues occur:
1. Revert to previous Vercel deployment
2. Check error logs in Vercel dashboard
3. Verify environment variables
4. Test database connection
5. Contact support if needed

## 📞 Support Contacts

- Vercel Support: https://vercel.com/support
- Neon Support: https://neon.tech/docs
- Zoho Support: https://help.zoho.com

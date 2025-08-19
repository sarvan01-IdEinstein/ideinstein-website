# 📸 Team Photos Setup Guide

## 📁 **Where to Copy Team Pictures:**

### **Directory Path:**
```
public/images/team/
```

### **Full Windows Path:**
```
C:\Users\sarva\Desktop\3d print website Ideinstein\ideinstein-website\ideinstein website v8-white blue-trial with new features\public\images\team\
```

---

## 🎯 **Required Team Photo Files:**

### **Current Team Members:**
1. **Saravanakumar** → `saravanakumar.jpg`
2. **Pradeep** → `pradeep.jpg`

### **File Naming Convention:**
- Use **lowercase** names
- Use **hyphens** for spaces (if any)
- Use **.jpg** or **.png** format
- Examples: `saravanakumar.jpg`, `pradeep.jpg`, `john-doe.jpg`

---

## 📋 **Photo Requirements:**

### **Image Specifications:**
- **Format**: JPG or PNG
- **Size**: 400x400px minimum (square aspect ratio preferred)
- **Quality**: High resolution for crisp display
- **Background**: Professional background or transparent PNG

### **Professional Guidelines:**
- **Professional headshots** or upper body shots
- **Good lighting** and clear visibility
- **Professional attire** 
- **Neutral or branded background**
- **High quality** - avoid pixelated or blurry images

---

## 🚀 **How to Add Team Photos:**

### **Step 1: Copy Photos**
Copy your team member photos to:
```
public/images/team/saravanakumar.jpg
public/images/team/pradeep.jpg
```

### **Step 2: Restart Development Server**
```bash
npm run dev
```

### **Step 3: View Results**
Navigate to: `http://localhost:3000/about`
Scroll down to the "Team" section to see the photos.

---

## 🔧 **Adding More Team Members:**

### **To Add New Team Members:**
1. **Add photo** to `public/images/team/[name].jpg`
2. **Update About page** by adding to the `teamMembers` array:

```typescript
{
  id: '3',
  name: 'New Member Name',
  position: 'Position Title',
  image: '/images/team/new-member-name.jpg',
  bio: 'Brief bio about the team member.',
  social: {
    linkedin: 'https://linkedin.com/in/profile',
    twitter: 'https://twitter.com/profile'
  }
}
```

---

## 📁 **Current File Structure:**

```
public/
└── images/
    ├── about/
    │   └── mission.jpg ✅
    ├── services/
    │   └── [service directories] ✅
    └── team/ ✅ (Created)
        ├── saravanakumar.jpg (Copy here)
        └── pradeep.jpg (Copy here)
```

---

## 🌟 **Expected Result:**

After copying the team photos, you'll see:
- ✅ **Professional team section** on the About page
- ✅ **Individual team member cards** with photos
- ✅ **Names, positions, and bios** displayed properly
- ✅ **Social media links** (if provided)
- ✅ **Responsive design** that works on all devices

---

## 🎨 **Photo Optimization Tips:**

### **For Best Results:**
- **Square format** (1:1 aspect ratio) works best
- **Consistent lighting** across all team photos
- **Similar background style** for cohesive look
- **Professional quality** - avoid selfies or casual photos
- **File size** - Keep under 1MB for fast loading

---

## 🔍 **Troubleshooting:**

### **If Photos Don't Show:**
1. **Check file names** - Must match exactly (case-sensitive)
2. **Restart dev server** - `npm run dev`
3. **Clear browser cache** - Hard refresh (`Ctrl + F5`)
4. **Check file format** - Use .jpg or .png only
5. **Verify file path** - Must be in `public/images/team/`

---

## 📞 **Ready to Go!**

Simply copy your team member photos to the `public/images/team/` directory with the correct names, and they'll automatically appear on your About page! 🚀
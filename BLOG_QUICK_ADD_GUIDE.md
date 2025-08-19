# 🚀 Quick Blog Post Addition Guide

## ⚡ **5-Minute Blog Post Addition**

### **Step 1: Prepare Image (2 minutes)**
1. **Resize image** to 1200x630px
2. **Optimize** to under 500KB
3. **Save as** `/public/images/blog/your-image-name.jpg`

### **Step 2: Add to JSON (2 minutes)**
1. **Open** `/public/data/blog-posts.json`
2. **Add new post** to the `posts` array:

```json
{
  "slug": "your-post-slug",
  "title": "Your Post Title",
  "excerpt": "Brief compelling description (150-200 chars)",
  "date": "2024-02-15",
  "readTime": "5 min read",
  "category": "Technology",
  "image": "/images/blog/your-image-name.jpg",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "author": "IdEinstein Engineering Team",
  "content": "Your full content here with \\n\\n for paragraphs..."
}
```

### **Step 3: Test (1 minute)**
1. **Run** `npm run dev`
2. **Visit** `http://localhost:3000/blog`
3. **Check** your post appears and works

## 📋 **Quick Reference**

### **Image Specs:**
- **Size:** 1200x630px
- **Format:** JPG
- **Max Size:** 500KB
- **Location:** `/public/images/blog/`

### **Required Fields:**
- `slug` - URL-friendly version of title
- `title` - Main headline
- `excerpt` - Short description
- `date` - YYYY-MM-DD format
- `readTime` - "X min read"
- `category` - Technology/Engineering/Manufacturing/Design
- `image` - "/images/blog/filename.jpg"
- `tags` - Array of 3-5 tags
- `author` - "IdEinstein [Team] Team"
- `content` - Full post content

### **Categories:**
- Technology
- Engineering  
- Manufacturing
- Design
- Industry

### **Common Tags:**
- CAD, 3D Printing, FEA, CFD, GD&T
- Automotive, Aerospace, Medical
- Innovation, Sustainability, Best Practices

### **Content Tips:**
- Use `\\n\\n` for paragraph breaks in JSON
- Use `**bold**` for emphasis
- Use `## Heading` for sections
- End with IdEinstein service mention

### **Testing Checklist:**
- [ ] Post appears in blog listing
- [ ] Individual post page loads
- [ ] Image displays correctly
- [ ] Mobile view looks good
- [ ] No JSON syntax errors

## 🎯 **Pro Tips**

### **SEO-Friendly Slugs:**
- Use hyphens, not spaces
- Keep under 60 characters
- Include main keyword
- Example: `cad-modeling-best-practices`

### **Engaging Titles:**
- Start with action words
- Include benefits or numbers
- Keep under 60 characters
- Example: "5 CAD Modeling Tricks That Save Hours"

### **Compelling Excerpts:**
- Answer "What's in it for me?"
- Include a benefit or outcome
- Create curiosity
- Keep under 200 characters

This quick guide gets you from idea to published post in just 5 minutes! 🎉
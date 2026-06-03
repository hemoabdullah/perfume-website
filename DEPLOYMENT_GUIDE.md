# 🚀 Deployment Guide - Get Your Website Live

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Fill in your email, password, and username
4. Verify your email

## Step 2: Create a New Repository on GitHub

1. After signing in, click the "+" icon in the top right
2. Select "New repository"
3. Name it: `perfume-website`
4. Add description: "Luxury Perfume E-commerce Website"
5. Choose "Public" (so it's accessible)
6. Click "Create repository"

## Step 3: Push Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Copy and run these in your terminal:

```bash
cd C:/perfume-website

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/perfume-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 4: Create a Vercel Account & Deploy

### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" → Choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Click "Import Project"
5. Paste your repository URL: `https://github.com/YOUR_USERNAME/perfume-website`
6. Click "Import"
7. Click "Deploy"
8. **Wait 2-3 minutes for deployment to complete**

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
cd C:/perfume-website
vercel
```

Follow the prompts and select your GitHub repository.

## Step 5: Get Your Public URL

After deployment completes, Vercel will provide you with a URL like:
```
https://perfume-website-[random].vercel.app
```

This is your **PUBLIC SHAREABLE LINK**! 🎉

## Step 6: Test Your Website

1. Open your Vercel URL in a browser
2. Test all pages: Home, Products, Contact, Admin
3. Go to Admin panel (`/admin.html`)
4. Upload the perfume image you showed me
5. Add fragrance details
6. Verify it appears on the Products page

## Step 7: Update Social Links (Optional)

Edit `contact.html` to add your actual contact info:

```html
<!-- WhatsApp: Replace phone number -->
<a href="https://wa.me/YOUR_PHONE_NUMBER?text=Hi%20Timeless%20Scent" target="_blank">

<!-- Email: Replace email -->
<a href="mailto:YOUR_EMAIL@example.com?subject=Inquiry">

<!-- Instagram/TikTok: Replace handles -->
<a href="https://instagram.com/YOUR_HANDLE" target="_blank">
```

Then push the changes:
```bash
git add .
git commit -m "Update contact information"
git push
```

Vercel will automatically redeploy! ✨

## Step 8: Share With Customers

Your website is now live! Share the URL:
- 📱 Add to Instagram bio
- 💬 Send via WhatsApp
- 🎵 Share on TikTok
- 📧 Email to customers
- 🔗 Add to product listings

## Troubleshooting

### Website not showing content?
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 5 minutes for cache refresh

### Admin panel not working?
- Make sure you're accessing `/admin.html` (not just `/admin`)
- Check browser console for errors (F12)

### Products not saving?
- Check that localStorage is enabled in your browser
- Try a different browser
- Clear cookies/cache

### Vercel deployment failed?
- Check you pushed to GitHub correctly
- Verify your repository is public
- Reconnect Vercel to GitHub

## Next Steps

After your website is live:

1. ✅ Add all your perfume products through admin panel
2. ✅ Update brand name, email, phone numbers
3. ✅ Test contact forms
4. ✅ Share with customers
5. ✅ Monitor for any issues

## Making Changes

To update your website after it's live:

1. Make changes locally
2. Test locally (open index.html in browser)
3. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
4. Vercel automatically redeploys within 1-2 minutes

## Support

Your website runs entirely in the browser - no server maintenance needed!

All product data is stored locally in customer's browser. They can:
- View products
- Browse details
- Contact you via WhatsApp/Email

You can:
- Add/edit/delete products from admin panel
- Export products as JSON backup
- Import products from backup

---

**Your website is production-ready!** 🌹✨

Questions? Check the README.md file for more details.

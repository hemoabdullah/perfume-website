# Timeless Scent - Luxury Perfume Website

A beautiful, modern luxury perfume e-commerce website with an elegant black, gold, and white color scheme.

## Features

✨ **Luxury Design** - Black background with gold accents and premium typography
🛍️ **Product Management** - Easy-to-use admin panel to add, edit, and delete perfumes
📱 **Responsive** - Works perfectly on desktop, tablet, and mobile devices
🖼️ **Product Showcase** - Beautiful product cards with fragrance notes display
📧 **Contact Integration** - WhatsApp, Instagram, TikTok, and Email contact methods
💾 **Local Storage** - All products stored in browser (no server needed)
📊 **Export/Import** - Backup and restore products as JSON

## Pages

- **Home** - Hero section with brand introduction and featured products
- **Products** - Grid of all available perfumes with quick view
- **Product Details** - Full product page with fragrance notes, description, and story
- **Contact** - Contact form and social media links
- **Admin** - Manage your perfume collection

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. Navigate to the Admin panel (`admin.html`)
4. Add your first perfume using the form

### Adding Products

1. Go to the Admin panel
2. Fill in the product form with:
   - Product image (upload your perfume bottle photo)
   - Product name
   - Scent character (e.g., "Creamy • Tobacco • Warm • Addictive")
   - Top notes, Heart notes, Base notes
   - Description and Fragrance story
3. Click "Add Product"
4. Product appears immediately on the website

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Get your public URL instantly

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up and connect your GitHub account
3. Create a new site from Git
4. Select this repository
5. Deploy automatically

### Deploy to GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Set source to main branch
4. Your site is live at `yourusername.github.io/repo-name`

## Data Storage

All product data is stored in the browser's localStorage. To backup:

1. Go to Admin panel
2. Click "Export Products (JSON)"
3. Save the file safely
4. To restore, click "Import Products" and select the saved JSON file

## Customization

### Update Brand Info

Edit these files to customize brand details:
- `index.html` - Brand name and tagline in hero section
- `contact.html` - WhatsApp number, email, social media links
- `css/main.css` - Colors and styling

### Update Social Links

In `contact.html` and footer sections, update:
- WhatsApp: Replace phone number in the URL
- Instagram: Change `@timelessscent` to your handle
- TikTok: Change `@timelessscent` to your handle
- Email: Update to your email address

## File Structure

```
perfume-website/
├── index.html          # Home page
├── products.html       # Products listing
├── product.html        # Product details
├── contact.html        # Contact page
├── admin.html          # Admin panel
├── css/
│   └── main.css        # All styling
├── js/
│   ├── main.js         # Core functionality
│   └── admin.js        # Admin panel logic
├── .gitignore
└── README.md
```

## Color Scheme

- **Primary Gold**: #D4AF37
- **Dark/Background**: #000000
- **Light/Text**: #FFFFFF
- **Secondary Dark**: #1a1a1a

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is open source. Feel free to use and modify for your business.

## Support

For questions or issues:
1. Check the admin panel for data backup/restore options
2. Clear browser cache if experiencing issues
3. Use the contact form to reach out

---

**Ready to launch?**

1. Deploy to Vercel/Netlify
2. Get your public URL
3. Update social media links
4. Add your perfume products
5. Share with customers!

Enjoy your beautiful perfume website! 🌹✨

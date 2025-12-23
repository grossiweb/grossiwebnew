# Grossiweb Next.js Application

A modern Next.js application with Payload CMS integration, recreating the Grossiweb website with enhanced content management capabilities.

## Features

- 🚀 **Next.js 14** with App Router
- 📊 **Payload CMS** for content management
- 🎨 **Tailwind CSS** for responsive design
- 🔒 **TypeScript** for type safety
- 📱 **Fully Responsive** design
- 🎯 **SEO Optimized**

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/grossiweb
PAYLOAD_SECRET=your-super-secret-key-here-make-it-very-long-and-secure
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Important**: Replace `your-super-secret-key-here-make-it-very-long-and-secure` with a secure random string.

### 3. Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Payload CMS Admin**: http://localhost:3000/admin

### 5. Create Admin User
On first run, visit http://localhost:3000/admin to create your admin account.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── collections/        # Payload CMS collections
│   ├── Users.ts        # Admin users
│   ├── Pages.ts        # Website pages
│   ├── BlogPosts.ts    # Blog content
│   ├── Services.ts     # Service offerings
│   ├── Testimonials.ts # Customer testimonials
│   ├── ContactForms.ts # Form submissions
│   └── Media.ts        # File uploads
├── components/         # React components (to be created)
├── server.ts          # Express server with Payload
├── payload.config.ts  # Payload CMS configuration
└── globals.css        # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate:types` - Generate Payload types

## Content Management

### Collections Available:

1. **Pages** - Manage website pages with dynamic content
2. **Blog Posts** - Create and manage blog articles
3. **Services** - Define service offerings
4. **Testimonials** - Customer reviews and feedback
5. **Contact Forms** - Form submission management
6. **Media** - Image and file uploads

### Admin Features:
- Rich text editor for content
- Image optimization and resizing
- SEO meta fields
- Draft/publish workflow
- Responsive image sizes

## Development Notes

- The app uses **App Router** (Next.js 13+)
- **Payload CMS** runs on the same server as Next.js
- **MongoDB** is used for data storage
- **Tailwind CSS** provides utility-first styling
- **TypeScript** ensures type safety

## Troubleshooting

### Common Issues:

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check the `MONGODB_URI` in your `.env.local`

**Payload Secret Error:**
- Make sure `PAYLOAD_SECRET` is set in `.env.local`
- Use a long, secure random string

**Port Already in Use:**
- Change the port by setting `PORT=3001` in `.env.local`

## Next Steps

1. ✅ Basic setup completed
2. 🔄 Add remaining components (Header, Footer, Services, etc.)
3. 📝 Create content in Payload CMS
4. 🎨 Match exact design from original website
5. 📱 Implement responsive design
6. 🚀 Deploy to production

## Support

For issues and questions:
- Check the console for error messages
- Ensure all environment variables are set correctly
- Verify MongoDB is running and accessible

---

*Built with ❤️ using Next.js and Payload CMS* 
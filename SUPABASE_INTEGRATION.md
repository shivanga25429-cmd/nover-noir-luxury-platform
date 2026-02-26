# Supabase Integration Guide

## Overview
This guide will help you set up Supabase authentication and database for the NOVER NOIR luxury platform.

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Node.js and npm/bun installed

## Setup Steps

### 1. Create a Supabase Project
1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be provisioned

### 2. Get Your API Keys
1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon/public key**: This is your public API key (safe to use in client)

**Important Security Note**: 
- ✅ **DO** use the `anon` (public) key in your frontend code
- ❌ **DO NOT** use the `service_role` key in frontend code - it bypasses all security rules

### 3. Update Supabase Configuration

**Option A: Using Environment Variables (Recommended)**

Create a `.env.local` file in your project root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Then update `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Option B: Direct Configuration (Current Setup)**

The keys are currently hardcoded in `src/lib/supabase.ts`. Replace them with your own keys.

### 4. Set Up Database Tables

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase-setup.sql` and paste it into the editor
4. Click **Run** to create all tables, indexes, and security policies

This will create:
- `users` table (stores user profiles)
- `cart` table (stores user shopping carts)
- `products` table (stores product catalog)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic timestamp updates

### 5. Seed Product Data

1. Still in the **SQL Editor**
2. Copy the contents of `supabase-seed-products.sql` and paste it
3. Click **Run** to insert all products

This will populate the products table with:
- 6 luxury fragrances
- Product details (name, price, description, notes)
- Image URLs pointing to novernoir.com

### 6. Configure Email Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Configure email templates (optional):
   - Go to **Authentication** > **Email Templates**
   - Customize "Confirm signup" and "Reset password" emails

### 7. Test Email Delivery (Optional)

For development:
- Supabase provides a built-in email service for testing
- Check **Authentication** > **Users** to see confirmation emails

For production:
- Configure a custom SMTP provider in **Settings** > **Auth** > **SMTP Settings**
- Options include SendGrid, AWS SES, Mailgun, etc.

## Database Schema

### Users Table
```sql
- id: UUID (references auth.users)
- name: TEXT
- phone_number: TEXT
- email: TEXT (unique)
- created_at: TIMESTAMP
```

### Cart Table
```sql
- id: UUID (auto-generated)
- user_id: UUID (references users)
- items: JSONB (array of product IDs)
- total: DECIMAL(10,2)
- is_cleared: BOOLEAN (true if purchased)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Products Table
```sql
- id: TEXT (primary key)
- name: TEXT
- price: DECIMAL(10,2)
- image: TEXT (URL)
- description: TEXT
- fragrance_family: TEXT
- top_notes: TEXT[]
- middle_notes: TEXT[]
- base_notes: TEXT[]
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Features Implemented

### Authentication
- ✅ Email/password sign up with profile creation
- ✅ Sign in functionality
- ✅ Auth state persistence
- ✅ User profile storage in database
- ✅ Auth dialog on cart page for non-authenticated users

### Cart Management
- ✅ Automatic cart sync to database when user signs in
- ✅ Cart items stored as JSONB array
- ✅ Total price tracking
- ✅ Purchase history (is_cleared flag)

### User Dashboard
- ✅ User icon in navbar (right of cart)
- ✅ View user profile (name, email, phone)
- ✅ Order history with status
- ✅ Sign out functionality

### Product Management
- ✅ Products fetched from Supabase
- ✅ Public access to products (no auth required)
- ✅ Dynamic product loading on all pages

## Security

### Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:

**Users Table:**
- Users can only view/update their own profile

**Cart Table:**
- Users can only access their own cart records
- Full CRUD operations on own data

**Products Table:**
- Public SELECT access (anyone can view)
- Admin-only write access (via service_role)

## Development

### Install Dependencies
```bash
npm install
# or
bun install
```

### Run Development Server
```bash
npm run dev
# or
bun run dev
```

### Check for Errors
The app will automatically:
- Fetch products from Supabase on page load
- Show auth dialog when accessing cart without signing in
- Sync cart to database when user is authenticated

## Troubleshooting

### Products Not Loading
1. Check Supabase connection in browser console
2. Verify products table has data: Run `SELECT * FROM products;` in SQL Editor
3. Check RLS policies are set correctly

### Authentication Issues
1. Verify email provider is enabled in Supabase
2. Check browser console for auth errors
3. Ensure `auth.users` table exists (created automatically)

### Cart Not Syncing
1. User must be signed in
2. Check cart table in Supabase: `SELECT * FROM cart;`
3. Verify RLS policies allow user to insert/update

### Image URLs Not Working
1. Ensure your domain (novernoir.com) is serving the images
2. Check CORS settings if images fail to load
3. Verify image paths in products table

## Production Checklist

Before deploying:
- [ ] Move API keys to environment variables
- [ ] Set up custom SMTP for emails
- [ ] Configure allowed domains in Supabase Auth settings
- [ ] Test sign up flow end-to-end
- [ ] Verify cart sync works correctly
- [ ] Ensure all images load from production URLs
- [ ] Set up database backups
- [ ] Configure rate limiting (if needed)

## Support

For issues with:
- **Supabase**: https://supabase.com/docs
- **Authentication**: https://supabase.com/docs/guides/auth
- **Database**: https://supabase.com/docs/guides/database

## Next Steps

Consider adding:
- Reviews storage in database
- Order confirmation emails
- Payment integration
- Admin dashboard for product management
- Wishlist functionality
- Email verification enforcement

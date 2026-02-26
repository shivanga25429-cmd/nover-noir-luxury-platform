# Supabase Integration Setup Guide

This guide will help you set up Supabase authentication and database for the Nover Noir luxury platform.

## Prerequisites

- A Supabase account (https://supabase.com)
- Your Supabase project credentials

## Setup Steps

### 1. Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql` file
4. Run the SQL script to create the necessary tables and policies

### 2. Configure Authentication

The authentication is already configured in the project with your credentials:
- **Supabase URL**: `https://irmrchmtoshpfmfdczz.supabase.co`
- **Anon Key**: Already set in `src/lib/supabase.ts`

### 3. Enable Email Authentication

1. Go to your Supabase dashboard
2. Navigate to **Authentication** > **Providers**
3. Enable **Email** provider
4. Configure email templates if needed (optional)

### 4. Database Schema

#### Users Table
- `id` (UUID, Primary Key): References auth.users
- `name` (TEXT): User's full name
- `phone_number` (TEXT): User's phone number
- `email` (TEXT): User's email address
- `created_at` (TIMESTAMP): Account creation timestamp

#### Cart Table
- `id` (UUID, Primary Key): Unique cart identifier
- `user_id` (UUID): References users table
- `items` (TEXT[]): Array of product IDs
- `total` (DECIMAL): Total cart value
- `is_cleared` (BOOLEAN): Whether the cart has been purchased
- `created_at` (TIMESTAMP): Cart creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

### 5. Row Level Security (RLS)

The SQL script automatically sets up Row Level Security policies to ensure:
- Users can only view and modify their own data
- Users cannot access other users' carts or profiles

## Features Implemented

### Authentication
- ✅ Email/Password authentication
- ✅ Sign up with name, phone number, email, and password
- ✅ Sign in functionality
- ✅ Sign out functionality
- ✅ Password confirmation validation

### Cart Integration
- ✅ Authentication dialog appears when user visits cart page
- ✅ Cart data syncs to Supabase when user is authenticated
- ✅ Cart items stored as array of product IDs
- ✅ Total price calculated and stored
- ✅ Checkout marks cart as purchased (is_cleared = true)

### User Dashboard
- ✅ User profile display (name, email, phone, member since)
- ✅ Order history with status (Purchased/Pending)
- ✅ Sign out functionality
- ✅ Accessible via user icon in navbar

### Navbar
- ✅ User icon next to cart icon
- ✅ Opens auth dialog if not signed in
- ✅ Opens user dashboard if signed in

## Usage

### For New Users
1. Visit the website
2. Add items to cart
3. Navigate to cart page - authentication dialog appears
4. Fill in registration details:
   - Name
   - Phone Number
   - Email
   - Password
   - Confirm Password
5. Sign up
6. Cart automatically syncs to your account

### For Returning Users
1. Click the user icon in navbar
2. Sign in with email and password
3. Access your cart and order history

### Checkout Process
1. Add items to cart
2. Sign in (if not already signed in)
3. Review cart items
4. Click "Proceed to Checkout"
5. Order is marked as purchased and saved to order history

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test authentication:
   - Create a new account
   - Verify email (check Supabase email settings)
   - Sign in/out

3. Test cart sync:
   - Add items to cart while not signed in
   - Sign in and verify cart persists
   - Check Supabase dashboard to see cart data

4. Test checkout:
   - Complete a purchase
   - Check user dashboard to see order history

## Troubleshooting

### Email Verification
- By default, Supabase requires email verification
- For development, you can disable this in Authentication settings
- Or check the email inbox for verification emails

### CORS Issues
- Supabase should handle CORS automatically
- Ensure your site URL is added in Supabase project settings

### RLS Policies
- If you encounter permission errors, verify RLS policies are set up correctly
- Check the Supabase logs for detailed error messages

## Security Notes

⚠️ **Important**: The credentials in this project are for demonstration purposes. In a production environment:
- Store credentials in environment variables (`.env` file)
- Never commit sensitive keys to version control
- Use `.env.local` and add it to `.gitignore`

Example `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Next Steps

- [ ] Add password reset functionality
- [ ] Add email verification flow
- [ ] Add profile editing
- [ ] Add order details page
- [ ] Add admin panel for order management
- [ ] Integrate payment gateway
- [ ] Add shipping address management

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review the SQL script for database setup
3. Check browser console for error messages
4. Verify authentication state in Supabase dashboard

# Quick Setup Instructions for Supabase

## Step 1: Go to Supabase SQL Editor
1. Open your Supabase project: https://supabase.com/dashboard/project/irmrchmtoshpfmfdczz
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

## Step 2: Copy and Run the SQL Below

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table
CREATE TABLE IF NOT EXISTS public.cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    items TEXT[] NOT NULL DEFAULT '{}',
    total DECIMAL(10, 2) NOT NULL DEFAULT 0,
    is_cleared BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Cart policies
CREATE POLICY "Users can view their own cart" ON public.cart FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cart" ON public.cart FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart" ON public.cart FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart" ON public.cart FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON public.cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_is_cleared ON public.cart(is_cleared);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.handle_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update timestamp trigger
CREATE TRIGGER set_cart_updated_at BEFORE UPDATE ON public.cart
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

## Step 3: Configure Authentication
1. Go to "Authentication" > "Providers" in Supabase
2. Make sure "Email" is enabled
3. Optional: For testing, disable email confirmation:
   - Go to "Authentication" > "Settings"
   - Uncheck "Enable email confirmations"

## Step 4: Test Your Setup
1. Run `npm run dev` in your project
2. Open http://localhost:5173
3. Add items to cart
4. Visit cart page - auth dialog should appear
5. Sign up with test credentials
6. Check Supabase dashboard to see user and cart data

## Verification Checklist
- ✅ SQL script executed without errors
- ✅ `users` table created
- ✅ `cart` table created
- ✅ RLS policies enabled
- ✅ Email provider enabled in Authentication
- ✅ Development server running

## Common Issues

**Problem**: "new row violates row-level security policy"
- **Solution**: Make sure you ran the RLS policies section

**Problem**: User can't sign up
- **Solution**: Check if email provider is enabled and email confirmation is configured

**Problem**: Cart not syncing
- **Solution**: Check browser console for errors and verify user is authenticated

**Problem**: "relation does not exist"
- **Solution**: Make sure you ran the SQL in the correct order and all tables were created

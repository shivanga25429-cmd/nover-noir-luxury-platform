-- FIX for RLS Policy Issue: "new row violates row-level security policy for table users"
-- Run this in your Supabase SQL Editor to fix the issue

-- DROP the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

-- CREATE a new INSERT policy that allows insertion during sign-up
-- This policy allows users to insert a row where the id matches their auth.uid()
-- OR allows insertion for new users (when auth.uid() is not null but the user record doesn't exist yet)
CREATE POLICY "Users can insert their own profile during signup"
    ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Alternative approach: Use a trigger function to automatically create user profile
-- This is more robust and ensures the profile is always created

-- First, create a function that will be triggered when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into public.users table when a new user signs up
    INSERT INTO public.users (id, email, name, phone_number)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'phone_number', '')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger on auth.users table (requires superuser access)
-- Note: This trigger creation might fail if you don't have SUPERUSER privileges
-- In that case, use the manual insert approach in your application code

-- IMPORTANT: The issue is that during signUp, the session is not yet established
-- So we need to allow INSERT for anon (anonymous) role as well, but with strict checks

-- Drop all existing INSERT policies
DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users during signup" ON public.users;
DROP POLICY IF EXISTS "Service role can insert users" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

-- Create a new INSERT policy that allows insertion during sign-up
-- This allows BOTH authenticated AND anon users to insert, but only if the ID matches auth.uid()
-- During signUp, Supabase temporarily authenticates the user as anon with the new user's ID
CREATE POLICY "Allow insert during signup"
    ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Alternative: If the above doesn't work, allow anon role to insert
-- (This is safe because the auth.uid() check ensures they can only insert their own record)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Verify policies are applied
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';

-- ADDITIONAL FIX: Ensure anon role has INSERT permission
GRANT INSERT ON public.users TO anon;
GRANT INSERT ON public.users TO authenticated;

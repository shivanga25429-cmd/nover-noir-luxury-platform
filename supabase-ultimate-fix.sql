-- ULTIMATE FIX for RLS Policy Issue
-- This creates a database trigger that automatically creates the user profile
-- The trigger runs with SECURITY DEFINER, bypassing RLS policies

-- Step 1: Drop the existing INSERT policy that's causing issues
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON public.users;
DROP POLICY IF EXISTS "Allow insert during signup" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users during signup" ON public.users;

-- Step 2: Create a function that will automatically create user profiles
-- This function runs with SECURITY DEFINER, which means it bypasses RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, phone_number)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Create a trigger on auth.users that fires after a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Keep only SELECT and UPDATE policies for users table
-- Users can view their own profile
CREATE POLICY "Users can view their own profile"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Step 5: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.users TO postgres, service_role;
GRANT SELECT, UPDATE ON public.users TO authenticated;

-- Step 6: Verify the setup
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;

-- Step 7: Test the trigger
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'users' AND trigger_schema = 'public';

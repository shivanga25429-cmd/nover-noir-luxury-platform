# 🔧 FIX: RLS Policy Error - "new row violates row-level security policy for table users"

## Problem

When users try to sign up, they get this error:
```json
{
    "code": "42501",
    "details": null,
    "hint": null,
    "message": "new row violates row-level security policy for table \"users\""
}
```

## Root Cause

The original RLS INSERT policy was too restrictive:

```sql
CREATE POLICY "Users can insert their own profile"
    ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);
```

**Problem:** This policy doesn't specify the `TO` clause, which means it applies to the default role. During sign-up, the INSERT happens with the `authenticated` role, but the policy check might fail due to timing/session issues.

---

## ✅ Solution (Quick Fix)

### Option 1: Run the Fix SQL (Recommended)

1. Open **Supabase Dashboard** → **SQL Editor**
2. Copy and paste the contents of `supabase-fix-rls.sql`
3. Click **RUN**

This will:
- Drop the old restrictive policy
- Create a new policy that explicitly allows `authenticated` users to insert their profile
- The new policy ensures `auth.uid() = id` during insert

### Option 2: Manual Fix in Supabase

Run this in your Supabase SQL Editor:

```sql
-- Drop the old policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

-- Create new policy with explicit role
CREATE POLICY "Enable insert for authenticated users during signup"
    ON public.users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);
```

---

## 🔍 Explanation

### What Changed?

**Before:**
```sql
CREATE POLICY "Users can insert their own profile"
    ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);
```
- No explicit role specified
- Can fail during sign-up flow

**After:**
```sql
CREATE POLICY "Enable insert for authenticated users during signup"
    ON public.users
    FOR INSERT
    TO authenticated  -- ← Explicitly for authenticated role
    WITH CHECK (auth.uid() = id);
```
- Explicitly applies to `authenticated` role
- Works correctly during sign-up flow

### Why Does This Work?

When `supabase.auth.signUp()` is called:

1. ✅ Supabase creates the auth user in `auth.users`
2. ✅ User is immediately authenticated
3. ✅ `auth.uid()` returns the new user's ID
4. ✅ INSERT into `public.users` now passes RLS check
5. ✅ Profile created successfully

---

## 🧪 Testing

### Test Sign-Up Flow:

1. **Clear existing data** (if testing):
   ```sql
   -- In Supabase SQL Editor
   DELETE FROM public.users WHERE email = 'test@example.com';
   DELETE FROM auth.users WHERE email = 'test@example.com';
   ```

2. **Run the fix SQL**:
   - Execute `supabase-fix-rls.sql` in SQL Editor

3. **Test sign-up** in your app:
   - Go to http://localhost:8081/cart
   - Auth dialog appears
   - Fill in sign-up form:
     - Name: Test User
     - Phone: 1234567890
     - Email: test@example.com
     - Password: test123
   - Click "Sign Up"
   - ✅ Should succeed without RLS error

4. **Verify in database**:
   ```sql
   SELECT * FROM public.users WHERE email = 'test@example.com';
   ```
   - Should see the user record

---

## 📊 Understanding RLS Roles

### Supabase Roles:

| Role | When Used | Description |
|------|-----------|-------------|
| `anon` | Public access | Used for unauthenticated requests |
| `authenticated` | After login | Used for logged-in users |
| `service_role` | Server-side | Bypasses all RLS (never use in client) |

### Our Policy Targets:

```sql
TO authenticated  -- Only applies to logged-in users
```

This ensures the policy only activates when a user is authenticated (which happens immediately after sign-up).

---

## 🔐 Security Notes

### Is This Secure?

✅ **YES!** The policy still enforces:

```sql
WITH CHECK (auth.uid() = id)
```

This means:
- Users can **ONLY** insert a row where `id` matches their `auth.uid()`
- Users **CANNOT** insert rows for other users
- The `authenticated` role is properly scoped to the signed-in user

### What's Protected?

✅ User can only create their own profile  
✅ User cannot create profiles for others  
✅ User cannot modify other users' data  
✅ All other RLS policies remain unchanged  

---

## 🚀 Alternative Approach: Database Trigger

If you prefer a more automated approach, you can use a database trigger to auto-create user profiles.

### Create Trigger Function:

```sql
-- Run in Supabase SQL Editor
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
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

-- Create trigger (requires SUPERUSER - may not work on Supabase free tier)
-- If this fails, stick with the RLS policy fix above
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
```

**Note:** Trigger approach requires storing metadata during sign-up:

```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name: name,
      phone_number: phoneNumber,
    }
  }
});
```

---

## 📋 Checklist

- [ ] Run `supabase-fix-rls.sql` in Supabase SQL Editor
- [ ] Test sign-up with new account
- [ ] Verify no RLS error appears
- [ ] Check `public.users` table has new record
- [ ] Test sign-in with the new account
- [ ] Verify cart sync works

---

## 🛠️ If Issue Persists

### 1. Check Current Policies:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';
```

### 2. Check Auth Session:

In your browser console during sign-up:
```javascript
const { data } = await supabase.auth.getSession();
console.log('Session:', data.session);
console.log('User ID:', data.session?.user?.id);
```

### 3. Check Supabase Logs:

- Go to **Supabase Dashboard** → **Logs** → **Postgres Logs**
- Look for RLS-related errors during sign-up

### 4. Nuclear Option - Disable RLS Temporarily:

```sql
-- ONLY FOR TESTING - NOT FOR PRODUCTION
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Test sign-up

-- RE-ENABLE IMMEDIATELY
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

---

## 📝 Summary

### What We Fixed:

1. ❌ **Old Policy:** Generic INSERT policy without explicit role
2. ✅ **New Policy:** Explicit `TO authenticated` with same security check
3. ✅ **Result:** Sign-up now works without RLS errors

### Files Updated:

- ✅ `supabase-fix-rls.sql` - Fix script (run this in Supabase)
- ✅ `supabase-setup.sql` - Updated for future deployments

### Quick Fix Command:

```bash
# Just run the fix SQL in Supabase SQL Editor:
# Copy contents of supabase-fix-rls.sql → Paste → Run
```

---

## 🎉 Expected Outcome

After running the fix:

✅ Users can sign up successfully  
✅ User profiles created in `public.users`  
✅ No RLS policy violation errors  
✅ Cart sync works after sign-up  
✅ User dashboard shows profile  
✅ All security still enforced  

---

**Run `supabase-fix-rls.sql` in your Supabase SQL Editor now to fix the issue!** 🚀

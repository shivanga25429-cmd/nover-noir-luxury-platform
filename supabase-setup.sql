-- SQL script to create tables in Supabase
-- Run this in your Supabase SQL Editor

-- Create users table (extends auth.users)
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
    items JSONB NOT NULL DEFAULT '[]'::jsonb, -- JSON array of product IDs
    total DECIMAL(10, 2) NOT NULL DEFAULT 0,
    is_cleared BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users during signup"
    ON public.users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Create policies for cart table
CREATE POLICY "Users can view their own cart"
    ON public.cart
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart"
    ON public.cart
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
    ON public.cart
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart"
    ON public.cart
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON public.cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_is_cleared ON public.cart(is_cleared);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for cart table
CREATE TRIGGER set_cart_updated_at
    BEFORE UPDATE ON public.cart
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    image TEXT,
    description TEXT,
    fragrance_family TEXT,
    top_notes TEXT[] DEFAULT '{}',
    middle_notes TEXT[] DEFAULT '{}',
    base_notes TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for products
CREATE INDEX IF NOT EXISTS idx_products_name ON public.products(name);
CREATE INDEX IF NOT EXISTS idx_products_fragrance_family ON public.products(fragrance_family);

-- Trigger for products updated_at
CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS and allow public SELECT for products (so the anon client can fetch product data)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on products"
    ON public.products
    FOR SELECT
    USING (true);

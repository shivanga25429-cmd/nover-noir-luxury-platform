-- Add out-of-stock flag to products.
-- Run this in the Supabase SQL Editor for an existing database.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_out_of_stock BOOLEAN NOT NULL DEFAULT FALSE;

-- Coupon support for NOVER NOIR.
-- Run this in Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
  product_ids TEXT[] NULL,
  assigned_user_id UUID NULL REFERENCES public.users(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  expires_after_use BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons USING btree (code);
CREATE INDEX IF NOT EXISTS idx_coupons_assigned_user_id ON public.coupons USING btree (assigned_user_id);
CREATE INDEX IF NOT EXISTS idx_coupons_is_active ON public.coupons USING btree (is_active);

DROP TRIGGER IF EXISTS set_coupons_updated_at ON public.coupons;
CREATE TRIGGER set_coupons_updated_at
  BEFORE UPDATE ON public.coupons
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  coupon_code TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_id UUID NULL REFERENCES public.orders(id) ON DELETE SET NULL,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  locks_coupon BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'confirmed', 'released')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_coupon_id ON public.coupon_redemptions USING btree (coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_user_id ON public.coupon_redemptions USING btree (user_id);
CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_order_id ON public.coupon_redemptions USING btree (order_id);

-- One-time coupons are locked as soon as payment creation starts, so the same
-- code cannot be reused while the order is pending or after it is confirmed.
CREATE UNIQUE INDEX IF NOT EXISTS idx_coupon_redemptions_one_time_lock
  ON public.coupon_redemptions (coupon_id)
  WHERE locks_coupon = TRUE AND status IN ('pending_payment', 'confirmed');

DROP TRIGGER IF EXISTS set_coupon_redemptions_updated_at ON public.coupon_redemptions;
CREATE TRIGGER set_coupon_redemptions_updated_at
  BEFORE UPDATE ON public.coupon_redemptions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS coupon_id UUID NULL REFERENCES public.coupons(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS coupon_code TEXT NULL;

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "coupons_deny_client_access" ON public.coupons;
CREATE POLICY "coupons_deny_client_access"
  ON public.coupons
  FOR ALL
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "coupon_redemptions_deny_client_access" ON public.coupon_redemptions;
CREATE POLICY "coupon_redemptions_deny_client_access"
  ON public.coupon_redemptions
  FOR ALL
  USING (false)
  WITH CHECK (false);

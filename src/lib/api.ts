/**
 * Typed API client for the Next.js backend.
 * Import this in your Vite/React components instead of calling fetch directly.
 *
 * Usage:
 *   import { apiClient } from '@/lib/api';
 *   const client = apiClient(session.access_token);
 *   const orders = await client.orders.list();
 */

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// ─── Types (mirror the server types) ─────────────────────────────────────────

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export type OrderStatus =
  | 'pending_payment'
  | 'payment_failed'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount_amount?: number;
  coupon_id?: string | null;
  coupon_code?: string | null;
  total: number;
  status: OrderStatus;
  tracking_id: string | null;
  address_id: string;
  addresses?: Address;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TrackingTimeline {
  status: string;
  label: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export interface CreatePaymentResponse {
  razorpay_order_id: string;
  amount: number;
  currency: string;
  order_id: string;
  key_id: string;
  prefill: { name: string; email: string; contact: string };
}

export interface CouponValidation {
  code: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  discount_amount: number;
  eligible_subtotal: number;
  eligible_product_ids: string[];
}

// ─── Client factory ──────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error ?? `API error ${res.status}`);
  }
  return json.data as T;
}

export function apiClient(accessToken: string) {
  const fetch_ = <T>(path: string, opts: RequestInit = {}) =>
    apiFetch<T>(path, accessToken, opts);

  return {
    // ── Profile ──────────────────────────────────────────────────────────
    profile: {
      get: () => fetch_<{ id: string; name: string; phone_number: string; email: string }>('/api/user/profile'),
      update: (body: { name?: string; phone_number?: string }) =>
        fetch_<{ id: string; name: string }>('/api/user/profile', {
          method: 'PUT',
          body: JSON.stringify(body),
        }),
    },

    // ── Addresses ────────────────────────────────────────────────────────
    addresses: {
      list: () => fetch_<Address[]>('/api/addresses'),
      get: (id: string) => fetch_<Address>(`/api/addresses/${id}`),
      create: (body: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>) =>
        fetch_<Address>('/api/addresses', { method: 'POST', body: JSON.stringify(body) }),
      update: (id: string, body: Partial<Address>) =>
        fetch_<Address>(`/api/addresses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
      delete: (id: string) =>
        fetch_<{ deleted: boolean }>(`/api/addresses/${id}`, { method: 'DELETE' }),
    },

    // ── Orders ───────────────────────────────────────────────────────────
    orders: {
      list: (page = 1, pageSize = 10) =>
        fetch_<{ orders: Order[]; total: number; page: number; page_size: number }>(
          `/api/orders?page=${page}&page_size=${pageSize}`
        ),
      get: (id: string) => fetch_<Order>(`/api/orders/${id}`),
      track: (id: string) =>
        fetch_<{
          order_id: string;
          tracking_id: string | null;
          status: OrderStatus;
          total: number;
          items: OrderItem[];
          address: Address;
          timeline: TrackingTimeline[];
          placed_at: string;
          last_updated: string;
        }>(`/api/orders/${id}/track`),

      /** Step 1: Create a Razorpay order and get payment details */
      createPayment: (body: {
        items: OrderItem[];
        address_id: string;
        coupon_code?: string;
        notes?: string;
      }) =>
        fetch_<CreatePaymentResponse>('/api/orders/create-payment', {
          method: 'POST',
          body: JSON.stringify(body),
        }),

      /** Step 2: Verify payment after Razorpay checkout completes */
      verifyPayment: (body: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
        order_id: string;
      }) =>
        fetch_<{ order: Order; tracking_id: string; message: string }>(
          '/api/orders/verify-payment',
          { method: 'POST', body: JSON.stringify(body) }
        ),
    },

    // ── Cart ─────────────────────────────────────────────────────────────
    cart: {
      get: () => fetch_<{ id: string; items: string[]; total: number } | null>('/api/cart'),
      sync: (items: string[], total: number) =>
        fetch_<{ id: string; items: string[]; total: number }>('/api/cart', {
          method: 'POST',
          body: JSON.stringify({ items, total }),
        }),
      clear: () => fetch_<{ cleared: boolean }>('/api/cart', { method: 'DELETE' }),
    },

    // ── Products ─────────────────────────────────────────────────────────
    products: {
      list: (params?: { family?: string; q?: string }) => {
        const qs = new URLSearchParams(params as Record<string, string>).toString();
        return fetch_<unknown[]>(`/api/products${qs ? '?' + qs : ''}`);
      },
      get: (id: string) => fetch_<unknown>(`/api/products/${id}`),
    },

    // ── Coupons ─────────────────────────────────────────────────────────
    coupons: {
      validate: (body: { code: string; items: { product_id: string; quantity: number }[] }) =>
        fetch_<CouponValidation>('/api/coupons/validate', {
          method: 'POST',
          body: JSON.stringify(body),
        }),
    },
  };
}

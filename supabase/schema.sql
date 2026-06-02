-- Run this in your Supabase SQL editor

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  address text not null,
  bedroom_count integer not null default 1,
  special_instructions text,
  service_type text not null default 'standard',
  laundry_addon boolean not null default false,
  booking_date date not null,
  booking_time text not null,
  deposit_paid boolean not null default false,
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create index if not exists idx_bookings_date_time on bookings (booking_date, booking_time);
create index if not exists idx_bookings_deposit on bookings (deposit_paid, booking_date);

-- Optional: enable RLS and allow service role only (API uses service key)
alter table bookings enable row level security;

-- No public policies — all access via server-side service role key

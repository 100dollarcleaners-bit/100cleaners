-- Run in Supabase SQL Editor if checkout fails (missing columns on older table)

alter table bookings add column if not exists service_type text not null default 'standard';
alter table bookings add column if not exists laundry_addon boolean not null default false;

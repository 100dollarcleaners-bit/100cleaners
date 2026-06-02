export interface BookingFormData {
  laundryAddon: boolean;
  address: string;
  bedroomCount: number;
  specialInstructions: string;
  bookingDate: string;
  bookingTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface BookingRecord {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  bedroom_count: number;
  special_instructions: string | null;
  service_type: string;
  laundry_addon: boolean;
  booking_date: string;
  booking_time: string;
  deposit_paid: boolean;
  stripe_session_id: string | null;
  created_at: string;
}

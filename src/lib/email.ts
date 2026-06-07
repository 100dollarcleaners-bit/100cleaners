import { Resend } from "resend";
import {
  formatDate,
  formatTimeLabel,
  getBookingServiceLabel,
  getBookingServiceTotal,
} from "./booking-utils";
import { BRAND_NAME } from "./constants";
import type { BookingRecord } from "./types";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

function buildBookingSummary(booking: BookingRecord) {
  const serviceTotal = getBookingServiceTotal(booking);
  const serviceLabel = getBookingServiceLabel(booking);

  return `
    <h2 style="color:#0f1729;font-family:Georgia,serif;">Booking Confirmed</h2>
    <p>Thank you, ${booking.customer_name}. Your deposit has been received and your clean is confirmed.</p>
    <table style="width:100%;border-collapse:collapse;margin:24px 0;">
      <tr><td style="padding:8px 0;color:#666;">Service</td><td style="padding:8px 0;">${serviceLabel}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Total (due at service)</td><td style="padding:8px 0;font-weight:600;">$${serviceTotal}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Date</td><td style="padding:8px 0;">${formatDate(booking.booking_date)}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Time</td><td style="padding:8px 0;">${formatTimeLabel(booking.booking_time)}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Address</td><td style="padding:8px 0;">${booking.address}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Bedrooms</td><td style="padding:8px 0;">${booking.bedroom_count}</td></tr>
      ${booking.special_instructions ? `<tr><td style="padding:8px 0;color:#666;">Notes</td><td style="padding:8px 0;">${booking.special_instructions}</td></tr>` : ""}
    </table>
    <p style="color:#666;font-size:14px;">Deposit paid: $25. Balance due on the day of your clean.</p>
    <p style="color:#666;font-size:14px;">Questions? Reply to this email or call us anytime.</p>
  `;
}

export async function sendBookingConfirmationEmails(booking: BookingRecord) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL ?? "bookings@100cleaner.com";
  const ownerEmail =
    process.env.BUSINESS_OWNER_EMAIL ?? "100dollarcleaners@gmail.com";

  const html = buildBookingSummary(booking);

  await resend.emails.send({
    from: `${BRAND_NAME} <${from}>`,
    to: booking.customer_email,
    subject: `Your cleaning is confirmed — ${BRAND_NAME}`,
    html,
  });

  if (ownerEmail) {
    await resend.emails.send({
      from: `${BRAND_NAME} Bookings <${from}>`,
      to: ownerEmail,
      subject: `New booking: ${booking.customer_name} — ${formatDate(booking.booking_date)}`,
      html: `
        <h2>New Booking</h2>
        ${html}
        <hr />
        <p><strong>Contact:</strong> ${booking.customer_name}<br/>
        ${booking.customer_phone}<br/>
        ${booking.customer_email}</p>
        <p><strong>Booking ID:</strong> ${booking.id}</p>
      `,
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getBookedSlotsForDate } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Valid date parameter required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  try {
    const booked = await getBookedSlotsForDate(date);
    return NextResponse.json({ booked });
  } catch (error) {
    console.error("Slots error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

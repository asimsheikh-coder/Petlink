import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const petType = searchParams.get("petType")
    const breed = searchParams.get("breed")
    const coat = searchParams.get("coat")
    const gender = searchParams.get("gender")

    if (!petType || !breed || !coat || !gender) {
      return NextResponse.json({ error: "Missing search parameters" }, { status: 400 })
    }

    // Find opposite gender
    const oppositeGender = gender === "male" ? "female" : "male"

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("pet_type", petType)
      .eq("breed", breed)
      .eq("coat", coat)
      .eq("gender", oppositeGender)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to search pets" }, { status: 500 })
    }

    return NextResponse.json({ matches: data || [] })
  } catch (error) {
    console.error("[v0] Error in search-pets API:", error)
    return NextResponse.json({ error: "Failed to search pets" }, { status: 500 })
  }
}

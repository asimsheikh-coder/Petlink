import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File
    const petType = formData.get("petType") as string
    const breed = formData.get("breed") as string
    const coat = formData.get("coat") as string
    const gender = formData.get("gender") as string
    const location = formData.get("location") as string
    const ownerName = formData.get("ownerName") as string
    const ownerContact = formData.get("ownerContact") as string

    if (!image || !petType || !breed || !coat || !gender || !location || !ownerName || !ownerContact) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upload image to Vercel Blob
    const blob = await put(image.name, image, {
      access: "public",
      addRandomSuffix: true,
    })

    // Save to database
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("pets")
      .insert({
        image_url: blob.url,
        pet_type: petType,
        breed,
        coat,
        gender,
        location,
        owner_name: ownerName,
        owner_contact: ownerContact,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to save pet data" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error in upload-pet API:", error)
    return NextResponse.json({ error: "Failed to upload pet" }, { status: 500 })
  }
}

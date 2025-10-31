import { type NextRequest, NextResponse } from "next/server"

// Fake AI detection API that simulates pet detection
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Randomly determine if it's a cat or dog (or error for demo)
    const random = Math.random()

    if (random < 0.05) {
      // 5% chance of error
      return NextResponse.json({
        type: "error",
        message: "Could not detect pet in image. Please upload a clear photo of a cat or dog.",
      })
    }

    const isCat = random < 0.5

    // Mock data for cats
    const catBreeds = ["Persian", "Siamese", "Maine Coon", "British Shorthair", "Ragdoll", "Bengal", "Sphynx"]
    const catCoats = ["Short", "Long", "Medium", "Hairless"]

    // Mock data for dogs
    const dogBreeds = ["Golden Retriever", "Labrador", "German Shepherd", "Bulldog", "Poodle", "Beagle", "Husky"]
    const dogCoats = ["Short", "Long", "Medium", "Curly", "Wire"]

    const type = isCat ? "cat" : "dog"
    const breed = isCat
      ? catBreeds[Math.floor(Math.random() * catBreeds.length)]
      : dogBreeds[Math.floor(Math.random() * dogBreeds.length)]
    const coat = isCat
      ? catCoats[Math.floor(Math.random() * catCoats.length)]
      : dogCoats[Math.floor(Math.random() * dogCoats.length)]

    return NextResponse.json({
      type,
      breed,
      coat,
    })
  } catch (error) {
    console.error("[v0] Error in detect-pet API:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

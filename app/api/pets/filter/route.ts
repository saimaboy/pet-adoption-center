import { type NextRequest, NextResponse } from "next/server"
import { calculateMood } from "@/utils/mood-logic"

// GET /api/pets/filter?mood=<mood> - Filter pets by mood
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mood = searchParams.get("mood")

  if (!mood) {
    return NextResponse.json({ error: "Mood parameter is required" }, { status: 400 })
  }

  // Update moods before filtering
  const updatedPets = global.pets.map((pet) => ({
    ...pet,
    mood: calculateMood(pet),
  }))

  // Filter pets by the specified mood
  const filteredPets = updatedPets.filter((pet) => pet.mood === mood)

  return NextResponse.json(filteredPets)
}

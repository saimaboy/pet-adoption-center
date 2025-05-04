import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import type { Pet } from "@/types/pet"
import { calculateMood } from "@/utils/mood-logic"

// In-memory database for pets
let pets: Pet[] = []

// GET /api/pets - Get all pets
export async function GET() {
  // Update moods before returning
  pets = pets.map((pet) => ({
    ...pet,
    mood: calculateMood(pet),
  }))

  return NextResponse.json(pets)
}

// POST /api/pets - Add a new pet
export async function POST(request: NextRequest) {
  const body = await request.json()

  // Validate required fields
  if (!body.name || !body.species || body.age === undefined || !body.personality) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const newPet: Pet = {
    id: uuidv4(),
    name: body.name,
    species: body.species,
    age: body.age,
    personality: body.personality,
    mood: "Happy", // Default mood for new pets
    adopted: false,
    // No adoption_date for new pets
  }

  pets.push(newPet)

  return NextResponse.json(newPet, { status: 201 })
}

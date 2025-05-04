import { type NextRequest, NextResponse } from "next/server"
import type { Pet } from "@/types/pet"
import { calculateMood } from "@/utils/mood-logic"

// In-memory database reference (shared with the main route)
declare global {
  var pets: Pet[]
}

// GET /api/pets/:id - Get a single pet
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const pet = global.pets?.find((p) => p.id === id)

  if (!pet) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 })
  }

  // Update mood before returning
  const updatedPet = {
    ...pet,
    mood: calculateMood(pet),
  }

  return NextResponse.json(updatedPet)
}

// PUT /api/pets/:id - Update a pet
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()

  const petIndex = global.pets?.findIndex((p) => p.id === id)

  if (petIndex === -1) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 })
  }

  // Update only allowed fields
  const updatedPet = {
    ...global.pets[petIndex],
    name: body.name || global.pets[petIndex].name,
    species: body.species || global.pets[petIndex].species,
    age: body.age !== undefined ? body.age : global.pets[petIndex].age,
    personality: body.personality || global.pets[petIndex].personality,
  }

  global.pets[petIndex] = updatedPet

  return NextResponse.json(updatedPet)
}

// DELETE /api/pets/:id - Delete a pet
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const petIndex = global.pets?.findIndex((p) => p.id === id)

  if (petIndex === -1) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 })
  }

  // Remove the pet from the array
  global.pets.splice(petIndex, 1)

  return NextResponse.json({ success: true })
}

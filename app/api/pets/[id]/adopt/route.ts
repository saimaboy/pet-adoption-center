import { type NextRequest, NextResponse } from "next/server"

// PATCH /api/pets/:id/adopt - Adopt a pet
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const petIndex = global.pets?.findIndex((p) => p.id === id)

  if (petIndex === -1) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 })
  }

  // Check if the pet is already adopted
  if (global.pets[petIndex].adopted) {
    return NextResponse.json({ error: "Pet is already adopted" }, { status: 400 })
  }

  // Update the pet's adoption status
  const updatedPet = {
    ...global.pets[petIndex],
    adopted: true,
    adoption_date: new Date().toISOString(),
  }

  global.pets[petIndex] = updatedPet

  return NextResponse.json(updatedPet)
}

import type { Pet } from "@/types/pet"

const API_BASE_URL = "/api/pets"

export async function fetchPets(): Promise<Pet[]> {
  const response = await fetch(API_BASE_URL)
  if (!response.ok) {
    throw new Error("Failed to fetch pets")
  }
  return response.json()
}

export async function fetchPetsByMood(mood: string): Promise<Pet[]> {
  const response = await fetch(`${API_BASE_URL}/filter?mood=${mood}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch pets with mood: ${mood}`)
  }
  return response.json()
}

export async function fetchPet(id: string): Promise<Pet> {
  const response = await fetch(`${API_BASE_URL}/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch pet with id: ${id}`)
  }
  return response.json()
}

export async function addPet(pet: Omit<Pet, "id" | "mood" | "adopted" | "adoption_date">): Promise<Pet> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  })
  if (!response.ok) {
    throw new Error("Failed to add pet")
  }
  return response.json()
}

export async function updatePet(id: string, pet: Partial<Pet>): Promise<Pet> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  })
  if (!response.ok) {
    throw new Error(`Failed to update pet with id: ${id}`)
  }
  return response.json()
}

export async function adoptPet(id: string): Promise<Pet> {
  const response = await fetch(`${API_BASE_URL}/${id}/adopt`, {
    method: "PATCH",
  })
  if (!response.ok) {
    throw new Error(`Failed to adopt pet with id: ${id}`)
  }
  return response.json()
}

export async function deletePet(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error(`Failed to delete pet with id: ${id}`)
  }
}

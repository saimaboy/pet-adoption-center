import type { Pet } from "@/types/pet"

// Calculate the mood of a pet based on how long it's been in the system
export function calculateMood(pet: Pet): string {
  // If the pet is already adopted, keep its current mood
  if (pet.adopted) {
    return pet.mood
  }

  // For demo purposes, we'll use a random approach to simulate time in the system
  // In a real application, you would use the creation date of the pet
  const randomValue = Math.random()

  if (randomValue < 0.33) {
    return "Happy" // Less than 1 day
  } else if (randomValue < 0.66) {
    return "Excited" // 1-3 days
  } else {
    return "Sad" // More than 3 days
  }
}

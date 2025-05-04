"use client"

import { useState } from "react"
import { PetCard } from "@/components/pet-card"
import type { Pet } from "@/types/pet"
import { Skeleton } from "@/components/ui/skeleton"

interface PetListProps {
  pets: Pet[]
  isLoading: boolean
  onAdopt: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updatedPet: Partial<Pet>) => void
}

export function PetList({ pets, isLoading, onAdopt, onDelete, onUpdate }: PetListProps) {
  const [editingPetId, setEditingPetId] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    setEditingPetId(id)
  }

  const handleCancelEdit = () => {
    setEditingPetId(null)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-medium text-gray-500">No pets available</h3>
        <p className="text-gray-400">Add a new pet to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          onAdopt={onAdopt}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isEditing={editingPetId === pet.id}
          onEdit={handleEdit}
          onCancelEdit={handleCancelEdit}
        />
      ))}
    </div>
  )
}

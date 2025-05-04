"use client"
import type { Pet } from "@/types/pet"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Trash, Edit, Frown, Smile, PartyPopper } from "lucide-react"
import { cn } from "@/lib/utils"
import { EditPetForm } from "@/components/edit-pet-form"

interface PetCardProps {
  pet: Pet
  onAdopt: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updatedPet: Partial<Pet>) => void
  isEditing: boolean
  onEdit: (id: string) => void
  onCancelEdit: () => void
}

export function PetCard({ pet, onAdopt, onDelete, onUpdate, isEditing, onEdit, onCancelEdit }: PetCardProps) {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "Happy":
        return <Smile className="h-4 w-4 text-green-500" />
      case "Excited":
        return <PartyPopper className="h-4 w-4 text-yellow-500" />
      case "Sad":
        return <Frown className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Happy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Excited":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Sad":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  if (isEditing) {
    return (
      <EditPetForm
        pet={pet}
        onUpdate={(updatedPet) => {
          onUpdate(pet.id, updatedPet)
          onCancelEdit()
        }}
        onCancel={onCancelEdit}
      />
    )
  }

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", pet.adopted ? "opacity-70" : "")}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{pet.name}</CardTitle>
          <Badge className={getMoodColor(pet.mood)}>
            <span className="flex items-center gap-1">
              {getMoodIcon(pet.mood)}
              {pet.mood}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1">
          <p>
            <span className="font-medium">Species:</span> {pet.species}
          </p>
          <p>
            <span className="font-medium">Age:</span> {pet.age} {pet.age === 1 ? "year" : "years"}
          </p>
          <p>
            <span className="font-medium">Personality:</span> {pet.personality}
          </p>
          {pet.adopted && (
            <p>
              <span className="font-medium">Adopted on:</span> {new Date(pet.adoption_date!).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!pet.adopted ? (
          <>
            <Button variant="outline" size="sm" onClick={() => onEdit(pet.id)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onAdopt(pet.id)}
              className="bg-pink-600 hover:bg-pink-700"
            >
              <Heart className="h-4 w-4 mr-1" />
              Adopt
            </Button>
          </>
        ) : (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Adopted
          </Badge>
        )}
        <Button variant="destructive" size="sm" onClick={() => onDelete(pet.id)}>
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

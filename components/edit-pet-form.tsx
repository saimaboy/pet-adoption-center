"use client"

import type React from "react"

import { useState } from "react"
import type { Pet } from "@/types/pet"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X } from "lucide-react"

interface EditPetFormProps {
  pet: Pet
  onUpdate: (updatedPet: Partial<Pet>) => void
  onCancel: () => void
}

export function EditPetForm({ pet, onUpdate, onCancel }: EditPetFormProps) {
  const [formData, setFormData] = useState({
    name: pet.name,
    species: pet.species,
    age: pet.age,
    personality: pet.personality,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSpeciesChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      species: value,
    }))
  }

  const handlePersonalityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      personality: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
  }

  return (
    <Card className="border-2 border-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Edit {pet.name}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-species">Species</Label>
            <Select value={formData.species} onValueChange={handleSpeciesChange}>
              <SelectTrigger id="edit-species">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dog">Dog</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Bird">Bird</SelectItem>
                <SelectItem value="Rabbit">Rabbit</SelectItem>
                <SelectItem value="Hamster">Hamster</SelectItem>
                <SelectItem value="Fish">Fish</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-age">Age</Label>
            <Input
              id="edit-age"
              name="age"
              type="number"
              min="0"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-personality">Personality</Label>
            <Select value={formData.personality} onValueChange={handlePersonalityChange}>
              <SelectTrigger id="edit-personality">
                <SelectValue placeholder="Select personality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Shy">Shy</SelectItem>
                <SelectItem value="Energetic">Energetic</SelectItem>
                <SelectItem value="Calm">Calm</SelectItem>
                <SelectItem value="Playful">Playful</SelectItem>
                <SelectItem value="Independent">Independent</SelectItem>
                <SelectItem value="Curious">Curious</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button type="submit">
            <Check className="h-4 w-4 mr-1" />
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

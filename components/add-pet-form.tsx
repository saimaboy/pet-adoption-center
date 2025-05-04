"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Pet } from "@/types/pet"
import { PlusCircle } from "lucide-react"

interface AddPetFormProps {
  onAddPet: (pet: Omit<Pet, "id" | "mood" | "adopted" | "adoption_date">) => void
}

export function AddPetForm({ onAddPet }: AddPetFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: 0,
    personality: "",
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
    onAddPet(formData)
    setFormData({
      name: "",
      species: "",
      age: 0,
      personality: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a New Pet</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Pet name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="species">Species</Label>
            <Select value={formData.species} onValueChange={handleSpeciesChange} required>
              <SelectTrigger id="species">
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
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="0"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age in years"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personality">Personality</Label>
            <Select value={formData.personality} onValueChange={handlePersonalityChange} required>
              <SelectTrigger id="personality">
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
        <CardFooter>
          <Button type="submit" className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Pet
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

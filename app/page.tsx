"use client"

import { useState, useEffect } from "react"
import { PetList } from "@/components/pet-list"
import { AddPetForm } from "@/components/add-pet-form"
import { FilterBar } from "@/components/filter-bar"
import type { Pet } from "@/types/pet"
import { fetchPets, addPet, updatePet, adoptPet, deletePet } from "@/services/api"

export default function HomePage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentMood, setCurrentMood] = useState<string | null>(null)

  const loadPets = async () => {
    setIsLoading(true)
    try {
      const fetchedPets = await fetchPets()
      setPets(fetchedPets)
      setFilteredPets(fetchedPets)
      setError(null)
    } catch (err) {
      setError("Failed to load pets. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPets()
  }, [])

  const handleAddPet = async (newPet: Omit<Pet, "id" | "mood" | "adopted" | "adoption_date">) => {
    try {
      await addPet(newPet)
      loadPets()
    } catch (err) {
      setError("Failed to add pet. Please try again.")
      console.error(err)
    }
  }

  const handleUpdatePet = async (id: string, updatedPet: Partial<Pet>) => {
    try {
      await updatePet(id, updatedPet)
      loadPets()
    } catch (err) {
      setError("Failed to update pet. Please try again.")
      console.error(err)
    }
  }

  const handleAdoptPet = async (id: string) => {
    try {
      await adoptPet(id)
      loadPets()
    } catch (err) {
      setError("Failed to adopt pet. Please try again.")
      console.error(err)
    }
  }

  const handleDeletePet = async (id: string) => {
    try {
      await deletePet(id)
      loadPets()
    } catch (err) {
      setError("Failed to delete pet. Please try again.")
      console.error(err)
    }
  }

  const handleFilterByMood = (mood: string | null) => {
    setCurrentMood(mood)
    if (mood) {
      setFilteredPets(pets.filter((pet) => pet.mood === mood))
    } else {
      setFilteredPets(pets)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Virtual Pet Adoption Center</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <FilterBar onFilterByMood={handleFilterByMood} currentMood={currentMood} />
          <PetList
            pets={filteredPets}
            isLoading={isLoading}
            onAdopt={handleAdoptPet}
            onDelete={handleDeletePet}
            onUpdate={handleUpdatePet}
          />
        </div>
        <div>
          <AddPetForm onAddPet={handleAddPet} />
        </div>
      </div>
    </div>
  )
}

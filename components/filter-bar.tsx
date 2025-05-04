"use client"

import { Button } from "@/components/ui/button"
import { Frown, PartyPopper, Smile } from "lucide-react"

interface FilterBarProps {
  onFilterByMood: (mood: string | null) => void
  currentMood: string | null
}

export function FilterBar({ onFilterByMood, currentMood }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm font-medium mr-2">Filter by mood:</span>
      <Button
        variant={currentMood === null ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterByMood(null)}
        className="rounded-full"
      >
        All
      </Button>
      <Button
        variant={currentMood === "Happy" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterByMood("Happy")}
        className="rounded-full flex items-center gap-1"
      >
        <Smile className="h-4 w-4 text-green-500" />
        Happy
      </Button>
      <Button
        variant={currentMood === "Excited" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterByMood("Excited")}
        className="rounded-full flex items-center gap-1"
      >
        <PartyPopper className="h-4 w-4 text-yellow-500" />
        Excited
      </Button>
      <Button
        variant={currentMood === "Sad" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterByMood("Sad")}
        className="rounded-full flex items-center gap-1"
      >
        <Frown className="h-4 w-4 text-red-500" />
        Sad
      </Button>
    </div>
  )
}

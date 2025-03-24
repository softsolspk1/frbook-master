"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

export function CourseInfoForm() {
  const [faqs, setFaqs] = useState<{ id: string; question: string; answer: string }[]>([])
  const [requirements, setRequirements] = useState<{ id: string; text: string }[]>([])
  const [outcomes, setOutcomes] = useState<{ id: string; text: string }[]>([])

  const [newFaqQuestion, setNewFaqQuestion] = useState("")
  const [newFaqAnswer, setNewFaqAnswer] = useState("")
  const [newRequirement, setNewRequirement] = useState("")
  const [newOutcome, setNewOutcome] = useState("")

  const handleAddFaq = () => {
    if (newFaqQuestion.trim() === "" || newFaqAnswer.trim() === "") {
      return
    }

    const newFaq = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion,
      answer: newFaqAnswer,
    }

    setFaqs([...faqs, newFaq])
    setNewFaqQuestion("")
    setNewFaqAnswer("")
  }

  const handleAddRequirement = () => {
    if (newRequirement.trim() === "") {
      return
    }

    const requirement = {
      id: `req-${Date.now()}`,
      text: newRequirement,
    }

    setRequirements([...requirements, requirement])
    setNewRequirement("")
  }

  const handleAddOutcome = () => {
    if (newOutcome.trim() === "") {
      return
    }

    const outcome = {
      id: `out-${Date.now()}`,
      text: newOutcome,
    }

    setOutcomes([...outcomes, outcome])
    setNewOutcome("")
  }

  const handleRemoveFaq = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id))
  }

  const handleRemoveRequirement = (id: string) => {
    setRequirements(requirements.filter((req) => req.id !== id))
  }

  const handleRemoveOutcome = (id: string) => {
    setOutcomes(outcomes.filter((out) => out.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Course FAQs</h3>
          <p className="text-sm text-gray-500">Add frequently asked questions about your course</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h4 className="font-medium">{faq.question}</h4>
                  <p className="text-sm">{faq.answer}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveFaq(faq.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="space-y-4 rounded-md border p-4">
            <div className="space-y-2">
              <Label htmlFor="faq-question">Question</Label>
              <Input
                id="faq-question"
                placeholder="Enter FAQ question"
                value={newFaqQuestion}
                onChange={(e) => setNewFaqQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faq-answer">Answer</Label>
              <Textarea
                id="faq-answer"
                placeholder="Enter FAQ answer"
                rows={3}
                value={newFaqAnswer}
                onChange={(e) => setNewFaqAnswer(e.target.value)}
              />
            </div>
            <Button onClick={handleAddFaq}>
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Requirements</h3>
          <p className="text-sm text-gray-500">What do students need to know or have before taking this course?</p>
        </div>

        <div className="space-y-4">
          {requirements.map((requirement) => (
            <div key={requirement.id} className="flex items-center justify-between rounded-md border p-3">
              <span>{requirement.text}</span>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveRequirement(requirement.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2">
            <Input
              placeholder="Add a requirement"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
            />
            <Button onClick={handleAddRequirement}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Outcomes</h3>
          <p className="text-sm text-gray-500">What will students be able to do after completing this course?</p>
        </div>

        <div className="space-y-4">
          {outcomes.map((outcome) => (
            <div key={outcome.id} className="flex items-center justify-between rounded-md border p-3">
              <span>{outcome.text}</span>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveOutcome(outcome.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2">
            <Input placeholder="Add an outcome" value={newOutcome} onChange={(e) => setNewOutcome(e.target.value)} />
            <Button onClick={handleAddOutcome}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


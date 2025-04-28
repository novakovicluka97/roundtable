"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { submitContactForm } from "../actions"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-6 bg-stone-900 border-stone-800">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Name
          </label>
          <Input
            id="name"
            name="name"
            required
            className="bg-stone-800 border-stone-700 focus:border-stone-600 focus:ring-stone-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-stone-800 border-stone-700 focus:border-stone-600 focus:ring-stone-600"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            className="bg-stone-800 border-stone-700 focus:border-stone-600 focus:ring-stone-600"
          />
        </div>
        <Button
          type="submit"
          className="w-full uppercase tracking-wider bg-stone-800 hover:bg-stone-700 text-white border border-stone-700"
          disabled={pending}
        >
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && <p className="text-sm text-center mt-4 text-stone-400">{message}</p>}
      </form>
    </Card>
  )
}

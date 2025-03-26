import Image from "next/image"
import { Quote } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"

// Mock data for testimonials
const testimonials = [
  {
    id: "1",
    content:
      "The courses on this platform have been instrumental in advancing my career. The instructors are knowledgeable and the content is up-to-date with industry standards.",
    name: "Sarah Johnson",
    title: "Frontend Developer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    content:
      "I've taken several courses here and each one has exceeded my expectations. The platform is easy to use and the course materials are comprehensive.",
    name: "Michael Chen",
    title: "Data Scientist",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    content:
      "As someone transitioning into tech, these courses provided me with the practical skills I needed to land my first job. Highly recommended!",
    name: "Jessica Williams",
    title: "UX Designer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted py-16">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">What Our Students Say</h2>
          <p className="mt-2 text-muted-foreground">Hear from our community of learners</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardHeader className="pb-2">
                <Quote className="h-8 w-8 text-primary opacity-50" />
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">"{testimonial.content}"</CardDescription>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


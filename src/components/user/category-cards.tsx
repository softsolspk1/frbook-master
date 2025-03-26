import Link from "next/link"
import { Code, Lightbulb, LineChart, Palette, PenTool, ShoppingBag } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for categories
const categories = [
  {
    id: "development",
    title: "Development",
    description: "Web, Mobile & Software Development",
    icon: Code,
    courses: 85,
  },
  {
    id: "design",
    title: "Design",
    description: "UI/UX, Graphic Design & Illustration",
    icon: Palette,
    courses: 64,
  },
  {
    id: "business",
    title: "Business",
    description: "Entrepreneurship, Marketing & Finance",
    icon: ShoppingBag,
    courses: 42,
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Digital Marketing, SEO & Social Media",
    icon: LineChart,
    courses: 38,
  },
  {
    id: "photography",
    title: "Photography",
    description: "Digital Photography, Editing & Production",
    icon: PenTool,
    courses: 27,
  },
  {
    id: "personal-development",
    title: "Personal Development",
    description: "Leadership, Productivity & Self-Improvement",
    icon: Lightbulb,
    courses: 31,
  },
]

export function CategoryCards() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
          <p className="mt-2 text-muted-foreground">Explore our wide range of courses by category</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/user/courses?category=${category.id}`} className="group">
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-lg bg-muted p-2">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{category.courses} courses</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


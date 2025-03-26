"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Mock data for courses
const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    reviews: 245,
    instructor: "John Doe",
    price: 49.99,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts and modern frameworks like React and Vue.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Development",
    level: "Intermediate",
    rating: 4.9,
    reviews: 189,
    instructor: "Jane Smith",
    price: 69.99,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Design",
    level: "Beginner",
    rating: 4.7,
    reviews: 156,
    instructor: "Robert Johnson",
    price: 59.99,
  },
  {
    id: "4",
    title: "Data Science Essentials",
    description: "Introduction to data science, statistics, and machine learning concepts.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.9,
    reviews: 210,
    instructor: "Emily Davis",
    price: 79.99,
  },
  {
    id: "5",
    title: "Digital Marketing Fundamentals",
    description: "Learn the basics of digital marketing, SEO, and social media strategies.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Marketing",
    level: "Beginner",
    rating: 4.6,
    reviews: 178,
    instructor: "Michael Wilson",
    price: 54.99,
  },
  {
    id: "6",
    title: "Photography Masterclass",
    description: "Learn professional photography techniques and post-processing skills.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Photography",
    level: "All Levels",
    rating: 4.8,
    reviews: 192,
    instructor: "Sarah Brown",
    price: 64.99,
  },
  {
    id: "7",
    title: "Business Analytics",
    description: "Learn how to analyze business data and make data-driven decisions.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Business",
    level: "Intermediate",
    rating: 4.7,
    reviews: 165,
    instructor: "David Lee",
    price: 69.99,
  },
  {
    id: "8",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps using React Native and JavaScript.",
    image: "/placeholder.svg?height=220&width=400",
    category: "Development",
    level: "Intermediate",
    rating: 4.9,
    reviews: 220,
    instructor: "Jennifer Taylor",
    price: 74.99,
  },
]

// Mock data for categories
const categories = [
  { id: "development", name: "Development" },
  { id: "design", name: "Design" },
  { id: "business", name: "Business" },
  { id: "marketing", name: "Marketing" },
  { id: "photography", name: "Photography" },
  { id: "data-science", name: "Data Science" },
]

// Mock data for levels
const levels = [
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
  { id: "all-levels", name: "All Levels" },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("popularity")

  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(course.category.toLowerCase())) {
      return false
    }

    // Filter by level
    if (selectedLevels.length > 0 && !selectedLevels.includes(course.level.toLowerCase())) {
      return false
    }

    // Filter by price range
    if (course.price < priceRange[0] || course.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return Number.parseInt(b.id) - Number.parseInt(a.id)
      default:
        // popularity (by reviews)
        return b.reviews - a.reviews
    }
  })

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleLevelChange = (levelId: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, levelId])
    } else {
      setSelectedLevels(selectedLevels.filter((id) => id !== levelId))
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
          <p className="text-muted-foreground">Browse our collection of courses</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="sm:hidden">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down courses by applying filters</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-mobile-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <Label htmlFor={`category-mobile-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Level</h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`level-mobile-${level.id}`}
                          checked={selectedLevels.includes(level.id)}
                          onCheckedChange={(checked) => handleLevelChange(level.id, checked as boolean)}
                        />
                        <Label htmlFor={`level-mobile-${level.id}`} className="text-sm">
                          {level.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="px-2">
                    <Slider defaultValue={priceRange} max={100} step={1} onValueChange={setPriceRange} />
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filters - Desktop */}
        <div className="hidden space-y-6 md:block">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Level</h3>
            <div className="space-y-2">
              {levels.map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level.id}`}
                    checked={selectedLevels.includes(level.id)}
                    onCheckedChange={(checked) => handleLevelChange(level.id, checked as boolean)}
                  />
                  <Label htmlFor={`level-${level.id}`} className="text-sm">
                    {level.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Price Range</h3>
            <div className="px-2">
              <Slider defaultValue={priceRange} max={100} step={1} onValueChange={setPriceRange} />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="md:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {sortedCourses.length} of {courses.length} courses
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {sortedCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No courses found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategories([])
                  setSelectedLevels([])
                  setPriceRange([0, 100])
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={400}
                      height={220}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{course.category}</Badge>
                      <span className="text-sm text-muted-foreground">{course.level}</span>
                    </div>
                    <CardTitle className="line-clamp-1 text-lg">
                      <Link href={`/user/courses/${course.id}`} className="hover:underline">
                        {course.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(course.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                      </div>
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-muted-foreground">({course.reviews})</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4 pt-0">
                    <span className="text-lg font-bold">${course.price}</span>
                    <Link href={`/user/courses/${course.id}`}>
                      <Button size="sm">View Course</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


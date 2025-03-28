// import Link from "next/link"
// import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// export function UserFooter() {
//   return (
//     <footer className="bg-muted py-12">
//       <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">LMS Platform</h3>
//           <p className="text-sm text-muted-foreground">
//             Empowering learners worldwide with quality education and skill-building opportunities.
//           </p>
//           <div className="flex gap-4">
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="#" aria-label="Facebook">
//                 <Facebook className="h-5 w-5" />
//               </Link>
//             </Button>
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="#" aria-label="Twitter">
//                 <Twitter className="h-5 w-5" />
//               </Link>
//             </Button>
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="#" aria-label="Instagram">
//                 <Instagram className="h-5 w-5" />
//               </Link>
//             </Button>
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="#" aria-label="LinkedIn">
//                 <Linkedin className="h-5 w-5" />
//               </Link>
//             </Button>
//           </div>
//         </div>
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link href="/user/courses" className="text-muted-foreground hover:text-foreground">
//                 All Courses
//               </Link>
//             </li>
//             <li>
//               <Link href="/about" className="text-muted-foreground hover:text-foreground">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link href="/contact" className="text-muted-foreground hover:text-foreground">
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <Link href="/terms" className="text-muted-foreground hover:text-foreground">
//                 Terms of Service
//               </Link>
//             </li>
//             <li>
//               <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
//                 Privacy Policy
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Categories</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link href="/user/courses?category=development" className="text-muted-foreground hover:text-foreground">
//                 Development
//               </Link>
//             </li>
//             <li>
//               <Link href="/user/courses?category=design" className="text-muted-foreground hover:text-foreground">
//                 Design
//               </Link>
//             </li>
//             <li>
//               <Link href="/user/courses?category=business" className="text-muted-foreground hover:text-foreground">
//                 Business
//               </Link>
//             </li>
//             <li>
//               <Link href="/user/courses?category=marketing" className="text-muted-foreground hover:text-foreground">
//                 Marketing
//               </Link>
//             </li>
//             <li>
//               <Link href="/user/courses?category=photography" className="text-muted-foreground hover:text-foreground">
//                 Photography
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Subscribe</h3>
//           <p className="text-sm text-muted-foreground">
//             Subscribe to our newsletter to get updates on new courses and promotions.
//           </p>
//           <div className="flex gap-2">
//             <Input type="email" placeholder="Enter your email" className="max-w-[220px]" />
//             <Button>Subscribe</Button>
//           </div>
//         </div>
//       </div>
//       <div className="container mt-8 border-t pt-8">
//         <p className="text-center text-sm text-muted-foreground">
//           © {new Date().getFullYear()} LMS Platform. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   )
// }

import Link from "next/link"

export const UserFooter = () => {
  return (
    <footer className="w-full py-3 footer-color border-t border-[#e6f7ff]/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center text-center">
          <p className="text-sm text-[#0088cc]">
            © {new Date().getFullYear()} All rights reserved{" "}
            <Link href="https://frbook-master.vercel.app/" className="font-medium hover:underline">
              RESPIRE
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}


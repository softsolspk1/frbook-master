import { CheckCircle2 } from "lucide-react"

interface FinishStepProps {
  userType: "admin" | "student"
}

export function FinishStep({ userType }: FinishStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <h2 className="mt-6 text-2xl font-bold">Ready to Submit</h2>
      <p className="mt-2 max-w-md text-gray-500">
        You've completed all the required information for the new {userType} account. Click the Submit button below to
        create the account.
      </p>
      <p className="mt-6 text-sm text-gray-500">You can edit all account details after submission.</p>
    </div>
  )
}


export default function TestPage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-600">Tailwind Test Page</h1>
        <p className="mt-4 text-gray-700">
          If you can see this text in gray and the heading in blue, Tailwind is working!
        </p>
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">This should have a light red background.</div>
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">This should have a light green background.</div>
        <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-md">This should have a light blue background.</div>
      </div>
    )
  }
  
  
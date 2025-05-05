import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>

        <div className="md:col-span-3">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

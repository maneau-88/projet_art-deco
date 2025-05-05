import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart } from "lucide-react"

export default function CartLoading() {
  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart className="h-6 w-6" />
        <h1 className="text-3xl font-playfair-display font-bold">Votre Panier</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div key={item} className="border rounded-lg p-4">
                <div className="flex gap-4">
                  <Skeleton className="w-24 h-24 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <div className="flex justify-between">
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-6 w-16 mb-2" />
                        <div className="flex items-center justify-end space-x-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
              <div className="pt-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

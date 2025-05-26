import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="space-x-2">
          <Skeleton className="h-9 w-20 inline-block" />
          <Skeleton className="h-9 w-20 inline-block" />
          <Skeleton className="h-9 w-20 inline-block" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-32" />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-5 w-5" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

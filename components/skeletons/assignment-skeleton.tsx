import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function AssignmentCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-6 bg-muted rounded w-48"></div>
          <div className="h-5 bg-muted rounded w-16"></div>
          <div className="h-5 bg-muted rounded w-20"></div>
        </div>
        <div className="h-4 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AssignmentListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <AssignmentCardSkeleton key={i} />
      ))}
    </div>
  );
}

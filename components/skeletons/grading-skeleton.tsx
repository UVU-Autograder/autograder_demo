import { Card, CardContent } from '@/components/ui/card';

export function TestResultSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-muted rounded w-32"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestResultListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <TestResultSkeleton key={i} />
      ))}
    </div>
  );
}

export function GradingFeedbackSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Score Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-muted rounded w-32"></div>
            <div className="h-8 bg-muted rounded w-24"></div>
          </div>
        </CardContent>
      </Card>

      {/* Rubric Scores */}
      <Card>
        <CardContent className="pt-6">
          <div className="h-5 bg-muted rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-muted rounded w-32"></div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardContent className="pt-6">
          <div className="h-5 bg-muted rounded w-24 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

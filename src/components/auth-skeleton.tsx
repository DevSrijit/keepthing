import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function AuthSkeleton() {
  return (
    <main className="relative min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-400 via-background-300 to-background-100">
      {/* Logo Skeleton
      <div className="relative w-full flex justify-center py-4">
        <Skeleton className="w-32 h-8 rounded-lg" />
      </div> */}

      <div className="flex-1 flex flex-col justify-center w-full px-4 py-6">
        <div className="w-full max-w-sm mx-auto space-y-4">
          {/* Hero Text Skeleton */}
          <div className="text-center space-y-2">
            <Skeleton className="h-10 w-3/4 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-2/3 mx-auto rounded-lg" />
          </div>

          {/* Auth Card Skeleton */}
          <Card className="border-none shadow-lg bg-background-50/95 backdrop-blur">
            <CardContent className="space-y-4 pt-4">
              {/* Form Fields Skeleton */}
              <div className="space-y-4">
                {/* Input Fields */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 rounded-lg" /> {/* Label */}
                  <Skeleton className="h-12 w-full rounded-lg" /> {/* Input */}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 rounded-lg" /> {/* Label */}
                  <Skeleton className="h-12 w-full rounded-lg" /> {/* Input */}
                </div>

                {/* Button */}
                <Skeleton className="h-11 w-full rounded-lg" />

                {/* Tabs */}
                <div className="grid w-full grid-cols-2 gap-2 pt-2">
                  <Skeleton className="h-12 rounded-lg" />
                  <Skeleton className="h-12 rounded-lg" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-4">
              {/* Separator with Text */}
              <div className="relative w-full py-2">
                <Skeleton className="h-4 w-32 mx-auto rounded-lg" />
              </div>

              {/* OAuth Buttons */}
              <div className="grid gap-3 w-full">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </CardFooter>
          </Card>

          {/* Footer Text Skeleton */}
          <div className="flex justify-center gap-2 items-center">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
} 
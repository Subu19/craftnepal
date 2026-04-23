import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

interface FeedSkeletonProps {
  count?: number;
}

const FeedSkeleton: React.FC<FeedSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className="bg-white/5 border-white/5 overflow-hidden rounded-2xl"
        >
          <CardHeader className="p-4 sm:p-6 pb-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="h-3 w-20 bg-white/10" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-[90%] bg-white/10" />
              <Skeleton className="h-4 w-[40%] bg-white/10" />
            </div>
            {i % 2 === 0 && (
              <Skeleton className="h-[300px] w-full mt-4 rounded-xl bg-white/10" />
            )}
          </CardContent>
          <CardFooter className="px-6 py-4 border-t border-white/5 flex justify-between bg-white/[0.02]">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-16 bg-white/10 rounded-xl" />
              <Skeleton className="h-8 w-16 bg-white/10 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-20 bg-white/10 rounded-xl hidden sm:block" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeedSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

export const CarouselLoader = () => {
  return (
    <Skeleton className="w-full bg-zinc-200 dark:bg-zinc-800 h-full flex flex-col justify-end items-start">
      <div className="w-full flex flex-col gap-3 px-3 lg:px-9 py-8">
        <Skeleton className="w-[50px] lg:w-[100px] h-3 lg:h-5 bg-zinc-400/50 dark:bg-zinc-700/50" />
        <Skeleton className="w-3/4 lg:w-2/4 h-4 lg:h-6 bg-zinc-400/50 dark:bg-zinc-700/50" />
        <Skeleton className="w-[150px] lg:w-[200px] h-3 lg:h-5 bg-zinc-400/50 dark:bg-zinc-700/50" />
        <Skeleton className="w-3/4 lg:w-2/4 h-10 lg:h-12 bg-zinc-400/50 dark:bg-zinc-700/50" />
        <Skeleton className="w-[40px] lg:w-[100px] h-3 lg:h-5 bg-zinc-400/50 dark:bg-zinc-700/50" />
      </div>
    </Skeleton>
  );
};

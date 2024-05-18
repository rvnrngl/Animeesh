import { Skeleton } from "@/components/ui/skeleton";

export const StreamAnimeLoader = () => {
  return (
    <div className="w-screen min-h-screen dark:bg-zinc-950 space-y-2">
      <section className="w-full grid grid-cols-6 p-2 md:p-5 lg:px-24 xl:px-32 gap-2 lg:gap-x-5">
        <div className="col-span-full lg:col-span-4">
          <Skeleton className="aspect-video bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="col-span-full lg:col-span-2">
          <Skeleton className="w-full px-3 py-2 pb-2 rounded-none bg-zinc-200 dark:bg-zinc-800">
            <Skeleton className="w-2/4 mt-3 h-6 bg-zinc-400/50 dark:bg-zinc-700/50"></Skeleton>
          </Skeleton>
          <Skeleton
            className="py-3 h-[295px] lg:max-h-[310px] overflow-y-scroll overflow-x-hidden rounded-none 
                rounded-b-md bg-zinc-200 dark:bg-zinc-800 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            <div className="w-full grid place-items-center gap-2 px-3">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <Skeleton
                    key={index}
                    className="w-full h-[35px] bg-zinc-400/50 dark:bg-zinc-700/50"
                  ></Skeleton>
                );
              })}
            </div>
          </Skeleton>
        </div>
      </section>
    </div>
  );
};

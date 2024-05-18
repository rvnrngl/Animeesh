import { FaPlay, FaThList } from "react-icons/fa";
import { cn } from "@/lib/utils";

import { Container } from "./Container";
import { Text } from "./Typography/Text";
import { useAnimeStore } from "@/state/store/useAnimeStore";

export const EpisodeList = ({ episodes, currentEp }) => {
  const setCurrentEpisode = useAnimeStore((state) => state.setCurrentEpisode);
  const isSeasonal = episodes.length <= 30;
  return (
    <>
      <Container
        styles={
          "bg-orange-400/70 py-1 px-3 lg:px-5 mb-2 text-zinc-800 flex items-center justify-between"
        }
      >
        <Text styles={"text-zinc-800 inline-flex items-center gap-x-3"}>
          <FaThList />
          <span className="uppercase line-clamp-1">
            {currentEp.title ? currentEp.title : "Episode"}
          </span>
        </Text>
        <Text styles={"text-zinc-800 uppercase justify-self-end"}>
          {currentEp.number}/{episodes.length}
        </Text>
      </Container>
      {isSeasonal ? (
        <Container styles={"h-[120px] lg:h-[290px] overflow-y-scroll"}>
          {episodes.map((item) => {
            return (
              <div
                key={item.number}
                onClick={() => setCurrentEpisode(item)}
                className={cn(
                  " cursor-pointer group mb-[1px]",
                  item.id !== currentEp?.id
                    ? "even:bg-zinc-800 odd:bg-zinc-900 hover:bg-stone-400"
                    : "bg-orange-400/70"
                )}
              >
                <div className="w-full flex items-center justify-start py-1 px-3 gap-x-2 cursor-pointer">
                  <span
                    className={cn(
                      "hidden lg:block font-bold text-base lg:text-lg flex-shrink-0 px-3 cursor-pointer group-hover:text-zinc-700",
                      item.id !== currentEp?.id
                        ? "text-orange-400/70"
                        : "text-zinc-800"
                    )}
                  >
                    {item.number}
                  </span>
                  <Text
                    styles={cn(
                      "flex-grow w-[100px] line-clamp-1 cursor-pointer",
                      item.id !== currentEp?.id
                        ? "group-hover:text-zinc-700"
                        : "text-zinc-800"
                    )}
                  >
                    {item.title ? item.title : `Episode ${item.number}`}
                  </Text>
                  <Text
                    styles={cn(
                      "group-hover:text-zinc-700 cursor-pointer",
                      item.id !== currentEp?.id
                        ? "group-hover:text-zinc-700"
                        : "text-zinc-800"
                    )}
                  >
                    <FaPlay />
                  </Text>
                </div>
              </div>
            );
          })}
        </Container>
      ) : (
        <Container
          styles={
            "h-[165px] lg:h-[290px] overflow-y-scroll grid grid-cols-5 gap-1"
          }
        >
          {episodes.map((item) => {
            return (
              <div
                key={item.number}
                onClick={() => setCurrentEpisode(item)}
                className={cn(
                  " cursor-pointer text-xs md:text-sm flex items-center justify-center py-1 group",
                  item.id !== currentEp?.id
                    ? "bg-zinc-800 hover:bg-stone-400 text-zinc-400 hover:text-zinc-700"
                    : "bg-orange-400/70 text-zinc-800"
                )}
              >
                {item.number}
              </div>
            );
          })}
        </Container>
      )}
    </>
  );
};

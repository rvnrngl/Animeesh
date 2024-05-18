import { GiPreviousButton, GiNextButton } from "react-icons/gi";

import { Container } from "./Container";
import { Text } from "./Typography/Text";
import { useAnimeStore } from "@/state/store/useAnimeStore";

export const VideoControls = ({ episodes, currentEp }) => {
  const setCurrentEpisode = useAnimeStore((state) => state.setCurrentEpisode);
  const firstEp = episodes.find((_, index) => index === 0);
  const lastEp = episodes.find((_, index) => index === episodes.length - 1);

  const episodeNavigationHandler = (navigation) => {
    const episode =
      navigation === "next"
        ? episodes.find((item) => item.number == currentEp.number + 1)
        : episodes.find((item) => item.number == currentEp.number - 1);
    setCurrentEpisode(episode);
  };

  return (
    <Container styles="bg-zinc-900 p-2">
      <div className="w-full flex items-center justify-between">
        <Text styles={"w-1/2 line-clamp-1"}>{currentEp.title}</Text>
        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 text-gray-300">
          <button
            disabled={currentEp.number <= firstEp.number}
            onClick={() => episodeNavigationHandler("prev")}
            className="flex items-center text-center gap-2 enabled:hover:text-orange-400 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500"
          >
            <GiPreviousButton className="text-lg lg:text-xl" />
            <span className="hidden sm:block uppercase text-xs md:text-base">
              prev
            </span>
          </button>
          <Text>|</Text>
          <button
            disabled={currentEp.number >= lastEp.number}
            onClick={() => episodeNavigationHandler("next")}
            className="flex items-center gap-2 enabled:hover:text-orange-400 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500"
          >
            <span className="hidden sm:block uppercase text-xs md:text-base">
              next
            </span>
            <GiNextButton className="text-lg lg:text-xl" />
          </button>
        </div>
      </div>
    </Container>
  );
};

import { MyVideoPlayer } from "@/components/MyVideoPlayer";
import { EpisodeList } from "@/components/EpisodeList";
import { useQuery } from "@tanstack/react-query";
import { getAnimeDetail } from "@/api/requestDetails";
import { useLocation, useParams } from "react-router-dom";
import { useAnimeStore } from "@/state/store/useAnimeStore";
import { AnimeDetail } from "@/components/AnimeDetail";
import { useEffect } from "react";
import { Recommendation } from "@/components/Recommendation";
import { StreamAnimeLoader } from "@/Loaders/StreamAnimeLoader";
import { NotFound } from "@/components/NotFound";
import { currentEpisodeGetter } from "@/utils/currentEpisodeGetter";

export const StreamAnime = () => {
  const { id } = useParams();
  const location = useLocation();
  const { isIdRecent } = location.state || {};

  const currentEpisode = useAnimeStore((state) => state.currentEpisode);
  const setCurrentEpisode = useAnimeStore((state) => state.setCurrentEpisode);

  const { isPending, isError, data } = useQuery({
    queryKey: ["anime-detail", id],
    queryFn: async () => {
      const res = await getAnimeDetail(id);
      return res;
    },
  });

  useEffect(() => {
    if (data && !isIdRecent) {
      setCurrentEpisode(data.episodes[0]);
    } else if (data && isIdRecent) {
      const episodes = data.episodes;
      setCurrentEpisode(episodes[episodes.length - 1]);
    }
  }, [data]);

  if (isPending) {
    return <StreamAnimeLoader />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <div className="w-screen min-h-screen dark:bg-zinc-950 space-y-2">
        <section className="w-full grid grid-cols-6 p-2 md:p-5 lg:px-24 xl:px-32 gap-2 lg:gap-x-5">
          <div className="col-span-full lg:col-span-4">
            <MyVideoPlayer
              episodes={data.episodes}
              currentEp={currentEpisodeGetter(
                data.episodes,
                currentEpisode,
                isIdRecent
              )}
            />
          </div>
          <div className="col-span-full lg:col-span-2">
            <EpisodeList
              episodes={data.episodes}
              currentEp={currentEpisodeGetter(
                data.episodes,
                currentEpisode,
                isIdRecent
              )}
            />
          </div>
        </section>
        <AnimeDetail details={data} />
        {data.recommendations.length > 0 && (
          <div className="px-5">
            <Recommendation recommendations={data.recommendations} />
          </div>
        )}
      </div>
    </>
  );
};

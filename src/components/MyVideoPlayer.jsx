import { useQuery } from "@tanstack/react-query";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";

import { VideoControls } from "./VideoControls";
import { getEpisodeUrl } from "@/api/requestDetails";

export const MyVideoPlayer = ({ episodes, currentEp }) => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["episode-url", currentEp.id],
    queryFn: () => getEpisodeUrl(currentEp.id),
  });

  return (
    <>
      <MediaPlayer
        autoplay
        playsinline
        src={isPending || isError ? "" : data}
        aspectRatio={16 / 9}
        crossorigin=""
      >
        <MediaOutlet></MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer>
      <div className="mt-1">
        <VideoControls episodes={episodes} currentEp={currentEp} />
      </div>
    </>
  );
};

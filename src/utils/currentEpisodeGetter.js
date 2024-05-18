export const currentEpisodeGetter = (episodes, currentEpisode) => {
  if (!currentEpisode) {
    return episodes[0];
  }

  const episode =
    currentEpisode.number !== episodes[0].number ? currentEpisode : episodes[0];

  return episode;
};

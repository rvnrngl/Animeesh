import { FaHeart, FaStar } from "react-icons/fa";
import { Container } from "./Container";
import { Text } from "./Typography/Text";
import { removeTags } from "@/utils/removeTags";

export const AnimeDetail = ({ details }) => {
  return (
    <Container
      styles={
        "w-full flex flex-col items-center md:items-start md:flex-row gap-3 p-2 md:p-5"
      }
    >
      <div className="w-full max-w-[100px] md:max-w-[180px] lg:max-w-[200px] flex-shrink">
        <img
          src={details.image}
          alt={
            details.title.english ? details.title.english : details.title.native
          }
          className="w-full"
        />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col gap-3">
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-zinc-300 line-clamp-1">
            {details.title.english
              ? details.title.english
              : details.title.native}
          </h1>
          <p className="text-xs lg:text-sm italic text-zinc-400 line-clamp-1">
            {details.synonyms.length > 0 && details.synonyms.join(", ")}
          </p>
          <div className="inline-flex gap-x-2">
            <span className="px-1 bg-zinc-400 font-bold text-zinc-700 uppercase text-[8px] text-xs cursor-default">
              {details.status}
            </span>
            <span className="px-1 bg-zinc-400 font-bold text-zinc-700 uppercase text-[8px] text-xs cursor-default">
              {details.isAdult ? "NC-17" : "PG-13"}
            </span>
            <span className="px-1 bg-zinc-400 font-bold text-zinc-700 uppercase text-[8px] text-xs cursor-default">
              {details.subOrDub}
            </span>
            <span className="px-1 bg-rose-400 font-bold text-zinc-700 uppercase text-[8px] text-xs cursor-default gap-x-1 inline-flex items-center">
              <FaHeart className="text-rose-600" />
              {details.popularity}
            </span>
            <span className="px-1 bg-amber-400/80 font-bold text-zinc-700 uppercase text-[8px] text-xs cursor-default gap-x-1 inline-flex items-center">
              <FaStar className="text-amber-600/80" />
              {details.rating}
            </span>
          </div>
          <p className="text-xs lg:text-sm text-zinc-400 text-justify line-clamp-4">
            {removeTags(details.description)}
          </p>
          <div className="grid grid-cols-2 items-start justify-start gap-x-5 text-xs lg:text-sm text-zinc-400 uppercase">
            <div className="col-span-1 flex flex-col">
              <p className="inline-flex items-center gap-x-1">
                <span>Type: </span>
                <span className="text-orange-400">
                  {details.type ? details.type : "?"}
                </span>
              </p>
              <p className="inline-flex items-center gap-x-1">
                <span>Country: </span>
                <span className="text-orange-400">
                  {details.countryOfOrigin ? details.countryOfOrigin : "?"}
                </span>
              </p>
              <p className="inline-flex items-center gap-x-1">
                <span>Season: </span>
                <span className="text-orange-400">
                  {details.season ? details.season : "?"}
                </span>
              </p>
              <p className="inline-flex items-center gap-x-1">
                <span>Release Date: </span>
                <span className="text-orange-400">
                  {details.releaseDate ? details.releaseDate : "?"}
                </span>
              </p>
              <p className="inline-flex flex-wrap items-center gap-x-1">
                <span>Genres: </span>
                {details?.genres.length > 0 ? (
                  details.genres.map((item, index) => {
                    return (
                      <span key={item} className="text-orange-400">
                        {item}
                        {index < details.genres.length - 1 && ", "}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-orange-400">?</span>
                )}
              </p>
            </div>
            <div className="col-span-1 flex flex-col">
              <p className="inline-flex items-center gap-x-1">
                <span>Duration: </span>
                <span className="text-orange-400">
                  {details.duration ? details.duration : "?"}
                </span>
              </p>
              <p className="inline-flex items-center gap-x-1">
                <span>Current Episode: </span>
                <span className="text-orange-400">
                  {details.currentEpisode ? details.currentEpisode : "?"}
                </span>
              </p>
              <p className="inline-flex items-center gap-x-1">
                <span>Total Episodes: </span>
                <span className="text-orange-400">
                  {details.totalEpisodes ? details.totalEpisodes : "?"}
                </span>
              </p>
              <p className="inline-flex flex-wrap items-center gap-x-1">
                <span>Studios: </span>
                {details?.studios.length > 0 ? (
                  details.studios.map((item, index) => {
                    return (
                      <span key={item} className="text-orange-400">
                        {item}
                        {index < details.studios.length - 1 && ", "}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-orange-400">?</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

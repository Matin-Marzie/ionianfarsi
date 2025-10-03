import { ImVolumeMedium } from "react-icons/im";
import { useContext, useEffect } from "react";
import LessonContext from "../../../../../../context/LessonContext";

const MediaWordSentence = () => {
  const { challenge, playSound } = useContext(LessonContext);
  const media_type = challenge?.media_type;

  // Play audio automatically when challenge renders (word or sentence)
  useEffect(() => {
    const audioUrl = challenge?.word?.audio_url || challenge?.sentence?.audio_url;
    if (audioUrl) {
      const timer = setTimeout(() => {
        playSound(audioUrl);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [challenge, playSound]);

  if (!challenge) return null;

  const showPicture = [
    "picture_audio_writtenform_englishequivalent",
    "picture_audio_writtenform",
    "picture",
  ].includes(media_type);

  const showWord = [
    "picture_audio_writtenform_englishequivalent",
    "picture_audio_writtenform",
    "writtenform_audio_englishequivalent",
  ].includes(media_type);

  const showAudioCard = [
    "picture_audio",
    "audio",
    "transliteration",
    "writtenform"
  ].includes(media_type);

  // use whichever exists
  const media = challenge.word || challenge.sentence;

  return (
    <div className="flex flex-col">

      {/* Media question */}
      {challenge.media_question && (
        <h3 className="text-2xl font-semibold mb-4">
          {challenge.media_question}
        </h3>
      )}

      {/* Picture */}
      {showPicture && media?.image_url && (
        <div className="w-full bg-black">
          <img
            src={media.image_url}
            alt={media.written_form || "media image"}
            className="w-auto max-h-[30dvh] mx-auto"
          />
        </div>
      )}

      {/* Word or sentence with audio button */}
      {showWord && media?.written_form && (
        <div className="flex justify-end items-start text-right text-2xl p-2 mb-4 w-full max-w-xl">
          <p className="underline underline-offset-[10px] leading-loose">
            {media.written_form}
          </p>
          {media.audio_url && (
            <button
              className="io-button text-3xl p-2 bg-blue-500 text-white hover:bg-blue-600 ml-4"
              onClick={() => playSound(media.audio_url)}
            >
              <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }} />
            </button>
          )}
        </div>
      )}

      {/* Big audio card */}
      {showAudioCard && media?.audio_url && (
        <div
          className={`text-5xl bg-blue-500 text-white hover:bg-blue-600 rounded-lg w-max mx-auto ${media_type === "picture_audio" || media_type === "audio" ? "io-button" : ""
            }`}
        >
          {media_type === "audio" && (
            <ImVolumeMedium
              className="m-8"
              style={{ transform: "rotateZ(180deg)" }}
              onClick={() => playSound(media.audio_url)}
            />
          )}

          {media_type === "picture_audio" && (
            <img
              src={media.image_url}
              alt={media.written_form}
              className="rounded-[18px] max-h-[30dvh]"
              onClick={() => playSound(media.audio_url)}
            />
          )}

          {media_type === "transliteration" && (
            <div className="mx-2 my-8 min-w-[20dvw] text-center">
              {media.transliteration}
            </div>
          )}

          {media_type === "writtenform" && (
            <div className="mx-2 my-8 min-w-[20dvw] text-center">
              {media.written_form}
            </div>
          )}
        </div>
      )}

      {media_type === "english_equivalent" && (
        <p className="underline underline-offset-[2px] leading-loose">
          {media.english_equivalent}
        </p>
      )}

    </div>
  );
};

export default MediaWordSentence;

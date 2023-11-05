import { BackButton, Button, Typography } from "@/components";
import styles from "./new.module.scss";
import { useRouter } from "next/router";
import { pxToRem } from "@/utils";

const New = () => {
  const { query, ...router } = useRouter();

  const onUploadOptionClick = (option: string) => {
    const newQuery = {
      ...query,
      option,
    };

    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <div className={`${styles["new-podcast-page"]} container`}>
      <BackButton />
      <Typography variant="h1" className={styles["page-title"]}>
        Your Podcasts
      </Typography>
      <div className={styles["upload-options"]}>
        <Button
          borderRadius="curved"
          onClick={() => onUploadOptionClick("youtube")}
        >
          <img
            src="/icons/youtube-icon.svg"
            alt="youtube"
            width={22}
            height={22}
          />
          <Typography color="white">Use YouTube URL</Typography>
        </Button>
        <Button
          buttonType="alternate"
          borderRadius="curved"
          onClick={() => onUploadOptionClick("file")}
        >
          <img
            src="/icons/upload-file-icon.svg"
            alt="upload"
            width={22}
            height={22}
          />
          <Typography color="white">Upload a file</Typography>
        </Button>
        <Button
          borderRadius="curved"
          className={styles["rss-feed-upload"]}
          onClick={() => onUploadOptionClick("rss")}
        >
          <img
            src="/icons/rss-feed-icon.svg"
            alt="rss"
            width={22}
            height={22}
          />
          <Typography color="white">Use RSS Feed</Typography>
        </Button>
      </div>
      {query.option === "youtube" ? (
        <div className={styles["option-card"]}>
          <Typography variant="h4">Use YouTube URL</Typography>
          <div className={styles["input-link-area"]}>
            <img
              src="/icons/youtube-filled-icon.svg"
              alt="youtube"
              width={34}
              height={34}
            />
            <input
              placeholder="https://youtube.com/v=QKVxZ6GAvaCfL3/"
              className={styles["input-link-area-field"]}
            />
            <Button
              buttonType="alternate"
              borderRadius="curved"
              className={styles["input-link-area-button"]}
            >
              <Typography color="white">Add Video</Typography>
            </Button>
          </div>
        </div>
      ) : query.option === "file" ? (
        <div className={styles["option-card"]}>
          <Typography variant="h4">Upload a file</Typography>
          <div className={styles["upload-file-area"]}>
            <img
              src="/icons/upload-file-filled-icon.svg"
              alt="upload"
              width={42}
              height={42}
            />
            <div className={styles["text-area"]}>
              <Typography variant="span" color="gray">
                Click to browse or drag and drop your video or audio files
              </Typography>
              <Typography
                variant="span"
                color="gray"
                style={{ fontSize: pxToRem(10) }}
              >
                Supports: MP3, MP4, MP2, AAC, WAV, FLAC, PCM, M4A, Ogg, Opus,
                WebM
              </Typography>
            </div>
          </div>
        </div>
      ) : query.option === "rss" ? (
        <div className={styles["option-card"]}>
          <Typography variant="h4">Use RSS Feed</Typography>
          <div className={styles["input-link-area"]}>
            <img
              src="/icons/rss-feed-filled-icon.svg"
              alt="youtube"
              width={34}
              height={34}
            />
            <input
              placeholder="https://lexfridman.com/feed/podcast/"
              className={styles["input-link-area-field"]}
            />
            <Button
              buttonType="alternate"
              borderRadius="curved"
              className={styles["input-link-area-button"]}
            >
              <Typography color="white">Use link</Typography>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default New;

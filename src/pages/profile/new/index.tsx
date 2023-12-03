import { BackButton, Button, Typography } from "@/components";
import styles from "./new.module.scss";
import { useRouter } from "next/router";
import { pxToRem } from "@/utils";
import { useContext, useState } from "react";
import { AppContext } from "@/context";
import { firestoreDB, firebase } from "@/firebase";
import { Actions } from "@/enums/actions";

const New = () => {
  const [state, dispatch] = useContext(AppContext);

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

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

  const addVideo = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonlink.io/api/extract?url=${url}&api_key=${process.env.NEXT_PUBLIC_METADATA_API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        const videoSnapshot = await firestoreDB
          .collection("videos")
          .where("email", "==", state.user?.email)
          .where("url", "==", url)
          .get();
        if (videoSnapshot.empty) {
          firestoreDB
            .collection("videos")
            .add({
              thumbnail: data.images[0],
              name: data.title,
              url,
              email: state.user?.email,
              timeStamp: new Date().getTime(),
            })
            .then(async () => {
              const userSnapshot = await firestoreDB
                .collection("users")
                .where("email", "==", state.user?.email)
                .get();
              if (!userSnapshot.empty) {
                const documentRef = firestoreDB
                  .collection("users")
                  .doc(userSnapshot.docs[0].id);
                documentRef
                  .set(
                    {
                      freeCreditsUsed: true,
                    },
                    { merge: true }
                  )
                  .then(async () => {
                    dispatch({
                      type: Actions.SET_USER,
                      payload: {
                        ...state.user,
                        freeCreditsUsed: true,
                      },
                    });
                    const videoSnapshot = await firestoreDB
                      .collection("videos")
                      .where("email", "==", state.user?.email)
                      .where("url", "==", url)
                      .get();
                    const videoDoc = videoSnapshot.docs[0].id;
                    router.push(`/${videoDoc}`);
                    setLoading(false);
                  });
              }
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        } else {
          setLoading(false);
          console.log("This reccord already exists!");
        }
        setUrl("");
      }
    } catch (error: any) {
      console.log(error);
    }
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
          disabled
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
          disabled
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
              type="text"
              placeholder="https://youtube.com/v=QKVxZ6GAvaCfL3/"
              className={styles["input-link-area-field"]}
              value={url}
              defaultValue={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              buttonType="alternate"
              borderRadius="curved"
              className={styles["input-link-area-button"]}
              disabled={!url || loading}
              onClick={() => addVideo()}
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

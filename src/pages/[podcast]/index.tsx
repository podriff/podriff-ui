import { BackButton, Button, Loader, Typography } from "@/components";
import styles from "./podcast.module.scss";
import {
  METADATA_OPTIONS,
  PROMOTION_OPTIONS,
  fetchWrapper,
  pxToRem,
} from "@/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { firestoreDB } from "@/firebase";
import { PodcastMetadata } from "@/interface/PodcastMetadata";

const PodcastDetails: React.FC = () => {
  const [selection, setSelection] = useState<(typeof METADATA_OPTIONS)[0]>({
    label: "Transcript",
    value: "transcript",
    apiParam: "transcript",
  });
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loadingContent, setLoadingContent] = useState(false);
  const [podcastMetadata, setPodcastMetadata] = useState<PodcastMetadata>({
    docId: "",
    name: "",
    timeStamp: "",
    url: "",
    thumbnail: "",
    email: "",
    transcript: "",
    description: "",
    title: "",
    blog: "",
    keywords: "",
    newsletter: "",
    tweets: "",
  });

  const { query } = useRouter();
  const { podcast } = query;

  const fetchResults = async () => {
    try {
      const videoDetails = (
        await firestoreDB
          .collection("videos")
          .doc(podcast as string)
          .get()
      ).data();
      setPodcastMetadata(videoDetails as PodcastMetadata);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const loadContent = async () => {
    try {
      setLoadingContent(true);
      const response = await fetchWrapper.get(
        `https://podriff-api.onrender.com/generate?source_type=youtube&link=${podcastMetadata.url}&content_type=${selection.apiParam}`,
        {
          credentials: "include",
        }
      );
      if (response.content) {
        setContent(response.content);
        const documentRef = firestoreDB
          .collection("videos")
          .doc(podcast as string);
        await documentRef.set(
          {
            [selection.apiParam]: response.content,
          },
          { merge: true }
        );
        const data = await documentRef.get();
        if (data.data()) {
          setPodcastMetadata(data.data() as PodcastMetadata);
        }
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    if (podcast) {
      fetchResults();
    }
  }, [podcast]);

  useEffect(() => {
    if (podcastMetadata.url)
      if (podcastMetadata[selection.apiParam as keyof PodcastMetadata]) {
        setContent(
          podcastMetadata[selection.apiParam as keyof PodcastMetadata] as string
        );
      } else {
        loadContent();
      }
  }, [podcastMetadata, selection.apiParam]);

  return (
    <div className={`${styles["podcast-details"]} container`}>
      <BackButton />
      <div className={styles["title-timestamp-thumbnail"]}>
        <img
          src={podcastMetadata.thumbnail}
          alt="thumbnail"
          className={styles["podcast-thumbnail"]}
        />
        <div>
          <Typography variant="h3" style={{ marginBottom: pxToRem(8) }}>
            {podcastMetadata.name}
          </Typography>
          <div className={styles["podcast-timestamp"]}>
            <div className={styles["podcast-timestamp-label"]}>
              <img
                src={"/icons/calendar-icon.svg"}
                alt="calendar"
                width={12}
                height={13}
              />
              <Typography
                variant="span"
                color="black-light"
                style={{ fontFamily: "Inter-Regular" }}
              >
                {new Date(
                  podcastMetadata.timeStamp as number
                ).toLocaleString()}
              </Typography>
            </div>
            {/* <div className={styles["podcast-timestamp-label"]}>
              <img
                src={"/icons/clock-icon.svg"}
                alt="calendar"
                width={12}
                height={13}
              />
              <Typography
                variant="span"
                color="black-light"
                style={{ fontFamily: "Inter-Regular" }}
              >
                15 minutes
              </Typography>
            </div> */}
          </div>
          {/* <div className={styles["button-container"]}>
            <Button
              className={styles["edit-details-button"]}
              borderRadius="curved"
            >
              <img
                src="/icons/edit-icon.svg"
                alt="edit"
                width={21}
                height={21}
              />
              <Typography color="white">Edit Details</Typography>
            </Button>
            <Button borderRadius="curved">
              <img
                src="/icons/delete-icon.svg"
                alt="delete"
                width={21}
                height={21}
              />
              <Typography color="white">Delete this podcast</Typography>
            </Button>
          </div> */}
        </div>
      </div>
      <hr className={styles["divider"]} />
      <div className={styles["generated-details-container"]}>
        <div className={styles["generated-options-container"]}>
          <div className={styles["options-section"]}>
            <Typography color="black-light" className={styles["option"]}>
              Podcast Metadata
            </Typography>
            {METADATA_OPTIONS.map((md) => (
              <div
                className={`${styles["option"]} ${
                  selection.value === md.value ? styles["selected"] : ""
                }`}
                onClick={() => setSelection(md)}
                key={md.value}
              >
                <img
                  src={`/icons/${md.value}${
                    selection.value === md.value ? "-filled" : ""
                  }-icon.svg`}
                  alt={md.value}
                  width={24}
                  height={24}
                />
                <Typography color="black">{md.label}</Typography>
              </div>
            ))}
          </div>
          <hr className={styles["divider"]} />
          <div className={styles["options-section"]}>
            <Typography color="black-light" className={styles["option"]}>
              Podcast Promotion
            </Typography>
            {PROMOTION_OPTIONS.map((pd) => (
              <div
                className={`${styles["option"]} ${
                  selection.value === pd.value ? styles["selected"] : ""
                }`}
                onClick={() => setSelection(pd)}
                key={pd.value}
              >
                <img
                  src={`/icons/${pd.value}${
                    selection.value === pd.value ? "-filled" : ""
                  }-icon.svg`}
                  alt={pd.value}
                  width={24}
                  height={24}
                />
                <Typography color="black">{pd.label}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["generated-content-container"]}>
          {loadingContent ? (
            <Loader />
          ) : error ? (
            <>
              <div className={styles["generated-content-container-response"]}>
                <Typography variant="span" style={{ fontSize: pxToRem(16) }}>
                  {error}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <div className={styles["generated-content-container-header"]}>
                <Typography variant="h1">{selection.label}</Typography>
                <Button>
                  <img
                    src="/icons/ai-regenerate-icon.svg"
                    alt="ai-regenerate"
                    width={22}
                    height={22}
                    onClick={loadContent}
                  />
                  <Typography color="white">AI Regenerate</Typography>
                </Button>
              </div>
              <div className={styles["generated-content-container-response"]}>
                <pre>
                  <Typography variant="span" style={{ fontSize: pxToRem(16) }}>
                    {content}
                  </Typography>
                </pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetails;

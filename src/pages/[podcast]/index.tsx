import { BackButton, Button, Typography } from "@/components";
import styles from "./podcast.module.scss";
import { pxToRem } from "@/utils";
import { useState } from "react";

const PodcastDetails: React.FC = () => {
  const [selection, setSelection] = useState("transcript");

  return (
    <div className={`${styles["podcast-details"]} container`}>
      <BackButton />
      <div className={styles["title-timestamp-thumbnail"]}>
        <img
          src="/images/sample-podcast-thumbnail.png"
          alt="thumbnail"
          className={styles["podcast-thumbnail"]}
        />
        <div>
          <Typography variant="h3" style={{ marginBottom: pxToRem(8) }}>
            #133 - How to win over audiences with fake charisma and lies
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
                September 7, 2023
              </Typography>
            </div>
            <div className={styles["podcast-timestamp-label"]}>
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
            </div>
          </div>
          <div className={styles["button-container"]}>
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
          </div>
        </div>
      </div>
      <hr className={styles["divider"]} />
      <div className={styles["generated-details-container"]}>
        <div className={styles["generated-options-container"]}>
          <div className={styles["options-section"]}>
            <Typography color="black-light" className={styles["option"]}>
              Podcast Metadata
            </Typography>
            <div
              className={`${styles["option"]} ${
                selection === "transcript" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("transcript")}
            >
              <img
                src={`/icons/transcript${
                  selection === "transcript" ? "-filled" : ""
                }-icon.svg`}
                alt="transcript"
                width={24}
                height={24}
              />
              <Typography color="black">Transcript</Typography>
            </div>
            <div
              className={`${styles["option"]} ${
                selection === "show-notes" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("show-notes")}
            >
              <img
                src={`/icons/show-notes${
                  selection === "show-notes" ? "-filled" : ""
                }-icon.svg`}
                alt="show-notes"
                width={24}
                height={24}
              />
              <Typography color="black">Show Notes</Typography>
            </div>
            <div
              className={`${styles["option"]} ${
                selection === "titles" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("titles")}
            >
              <img
                src={`/icons/titles${
                  selection === "titles" ? "-filled" : ""
                }-icon.svg`}
                alt="titles"
                width={24}
                height={24}
              />
              <Typography color="black">Titles</Typography>
            </div>
            <div
              className={`${styles["option"]} ${
                selection === "keywords" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("keywords")}
            >
              <img
                src={`/icons/keywords${
                  selection === "keywords" ? "-filled" : ""
                }-icon.svg`}
                alt="keywords"
                width={24}
                height={24}
              />
              <Typography color="black">Keywords</Typography>
            </div>
          </div>
          <hr className={styles["divider"]} />
          <div className={styles["options-section"]}>
            <Typography color="black-light" className={styles["option"]}>
              Podcast Promotion
            </Typography>
            <div
              className={`${styles["option"]} ${
                selection === "blog-post" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("blog-post")}
            >
              <img
                src={`/icons/blog-post${
                  selection === "blog-post" ? "-filled" : ""
                }-icon.svg`}
                alt="blog-post"
                width={24}
                height={24}
              />
              <Typography color="black">Blog Post</Typography>
            </div>
            <div
              className={`${styles["option"]} ${
                selection === "newsletter" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("newsletter")}
            >
              <img
                src={`/icons/newsletter${
                  selection === "newsletter" ? "-filled" : ""
                }-icon.svg`}
                alt="newsletter"
                width={24}
                height={24}
              />
              <Typography color="black">Newsletter</Typography>
            </div>
            <div
              className={`${styles["option"]} ${
                selection === "socials" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("socials")}
            >
              <img
                src={`/icons/socials${
                  selection === "socials" ? "-filled" : ""
                }-icon.svg`}
                alt="socials"
                width={24}
                height={24}
              />
              <Typography color="black">Socials</Typography>
            </div>
            <div
              className={`${styles["option"]} ${
                selection === "clips" ? styles["selected"] : ""
              }`}
              onClick={() => setSelection("clips")}
            >
              <img
                src={`/icons/clips${
                  selection === "clips" ? "-filled" : ""
                }-icon.svg`}
                alt="clips"
                width={24}
                height={24}
              />
              <Typography color="black">Clips</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetails;

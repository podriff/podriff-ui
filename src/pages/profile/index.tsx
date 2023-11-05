import { Button, Typography } from "@/components";
import styles from "./profile.module.scss";
import Link from "next/link";

const Card: React.FC = () => (
  <div className={styles["list-area-card"]}>
    <img
      src="/images/sample-podcast-thumbnail.png"
      alt="thumbnail"
      className={styles["card-thumbnail"]}
    />
    <Typography variant="h4" className={styles["card-title"]}>
      How to win over audiences with fake charisma and lies
    </Typography>
    <div className={styles["card-timestamp"]}>
      <div className={styles["card-timestamp-label"]}>
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
      <div className={styles["card-timestamp-label"]}>
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
  </div>
);

const Profile = () => {
  return (
    <div className={`${styles["profile-page"]} container`}>
      <div className={styles["profile-title-area"]}>
        <Typography variant="h1">Your Podcasts</Typography>
        <Link href={"/profile/new"}>
          <Button className={styles["new-podcasts-button"]}>
            <img src="/icons/add-icon.svg" alt="add" width={12} height={12} />
            <Typography color="white">New Podcasts</Typography>
            <Typography
              variant="span"
              className={styles["free-text"]}
              color="white"
            >
              1 free
            </Typography>
          </Button>
        </Link>
      </div>
      {false ? (
        <div className={styles["no-podcasts-added-section"]}>
          <img
            src="/icons/podcast-add-icon.svg"
            alt="podcast"
            width={40}
            height={40}
          />
          <div className={styles["podcast-labels"]}>
            <Typography variant="h3">No Podcast Added</Typography>
            <Typography variant="span" color="black-light">
              You have not added any podcasts yet. Start by adding one below.
            </Typography>
          </div>
          <Link href={"/profile/new"}>
            <Button className={styles["new-podcasts-button"]}>
              <img src="/icons/add-icon.svg" alt="add" width={12} height={12} />
              <Typography color="white">New Podcasts</Typography>
              <Typography
                variant="span"
                className={styles["free-text"]}
                color="white"
              >
                1 free
              </Typography>
            </Button>
          </Link>
        </div>
      ) : (
        <div className={styles["podcasts-list-section"]}>
          <div className={styles["search-area"]}>
            <img
              src="/icons/search-icon.svg"
              alt="search-icon"
              width={16}
              height={16}
              className={styles["search-area-search-icon"]}
            />
            <input
              placeholder="Search video by title"
              className={styles["search-area-input"]}
            />
            <Button
              buttonType="alternate"
              className={styles["search-area-button"]}
              borderRadius="curved"
            >
              <Typography variant="span" color="white">
                Search
              </Typography>
            </Button>
          </div>
          <div className={styles["list-area"]}>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

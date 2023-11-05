import { BackButton, Typography } from "@/components";
import styles from "./rss.module.scss";
import { pxToRem } from "@/utils";

const RSS: React.FC = () => {
  return (
    <div className={`${styles["rss-results-page"]} container`}>
      <BackButton />
      <Typography variant="h1" className={styles["page-title"]}>
        New Podcast
      </Typography>
      <div className={styles["feeds-list-card"]}>
        <Typography
          variant="h4"
          color="black"
          style={{ marginBottom: pxToRem(18) }}
        >
          Use RSS Feed
        </Typography>
        <input
          className={styles["search-input-field"]}
          placeholder="Search by episode title"
        />
        <div className={styles["feeds-list"]}>
          <div className={styles["feeds-list-feed"]}>
            <img
              src="/images/rss-feed-thumbnail.png"
              alt="thumbnail"
              width={48}
              height={48}
              style={{ borderRadius: pxToRem(4) }}
            />
            <div>
              <Typography style={{ marginBottom: pxToRem(8) }}>
                #399 - Jared Kushner: Israel, Palestine, Hamas, Gaza, Iran, and
                the Middle East
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSS;

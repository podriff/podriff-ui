import { Button, Loader, Typography } from "@/components";
import styles from "./profile.module.scss";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { auth, firestoreDB } from "@/firebase";
import { useRouter } from "next/router";
import { AppContext } from "@/context";

interface CardProps {
  thumbnail: string;
  title: string;
  timestamp: string;
  docId: string | number;
}

const Card: React.FC<CardProps> = ({ thumbnail, timestamp, title, docId }) => (
  <Link href={`/${docId}`}>
    <div className={styles["list-area-card"]}>
      <img
        src={thumbnail}
        alt="thumbnail"
        className={styles["card-thumbnail"]}
      />
      <Typography variant="h4" className={styles["card-title"]}>
        {title}
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
            {timestamp}
          </Typography>
        </div>
        {/* <div className={styles["card-timestamp-label"]}>
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
    </div>
  </Link>
);

const Profile = () => {
  const [state] = useContext(AppContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const isCalled = useRef<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!isCalled.current) {
      setLoading(true);
      if (auth.isSignInWithEmailLink(window.location.href)) {
        let email = localStorage.getItem("podriff_email");
        if (email) {
          auth
            .signInWithEmailLink(email, window.location.href)
            .then(async (user) => {
              const userSnapshot = await firestoreDB
                .collection("users")
                .where("email", "==", email)
                .get();
              localStorage.removeItem("opd_email");
              if (userSnapshot.empty) {
                await firestoreDB.collection("users").add({
                  email,
                  freeCreditsUsed: false,
                });
              }
              router.push("/profile");
              setLoading(false);
            })
            .catch((error) => {
              setError(error.message);
              setLoading(false);
              auth.signOut();
            });
        } else {
          auth.signOut();
        }
      }
      setLoading(false);
      isCalled.current = true;
    }
  }, []);

  return (
    <div className={`${styles["profile-page"]} container`}>
      {loading ? (
        <Loader />
      ) : error ? (
        <></>
      ) : (
        <>
          <div className={styles["profile-title-area"]}>
            <Typography variant="h1">Your Podcasts</Typography>
            <Link href={"/profile/new"}>
              <Button className={styles["new-podcasts-button"]}>
                <img
                  src="/icons/add-icon.svg"
                  alt="add"
                  width={12}
                  height={12}
                />
                <Typography color="white">New Podcasts</Typography>
                {state.user?.freeCreditsUsed ? null : (
                  <Typography
                    variant="span"
                    className={styles["free-text"]}
                    color="white"
                  >
                    1 free
                  </Typography>
                )}
              </Button>
            </Link>
          </div>
          {state.user?.userVideos.length === 0 ? (
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
                  You have not added any podcasts yet. Start by adding one
                  below.
                </Typography>
              </div>
              <Link href={"/profile/new"}>
                <Button className={styles["new-podcasts-button"]}>
                  <img
                    src="/icons/add-icon.svg"
                    alt="add"
                    width={12}
                    height={12}
                  />
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
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
                {/* <Button
                  buttonType="alternate"
                  className={styles["search-area-button"]}
                  borderRadius="curved"
                >
                  <Typography variant="span" color="white">
                    Search
                  </Typography>
                </Button> */}
              </div>
              <div className={styles["list-area"]}>
                {state.user?.userVideos
                  .filter((v) =>
                    v.name.toLowerCase().includes(searchInput.toLowerCase())
                  )
                  .map((v) => (
                    <Card
                      key={v.docId}
                      thumbnail={v.thumbnail}
                      title={v.name}
                      timestamp={new Date(v.timeStamp).toLocaleString()}
                      docId={v.docId}
                    />
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
